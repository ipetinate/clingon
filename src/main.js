#!/usr/bin/env node

import { Command } from 'commander'

import { guidedAction } from './actions/guided.js'
import { getLocalLibDirname } from './utils/directory.js'

import { version } from '../package.json'

/*
 * Global Variables
 */

export const localDirname = getLocalLibDirname()

/*
 * Resources
 */

const program = new Command()

program.name('clingon').description('CLI to generate files based on templates').version(version)

/*
 * Read config file from rootDir
 */

// const config = readLocalConfig("clingon.json");

/*
 * Autogen flow - using built-in opinionated templates
 */

// TODO

/*
 * Guided flow - using user local templates from /.clingon-templates
 */

program
  .command('gen')
  .action(guidedAction)
  .description('Start a guided flow to generate resources (components, functions, pages, etc)')

/*
 * Init flow - generate needed files
 */

// TODO

/*
 * Parse program to execution
 */
program.parse()
