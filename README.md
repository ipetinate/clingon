<p align="center">
  <img
    src="https://github.com/ipetinate/clingon/blob/main/doc/img/clingon.svg"
    alt="Clingon CLI logo" width="256"  style="display: block; margin: 0 auto;"
    />
</p>

[![Build](https://github.com/ipetinate/clingon/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/ipetinate/clingon/actions/workflows/node.js.yml)
[![Release](https://github.com/ipetinate/clingon/actions/workflows/release.yml/badge.svg)](https://github.com/ipetinate/clingon/actions/workflows/release.yml)
[![GitHub Release Date](https://www.npmjs.com/package/clingon)](https://img.shields.io/github/release-date/ipetinate/clingon?display_date=published_at&logo=npm&label=Release%20Date&link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fclingon)
[![Coverage Status](https://coveralls.io/repos/github/ipetinate/clingon/badge.svg?branch=main)](https://img.shields.io/coverallsCoverage/github/ipetinate/clingon?branch=main&logo=coveralls&label=Coverage)
![GitHub top language](https://img.shields.io/github/languages/top/ipetinate/clingon?logo=javascript&label=Main%20Language%3A%20JS)

# Clingon CLI

> Create components, functions, pages, and other files for your project with a few commands

Tired of creating components by hand? And still without any help from the VS Code interface or other IDEs?

Clingon comes to simplify this creation flow.
You are going to create a React or Vue component, but this component needs a test file and a stories file (if you use storybook), with its entire structure being grouped or separated, it is a very tiring task to create all of this, add the code boilerplate (which I know you will copy from another ready-made file and change everything).

Let's simplify all of this, execute a command, answer some questions, or select your favorite template and that's it, everything is created, just start coding.

## Links

- Releases
  - [CHANGELOG](https://github.com/ipetinate/clingon/blob/main/CHANGELOG.md)
- Documentation
  - [Development Guide](https://github.com/ipetinate/clingon/blob/main/doc/DEVELOPMENT_README.md)
  - [Contribution Guide](https://github.com/ipetinate/clingon/blob/main/doc/CONTRIBUTION_GUIDE.md)
  - [Templates Variants](https://github.com/ipetinate/clingon/blob/main/doc/TEMPLATES.md)
  - [Development Taks](https://github.com/ipetinate/clingon/blob/main/doc/TASKS.md)

## Description

Clingon is a command line tool that helps you create files for your project.
By default, it already comes with some settings, which are commonly used concepts, and can offer you some known folder paths for common files, or ask you if you use TypeScript, what is the postfix for your test files, among other features that will help you be productive.

Answer a questionnaire with a few questions in guided mode (if you don't know exactly what you want, or if you're a beginner and need the code ready to start coding), or use advanced mode by selecting custom models that you created and added to the root of your project.

In the initial version, we have not yet made advanced mode available, it will be released in future updates.

## How to use

Install the tool globally using your preferred Node package manager, or use `npx` to run the executable.

Note: Maybe on macOS you do not have permission to run the tool if you install it globally, if this happens you need to give the correct permissions or to avoid anything you can use `npx` which solves this problem.

- Using `npx`

  ```shell
   npx clingon@latest gen
  ```

- Using node package manager

  - Install

    ```shell
    npm i -g clingon

    # or

    yarn add -g clingon

    # or

    pnpm i -g clingon

    ```

  - Execute

    ```shell
    clingon gen
    ```

## Features

> This project is in beta stage (under development), so many of the expected features have not yet been implemented, if you want to contribute, check out the [Contribution Guide](https://github.com/ipetinate/clingon/blob/main/doc/CONTRIBUTION_GUIDE.md)

- [ ] Opinionated resource generation
  - [ ] Options
    - [x] TypeScript
    - [x] Unit Test
      - [x] Postfix
        - [x] .spec
        - [x] .test
      - [x] Testing Library
      - [x] Test Framework
        - [x] Jest
        - [x] Vitest
    - [ ] Storybook Story
    - [ ] CSS Style
      - [x] Vanilla CSS
      - [x] CSS Modules
      - [x] SASS/SCSS
      - [x] TailwindCSS w/ @apply
      - [x] TailwindCSS inline (inside `class` attr)
      - [ ] CSS-in-js
  - [ ] Frameworks
    - [ ] Vue
      - [ ] Version
        - [x] 2
        - [ ] 3
          - [x] Composition API
          - [ ] Options API
      - [x] Page
      - [x] Component
      - [ ] Mixin
      - [ ] Filter
      - [ ] Hook
    - [x] React
      - [x] Component
      - [x] Page
      - [ ] Hook
  - [ ] Other resources
    - [x] Function
    - [ ] Model
    - [ ] Enum
    - [ ] Type
    - [ ] Class
    - [ ] Story
    - [ ] Unit Test (.spec|.test)
- [ ] Advanced resource generation
  - [ ] Local custom templates
  - [ ] Configuration file-based generation
  - [ ] Generation based on existing files
  - [ ] Composite dynamic generation (using several code snippets)
