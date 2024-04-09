import { Command } from "commander";

import { guidedAction } from "./actions/guided.js";
import { readLocalConfig } from "./utils/global-config.js";

/*
 * Resources
 */

const program = new Command();

program
  .name("tricorder")
  .description("CLI to generate files based on templates")
  .version("0.0.1");

/*
 * Read config file from rootDir
 */

const config = readLocalConfig("tricorder.json");

/*
 * Autogen flow - using built-in opinionated templates
 */

// TODO

/*
 * Guided flow - using user local templates from /.tricorder-templates
 */

program
  .command("guided")
  .action(guidedAction)
  .description(
    "Start a guided flow to generate resources (components, functions, pages, etc)"
  );

/*
 * Init flow - generate needed files
 */

// TODO

/*
 * Parse program to execution
 */
program.parse();
