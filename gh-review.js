#!/usr/bin/env node

"use strict";

var program = require('commander');
var fs = require('fs-extra');
var glob = require('glob');
var async = require('async');
var colors = require('colors');
var lineCount = require('line-count');
var _ = require('underscore');
var Github = require('github-api');
var Table = require('cli-table');
var Git = require("nodegit");

program
    .version('0.1.0')
    .arguments('<organisationName>')
    .description('Review the status of an organisations public github account and score it based on documents present (like READMEs)')
    .option('-u, --username <username>', 'GitHub Username (Optional)')
    .option('-p, --password <password>', 'GitHub Password (Optional)')
    .option('-o, --oauth <oauth>', 'OAuth2 token to authenticate with (Optional)')
    .parse(process.argv);

if ((!program.username && program.password) || (program.username && !program.password) || program.args.length != 1) {
    program.help();
}


var auth = {};

if (program.oauth) {
    auth = {
        token: program.oauth,
        auth: "oauth"
    };
}

if (program.username && program.password) {
    auth = {
        username: program.username,
        password: program.password,
        auth: "basic"
    };
}

var github = new Github(auth);
var user = github.getUser();


var orgname = program.args[0];

var tmpDirectory = "/tmp/gh-review-" + process.pid;

console.log("Requesting Repos for: " + orgname);
user.orgRepos(orgname, function (er, repos) {
    if (er) {
        console.error(er);
        process.exit(1);
    }

    async.forEachOf(repos, function (repo, key, callback) {
        console.log("Checking out: " + repo.full_name);

        var repoLocation = tmpDirectory + "/" + repo.id;

        var cloneOptions = {
            fetchOpts: {
                callbacks: {
                    certificateCheck: function () {
                        return 1;
                    },
                    credentials: function (url, userName) {
                        if (program.oauth) {
                            return Git.Cred.userpassPlaintextNew(userName, program.oauth);
                        }
                        if (program.username) {
                            return Git.Cred.userpassPlaintextNew(program.username, program.password);
                        }

                        return Git.Cred.sshKeyFromAgent(userName);
                    }
                }
            }
        };


        var cloneRepository = Git.Clone(repo.clone_url, repoLocation, cloneOptions);

        cloneRepository.catch(console.log.bind(console)).then(function (repository) {
            console.log("Analysing: " + repo.full_name);
            async.parallel({
                readme: function (callback) {
                    glob("README*", {cwd: repoLocation}, function (er, files) {
                        // GH Generates a tiny readme for you. Most readmes are greater than 10 lines.
                        // Lets check for that
                        if (files.length > 0) {
                            async.any(files, function (file, callback) {
                                var fileContents = fs.readFileSync(repoLocation + "/" + file, {encoding: 'utf8'});

                                if (!fileContents) {
                                    callback(false);
                                }
                                else {
                                    callback(lineCount(fileContents) > 10)
                                }
                            }, function (result) {
                                callback(er, result);
                            });
                        }
                        else {
                            callback(er, false);
                        }
                    })
                },
                license: function (callback) {
                    glob("LICENSE*", {cwd: repoLocation}, function (er, files) {
                        callback(er, files.length > 0)
                    })
                },
                contributing: function (callback) {
                    glob("CONTRIBUTING*", {cwd: repoLocation}, function (er, files) {
                        callback(er, files.length > 0)
                    })
                },
                travis: function (callback) {
                    glob(".travis.yml", {cwd: repoLocation}, function (er, files) {
                        callback(er, files.length > 0)
                    })
                }

            }, function (er, status) {
                if (er) {
                    console.error(er);
                    process.exit(1);
                }

                repos[key] = _.extend(repo, status, {checkout_location: repoLocation});

                callback(er);
            })
        });
    }, function (er) {
        if (er) {
            console.error(er);
            process.exit(1);
        }

        fs.remove(tmpDirectory);

        var calculateScore = function (repo, callback) {
            var score = 0;
            score += repo.readme;
            score += repo.license;
            score += repo.contributing;

            score += repo.travis;

            repo.score = score;
            callback(null, repo);
        };

        console.log("Calculating scores");

        async.map(repos, calculateScore, function (er, repos) {
            if (er) {
                console.error(er);
                process.exit(1);
            }

            repos.sort(function (a, b) {
                if (a.score > b.score) {
                    return 1
                }
                if (a.score < b.score) {
                    return -1
                }

                if (a.full_name > b.full_name) {
                    return 1
                }
                if (a.full_name < b.full_name) {
                    return -1
                }

                return 0;
            });

            var prettyTicks = function (repo, callback) {
                repo.readme = repo.readme ? "✓".green : "✗".red;
                repo.license = repo.license ? "✓".green : "✗".red;
                repo.contributing = repo.contributing ? "✓".green : "✗".red;
                repo.travis = repo.travis ? "✓".green : "✗".red;
                repo.private = repo.private ? "private" : "public";

                callback(null, repo);
            };

            async.map(repos, prettyTicks, function (er, repos) {
                if (er) {
                    console.error(er);
                    process.exit(1);
                }

                var table = new Table({
                    head: ['Name', 'Private', 'README', 'LICENSE', 'CONTRIBUTING', 'Travis', 'Score']
                });

                repos.forEach(function (repo) {
                    table.push([repo.full_name, repo.private, repo.readme, repo.license, repo.contributing, repo.travis, repo.score])
                });

                console.log(table.toString());
            });

        });
    })
});
