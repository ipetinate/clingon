# Development Guide

> Good practice guide for project development

## Guide

- [Development Guide](https://github.com/ipetinate/clingon/blob/main/doc/DEVELOPMENT_README.md)
- [Contribution Guide](https://github.com/ipetinate/clingon/blob/main/doc/CONTRIBUTION_GUIDE.md)
- [Templates Variants](https://github.com/ipetinate/clingon/blob/main/doc/TEMPLATES.md)
- [Development Taks](https://github.com/ipetinate/clingon/blob/main/doc/TASKS.md)

## Introduction

This project aims to be an open source library, where we can accept contributions, but our code will undergo reviews and release by the core team before any merge into the main branch.

To ensure that the code is as expected and meets the standard already pre-established in the project, check out some important details below to pay attention to during development.

## Technologies

The project currently (at the time of writing this guide) uses the following technologies, libraries and tools:

- Node.js
  - Is used as the application's central framework, it provides the entire structure to deal with the system, third-party libraries such as Commander and Inquirer, in addition to providing testing tools.
- Node:test
  - It is the Node test package that comes within it by default, allows you to use describe, it, todo, assert, mock, and other resources without the need for third-party libraries, in addition to allowing you to run tests directly from Node.
- Inquirer
  - It is the main way we ask questions and get answers in a structured and organized way.
- Commander
  - Provides a simple, composable command interface, and enables the addition of helpers with descriptions and other useful functionality, allowing you to run different streams of Inquirer prompts for different commands

## Internal project tools

We have developed some utilities to help with some operations, such as string formatting, function chain execution, file and directory operations, etc. You will find several of these resources, and you may need to create new ones if necessary.

- **Compose** _(src/utils/compose.js)_
  - This utility allows you to execute functions in a chain, passing the return from the last execution as a parameter for the next one. It becomes useful when we need to execute several functions with the same scope of information, but we don't want to declare constants, do ifs, and other verbose things within the execution context. It was inspired by functional languages and the pipeline capability they provide. Yes, I considered using Ramda or other libraries, but I preferred to opt for this simple implementation, that's all I needed.
- **Directory** _(src/utils/directory.js)_
  - Provides some features for getting directories, checking if a nested directory structure exists, etc.
- **File** _(src/utils/file.js)_
  - Provides features to create files, read files, get the contents of a file as a string, etc.
- **Global Config** _(src/utils/global-config.js)_
  - Manipulates the project's global configuration file
- Handle Variants (src/utils/handle-variants.js)
  - Executes a target function in a function dictionary/map.
- **String** _(src/utils/string.js)_
  - It groups methods for dealing with strings, such as dividing texts with a separator and returning as an array, converting word cases (camelCase, snake_case, kebab-case, PascalCase, etc.), transforming only the first letter to uppercase, among other utilities

## Project Architecture

The project follows the following folder structure, being organized as follows:

- `src` - main folder where resources are created, before this folder are project settings and resources, inside it there is the code necessary for the library itself to function
  - `actions` - Here we place the actions that will be passed to Commander, I called this folder actions for convention, since Commander has a method called `.actions()` and it receives the callback that is executed when a command is invoked on the console .
  - `constants` - The name is suggestive, here are the constants, immutable files, which will be read-only
  - `enums` - Pseudo enumerators, as JS does not have Enum types, here I created dictionaries to serve as enums, just to be conventional and allow easy maintenance if any value changes at some point, instead of searching for string occurrences, using the values of the key of the enumerator, we can easily change just in the enumerator file without worrying about the rest
  - `flows` - This folder divides opinions (mine so far), I would like the current `actions` to stay here, as these are the workflows, however, to convince the commander I created it in `actions`, but in this folder you will find necessary validations to deal with file variants and additional files (like tests, stories, css, etc), so in a way and here we also deal with flows.
  - `generators` - Another suggestive name, here you find the generators for the files, all the necessary logic that groups the utilities and builds the resources appropriately.
  - `templates` - This folder houses all templates for files, components, folders, etc. If the tool adds the possibility of creating a new resource, the template for that resource must be here
  - `utils` - It was already mentioned in the previous section, here are the utilities, tools necessary for the tool to function properly, if new needs arise, and it is not an auxiliary method for a context, if it makes sense to be used in more places, it should be created here.
- `types.js` - Definition of JSDocs types, new global types must be created here and imported into the JSDoc @type of the annotated resource, so we can have auto complete in the project. And yes, I chose to use JS and wanted to add JSDocs, instead of TS, for a simple reason, TS configuration in the project.
- `main.js` - Where all the magic begins, here are the commander commands that call the rest of the tool.

## Why don't we use TS?

I wouldn't want it to be a section of this document, I have nothing against TypeScript, I use it in other projects and I like it, but here I wanted to keep it simple and have contact with pure Node.js which I hadn't done in years, and to having some autocomplete features and suggestions in the code editor I chose to add JSDocs, and I would have added them even if it was TS, so it's nothing against the tool, I just didn't want to go through the trouble of configuring N transpile tools and others, I wanted to keep it as simple as possible. Since it's a terminal tool and the types don't interfere with client-side use, I don't know if it's necessary. However, I am open to the possibility.

## Recommendations

- **Synchronous FS methods** - opt for synchronous methods when using "fs" package, when using asynchronous methods, we have to use callbacks and tests often break, so to maintain simplicity, use methods with `Sync` signature, get the result and work on top. If possible, use the `compose()` method to compose the functions and work on the results.
- **Compose Method** - whenever there is an extensive chain of resource execution based on the return of the previous one, opt for `compose()` and chain the execution, this way you keep the code readable and simple to maintain. And whenever possible, opt for more functional approaches, they keep things easier to maintain in the long run.
- **Templates** - our tool currently has a greater focus on frontend, as that is where the need arose, but nothing prevents file templates from other areas (backend, database, etc.) from being created, just have a template and an interpreter. Then create the templates with the folder structure that segments the resource, allowing flexibility when creating, and use the template's target file extension, for example, a template to create a Kotlin class, can be created with the extension `.kt` and within it have valid Kotlin code, this speeds up the creation of the template, avoiding dealing with formatting in txt files or others that do not understand the inserted code.
- **Functions that accept callbacks** - you will find some functions that accept callbacks, but this was an early programming style, but it was replaced by receiving the return value in the execution scope, I am refactoring the places where they have callbacks, and changing to receiving the return in a constant, simplifying readability and maintenance, perhaps when you read this, there won't even be traces of functions with callbacks anymore, and if so, it may have been a conscious choice to keep it as is, if the code is good. But in general, don't use callbacks as a parameter, return the value and use it wherever you need it.
- **In a Functional way** - choose to follow a functional approach, create pure functions, return values, avoid mutations where there is no need, specify parameters and define execution scopes well, opt for composition, use functional resources whenever possible, this maintains the simple things and makes long-term maintenance easy.
- **Testing** - test everything you can, make it a habit, PRs without tests will not be accepted, we need to ensure quality. Tests in ToDo that were not initially implemented will be prioritized and implemented, we will not allow code without tests. But carry out valuable tests that make sense, no dummy tests.
