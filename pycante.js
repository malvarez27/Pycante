#!/usr/bin/env node

/*
 * A Pycante Compiler
 *
 * This is a command line application that compiles a Pycante program from
 * a file. There are three options:
 *
 * ./pycante.js -a <filename>
 *     writes out the AST and stops
 *
 * ./pycante.js -i <filename>
 *     writes the decorated AST then stops
 *
 * ./pycante.js <filename>
 *     compiles the pycante program to JavaScript, writing the generated
 *     JavaScript code to standard output.
 *
 * ./pycante.js -o <filename>
 *     optimizes the intermediate code before generating target JavaScript.
 *
 * Output of the AST and decorated AST uses the object inspection functionality
 * built into Node.js.
 */

const { argv } = require('yargs')
  .usage('$0 [-a] [-o] [-i] filename')
  .boolean(['a', 'o', 'i'])
  .describe('a', 'show abstract syntax tree after parsing then stop')
  .describe('o', 'do optimizations')
  .describe('i', 'generate and show the decorated abstract syntax tree then stop')
  .demand(1);

const fs = require('fs');
const util = require('util');
const parse = require('./syntax/parser');
//require('./backend/javascript-generator');

console.log(`Compiling ${argv._[0]}`);
fs.readFile(argv._[0], 'utf-8', (err, text) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Parsing');
  let program = parse(text);
  if (argv.a) {
    console.log(util.inspect(program, { depth: null }));
    return;
  }
  program.analyze();
  if (argv.o) {
    program = program.optimize();
  }
  if (argv.i) {
    console.log(util.inspect(program, { depth: null }));
    return;
  }
//  program.gen();
});
