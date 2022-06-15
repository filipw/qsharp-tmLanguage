/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

// adapted from https://github.com/dotnet/csharp-tmLanguage/blob/main/test/utils/tokenize.ts

import { Registry, StackElement, parseRawGrammar, } from 'vscode-textmate';
import * as oniguruma from 'vscode-oniguruma';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Utility to read a file as a promise
 */
function readFile(path) {
    return new Promise<Buffer>((resolve, reject) => {
        fs.readFile(path, (error, data) => error ? reject(error) : resolve(data));
    })
}

// The path is different whether we are running tests from `out/test/**/*.js` or `test/**/*.ts`
var onigPath = fs.existsSync(path.join(__dirname, '../../node_modules/vscode-oniguruma/release/onig.wasm'))
    ? path.join(__dirname, '../../node_modules/vscode-oniguruma/release/onig.wasm')
    : path.join(__dirname, '../../../node_modules/vscode-oniguruma/release/onig.wasm');
const wasmBin = fs.readFileSync(onigPath).buffer;
const vscodeOnigurumaLib = oniguruma.loadWASM(wasmBin).then(() => {
    return {
        createOnigScanner(patterns) { return new oniguruma.OnigScanner(patterns); },
        createOnigString(s) { return new oniguruma.OnigString(s); }
    };
});

const registry = new Registry({
    onigLib: vscodeOnigurumaLib,
    loadGrammar: async (scopeName) => {
        if (scopeName === 'source.qs') {
            return readFile('./grammars/qsharp.tmLanguage')
                .then(data => parseRawGrammar(data.toString()));
        }
        console.log(`Unknown scope name: ${scopeName}`);
        return null;
    }
});

const excludedTypes = ['source.qs']

export async function tokenize(input: string | Input, excludeTypes: boolean = true): Promise<Token[]> {
    if (typeof input === "string") {
        input = Input.FromText(input);
    }

    let tokens: Token[] = [];
    let previousStack: StackElement = null;
    const grammar = await registry.loadGrammar('source.qs');

    for (let lineIndex = 0; lineIndex < input.lines.length; lineIndex++) {
        const line = input.lines[lineIndex];

        let lineResult = grammar.tokenizeLine(line, previousStack);
        previousStack = lineResult.ruleStack;

        if (lineIndex < input.span.startLine || lineIndex > input.span.endLine) {
            continue;
        }

        for (const token of lineResult.tokens) {
            if ((lineIndex === input.span.startLine && token.startIndex < input.span.startIndex) ||
                (lineIndex === input.span.endLine && token.endIndex > input.span.endIndex)) {
                continue;
            }

            const text = line.substring(token.startIndex, token.endIndex);
            const type = token.scopes[token.scopes.length - 1];

            if (excludeTypes === false || excludedTypes.indexOf(type) < 0) {
                tokens.push(createToken(text, type));
            }
        }
    }

    return tokens;
}

export function createToken(text: string, type: string) {
    return { text, type };
}

interface Span {
    startLine: number;
    startIndex: number;
    endLine: number;
    endIndex: number;
}

export interface Token {
    text: string;
    type: string;
}

export class Input {
    private constructor(
        public lines: string[],
        public span: Span) { }

    public static FromText(text: string) {
        // ensure consistent line-endings irrelevant of OS
        text = text.replace('\r\n', '\n');
        let lines = text.split('\n');

        return new Input(lines, { startLine: 0, startIndex: 0, endLine: lines.length - 1, endIndex: lines[lines.length - 1].length });
    }
}
