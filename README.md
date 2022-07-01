# Q# language - syntax grammar for code highlighting

This repository contains the TextMate grammar for Q#. The grammar provides tokenization support for Q# language files, and can be used for syntax highlighting of Q# code in any editor.

[![CoC](https://img.shields.io/badge/code%20of%20conduct-contributor%20covenant-yellow)](CODE_OF_CONDUCT.md)

## Build and Development

To contribute, clone the repo and run (requires Node.js and `npm` to be installed on the dev machine)

* `npm install` to install all dependencies
* Run `npm run compile` to build and run tests

The source grammar is located at `src/qsharp.tmLanguage.yml` and is the core file to be maintained.

## Output

The output are the grammar files located at:

* `grammars/qsharp.tmLanguage`
* `grammars/qsharp.tmLanguage.json`

These two files are committed to source control to allow easy access to latest grammars, but they should not be edited by hand.

The latest ones can be grabbed manually from [here](https://github.com/filipw/qsharp-tmLanguage/tree/main/grammars) and used directly in any editor supporting TextMate grammar.

## License

[MIT License](https://github.com/filipw/qsharp-tmLanguage/blob/main/LICENSE)
