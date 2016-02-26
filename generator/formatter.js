#!/usr/bin/env node

var inquirer = require('inquirer');
global.Promise = require('bluebird');
var fs = require('fs');
var path = require('path');
var beautify = require('js-beautify').js_beautify;

var inquirerPrompt = Promise.promisify(inquirer.prompt);
var prompt = function (questions) {
  return inquirerPrompt(questions).catch(Promise.resolve);
};

var file;

prompt([{
    type: 'input',
    name: 'filename',
    message: '城市'
  }])
  .then(function (answers) {
    var file_content = fs.readFileSync(path.join(__dirname, '..', answers.filename + '.geojson')).toString('utf8');
    file = path.join(__dirname, '..', answers.filename + '.geojson');
    return file_content;
  })
  .then(function (str) {
    return beautify(str, {
      "indent_size": 2
    });
  })
  .then(function (content) {
    fs.writeFileSync(file, content);
  })
  .catch(function (err) {
    console.log('An error occured:')
    console.error(err);
    process.exit(1);
  });
