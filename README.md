<p align="center">
  <img src="doc/img/clingon.svg" alt="Clingon CLI logo" width="256"  style="display: block; margin: 0 auto;">
</p>

# Clingon CLI

> Create components, functions, pages, and other files for your project with a few commands

Tired of creating components by hand? And still without any help from the VS Code interface or other IDEs?

Clingon comes to simplify this creation flow.
You are going to create a React or Vue component, but this component needs a test file and a stories file (if you use storybook), with its entire structure being grouped or separated, it is a very tiring task to create all of this, add the code boilerplate (which I know you will copy from another ready-made file and change everything).

Let's simplify all of this, execute a command, answer some questions, or select your favorite template and that's it, everything is created, just start coding.

## Description

Clingon is a command line tool that helps you create files for your project.
By default, it already comes with some settings, which are commonly used concepts, and can offer you some known folder paths for common files, or ask you if you use TypeScript, what is the postfix for your test files, among other features that will help you be productive.

Answer a questionnaire with a few questions in guided mode (if you don't know exactly what you want, or if you're a beginner and need the code ready to start coding), or use advanced mode by selecting custom models that you created and added to the root of your project.

In the initial version, we have not yet made advanced mode available, it will be released in future updates.

## How to use

Instale a ferramenta globalmente usando seu gerenciador de pacotes Node preferido, ou use `npx` para rodar o executável.

- Using node package manager

  ```shell
  npm i -g clingon

  # or

  yarn add -g clingon

  # or

  pnpm i -g clingon

  ```

- Using `npx`

  ```shell
   npx clingon@latest guided
  ```

## Features

...
