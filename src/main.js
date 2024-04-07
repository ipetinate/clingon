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

let config = null;

await readLocalConfig((error, fileContent) => {
  if (error) {
    console.log(
      "Ops! You don't have a local configuration file, would you like to create one?"
    );
  }

  config = JSON.parse(fileContent);

  /*
   * Global config flow
   */
});

/*
 * Autogen flow - using built-in opinionated templates
 */

// TODO

/*
 * Guided flow - using user local templates from /.tricorder-templates
 */

program.command("guided").action(guidedAction);

program.parse();

/*
 * Init flow - generate needed files
 */

// TODO
