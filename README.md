
[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/Naereen/StrapDown.js/blob/master/LICENSE) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)


# Gitignore Generator

Node based gitignore generator using [gitignore.io](http://gitignore.io/)

## Features

- Update and make custom aliases for specific gitignore generations

- Auto generate a gitignore for your current directory based on aliases

## How to use me

Install it from npm

```bash
npm i -g gitignore-generator-node
```

Once installed globally it will be available from the command line as `gig`

For help on what options can be based to gig

```bash
gig --help

  gitignore generator cli tool

  Usage
    $ foo [Input] [Option]

  Options
    --generate, -g  Generate a .gitignore
    --list, -l List all alias
    --make, -m make a new alias
    --update, -u update an alias
    --help, Displays the help menu

  Examples
    $ gig --generate mj
    $ gig --list
    $ gig --make
    $ gig --update mj
    $ gig --help
```

<img src="https://github.com/Y0l0McSwaggins/gitignore-generator-node/raw/master/media/example.gif" alt="example gig" width="499" height="550" />

## Testing

Currently there are no tests, they may come later, or you can add them yourself

## Customization

Currently there are two types of logging

- info

- error

By default the info log is limegreen (#32CD32) and the error log is magenta (#FF00FF) these can be changed by setting the following environment variables with a corresponding hex value

```bash
GIG_INFO_COLOUR=#fff
```

```bash
GIG_ERROR_COLOUR=#fff
```
