# GH Review 

[![Build Status](https://travis-ci.org/PurpleBooth/gh-review.svg?branch=master)](https://travis-ci.org/PurpleBooth/gh-review) [![Docker Repository on Quay.io](https://quay.io/repository/purplebooth/gh-review/status "Docker Repository on Quay.io")](https://quay.io/repository/purplebooth/gh-review) [![GitHub version](https://badge.fury.io/gh/PurpleBooth%2Fgh-review.svg)](https://badge.fury.io/gh/PurpleBooth%2Fgh-review)

Review the status of an organisations public github account and score it based on documents present (like READMEs)

## Getting Started

These instructions will get you up and running with the review tool.

### Prerequisities

Make sure you have the latest version of [NodeJS](https://nodejs.org/en/).

### Installing

Download this repository, then install the dependencies using npm.

```
npm install
```

Then you are ready to go.

## Running the tests

We don't currently have any. This was a hacky morning project, quality is potato level.


## Usage

```shell
$ bin/gh-review -h

  Usage: gh-review [options] <organisationName>

  Review the status of an organisations public github account and score it based on documents present (like READMEs)

  Options:

    -h, --help                 output usage information
    -V, --version              output the version number
    -u, --username <username>  GitHub Username (Optional)
    -p, --password <password>  GitHub Password (Optional)
    -o, --oauth <oauth>        OAuth2 token to authenticate with (Optional)
```

or via docker (without installing anything)

```shell
$ docker run purplebooth/gh-review:$VERSION

  Usage: gh-review [options] <organisationName>

  Review the status of an organisations public github account and score it based on documents present (like READMEs)

  Options:

    -h, --help                 output usage information
    -V, --version              output the version number
    -u, --username <username>  GitHub Username (Optional)
    -p, --password <password>  GitHub Password (Optional)
    -o, --oauth <oauth>        OAuth2 token to authenticate with (Optional)
```

## Example Output

```shell
./gh-review twitter
Requesting Repos for: twitter
Checking out: twitter/kestrel
<..snip..>
Checking out: twitter/finatra-misc
Analysing: twitter/scribe
<..snip..>
Analysing: twitter/mysql
Calculating scores
┌────────────────────────────────────────┬─────────┬────────┬─────────┬──────────────┬────────┬───────┐
│ Name                                   │ Private │ README │ LICENSE │ CONTRIBUTING │ Travis │ Score │
├────────────────────────────────────────┼─────────┼────────┼─────────┼──────────────┼────────┼───────┤
│ twitter/finatra-examples               │ public  │ ✗      │ ✗       │ ✗            │ ✗      │ 0     │
├────────────────────────────────────────┼─────────┼────────┼─────────┼──────────────┼────────┼───────┤
│ twitter/twitter-text-conformance       │ public  │ ✗      │ ✗       │ ✗            │ ✗      │ 0     │
├────────────────────────────────────────┼─────────┼────────┼─────────┼──────────────┼────────┼───────┤
│ twitter/twitter-text-java              │ public  │ ✗      │ ✗       │ ✗            │ ✗      │ 0     │
├────────────────────────────────────────┼─────────┼────────┼─────────┼──────────────┼────────┼───────┤
│ twitter/twitter-text-js                │ public  │ ✗      │ ✗       │ ✗            │ ✗      │ 0     │
├────────────────────────────────────────┼─────────┼────────┼─────────┼──────────────┼────────┼───────┤
│ twitter/twitter-text-objc              │ public  │ ✗      │ ✗       │ ✗            │ ✗      │ 0     │
├────────────────────────────────────────┼─────────┼────────┼─────────┼──────────────┼────────┼───────┤
│ twitter/twitter-text-rb                │ public  │ ✗      │ ✗       │ ✗            │ ✗      │ 0     │
├────────────────────────────────────────┼─────────┼────────┼─────────┼──────────────┼────────┼───────┤
│ twitter/code-of-conduct                │ public  │ ✓      │ ✗       │ ✗            │ ✗      │ 1     │
├────────────────────────────────────────┼─────────┼────────┼─────────┼──────────────┼────────┼───────┤
│ twitter/standard-project               │ public  │ ✓      │ ✓       │ ✗            │ ✗      │ 2     │
├────────────────────────────────────────┼─────────┼────────┼─────────┼──────────────┼────────┼───────┤
│ twitter/streamyj                       │ public  │ ✓      │ ✓       │ ✗            │ ✗      │ 2     │
├────────────────────────────────────────┼─────────┼────────┼─────────┼──────────────┼────────┼───────┤
│ twitter/hpack                          │ public  │ ✓      │ ✓       │ ✗            │ ✓      │ 3     │
├────────────────────────────────────────┼─────────┼────────┼─────────┼──────────────┼────────┼───────┤
│ twitter/iago                           │ public  │ ✓      │ ✓       │ ✗            │ ✓      │ 3     │
├────────────────────────────────────────┼─────────┼────────┼─────────┼──────────────┼────────┼───────┤
│ twitter/jaqen                          │ public  │ ✓      │ ✓       │ ✗            │ ✓      │ 3     │
├────────────────────────────────────────┼─────────┼────────┼─────────┼──────────────┼────────┼───────┤
│ twitter/joauth                         │ public  │ ✓      │ ✓       │ ✗            │ ✓      │ 3     │
├────────────────────────────────────────┼─────────┼────────┼─────────┼──────────────┼────────┼───────┤
│ twitter/recess                         │ public  │ ✓      │ ✓       │ ✗            │ ✓      │ 3     │
├────────────────────────────────────────┼─────────┼────────┼─────────┼──────────────┼────────┼───────┤
│ twitter/scala-json                     │ public  │ ✓      │ ✓       │ ✗            │ ✓      │ 3     │
├────────────────────────────────────────┼─────────┼────────┼─────────┼──────────────┼────────┼───────┤
│ twitter/scala_school2                  │ public  │ ✓      │ ✗       │ ✓            │ ✓      │ 3     │
├────────────────────────────────────────┼─────────┼────────┼─────────┼──────────────┼────────┼───────┤
│ twitter/scrooge                        │ public  │ ✓      │ ✓       │ ✗            │ ✓      │ 3     │
├────────────────────────────────────────┼─────────┼────────┼─────────┼──────────────┼────────┼───────┤
│ twitter/secureheaders                  │ public  │ ✓      │ ✓       │ ✗            │ ✓      │ 3     │
├────────────────────────────────────────┼─────────┼────────┼─────────┼──────────────┼────────┼───────┤
│ twitter/thrift_client                  │ public  │ ✓      │ ✓       │ ✗            │ ✓      │ 3     │
├────────────────────────────────────────┼─────────┼────────┼─────────┼──────────────┼────────┼───────┤
│ twitter/tormenta                       │ public  │ ✓      │ ✓       │ ✗            │ ✓      │ 3     │
├────────────────────────────────────────┼─────────┼────────┼─────────┼──────────────┼────────┼───────┤
│ twitter/twemcache                      │ public  │ ✓      │ ✓       │ ✗            │ ✓      │ 3     │
├────────────────────────────────────────┼─────────┼────────┼─────────┼──────────────┼────────┼───────┤
│ twitter/twemproxy                      │ public  │ ✓      │ ✓       │ ✗            │ ✓      │ 3     │
├────────────────────────────────────────┼─────────┼────────┼─────────┼──────────────┼────────┼───────┤
│ twitter/twitter-cldr-js                │ public  │ ✓      │ ✓       │ ✗            │ ✓      │ 3     │
├────────────────────────────────────────┼─────────┼────────┼─────────┼──────────────┼────────┼───────┤
│ twitter/twitter-cldr-npm               │ public  │ ✓      │ ✓       │ ✓            │ ✗      │ 3     │
├────────────────────────────────────────┼─────────┼────────┼─────────┼──────────────┼────────┼───────┤
│ twitter/libcrunch                      │ public  │ ✓      │ ✓       │ ✓            │ ✓      │ 4     │
├────────────────────────────────────────┼─────────┼────────┼─────────┼──────────────┼────────┼───────┤
│ twitter/pants                          │ public  │ ✓      │ ✓       │ ✓            │ ✓      │ 4     │
├────────────────────────────────────────┼─────────┼────────┼─────────┼──────────────┼────────┼───────┤
│ twitter/scalding                       │ public  │ ✓      │ ✓       │ ✓            │ ✓      │ 4     │
├────────────────────────────────────────┼─────────┼────────┼─────────┼──────────────┼────────┼───────┤
│ twitter/spitball                       │ public  │ ✓      │ ✓       │ ✓            │ ✓      │ 4     │
├────────────────────────────────────────┼─────────┼────────┼─────────┼──────────────┼────────┼───────┤
│ twitter/zktraffic                      │ public  │ ✓      │ ✓       │ ✓            │ ✓      │ 4     │
└────────────────────────────────────────┴─────────┴────────┴─────────┴──────────────┴────────┴───────┘
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/PurpleBooth/gh-review/tags). 

## Authors

See the list of [contributors](https://github.com/PurpleBooth/gh-review/contributors) who participated in this project.

## License

This project is licensed under the GPL v2 License - see the [LICENSE.md](LICENSE.md) file for details
