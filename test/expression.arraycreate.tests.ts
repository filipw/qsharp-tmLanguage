import { should } from 'chai';
import { tokenize, createToken, Token } from './utils/tokenize';

describe("Expression: Array Creation", () => {
    before(() => { should(); });

    it("Numeric literals", async () => {
        const tokens = await tokenize(`[1, 2, 3];`);
        tokens.should.deep.equal([
            createToken("[", "punctuation.squarebracket.open.qsharp"),
            createToken("1", "constant.numeric.decimal.qsharp"),
            createToken(",", "punctuation.separator.comma.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("2", "constant.numeric.decimal.qsharp"),
            createToken(",", "punctuation.separator.comma.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("3", "constant.numeric.decimal.qsharp"),
            createToken("]", "punctuation.squarebracket.close.qsharp"),
        ]);
    });

    it("Identifiers", async () => {
        const tokens = await tokenize(`[foo, bar, baz];`);
        tokens.should.deep.equal([
            createToken("[", "punctuation.squarebracket.open.qsharp"),
            createToken("foo", "variable.other.readwrite.qsharp"),
            createToken(",", "punctuation.separator.comma.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("bar", "variable.other.readwrite.qsharp"),
            createToken(",", "punctuation.separator.comma.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("baz", "variable.other.readwrite.qsharp"),
            createToken("]", "punctuation.squarebracket.close.qsharp"),
        ]);
    });

    it("Identifier named size with size", async () => {
        const tokens = await tokenize(`[size, size = 3];`);
        tokens.should.deep.equal([
            createToken("[", "punctuation.squarebracket.open.qsharp"),
            createToken("size", "variable.other.readwrite.qsharp"),
            createToken(",", "punctuation.separator.comma.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("size", "keyword.other.size.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("= 3", "source.qsharp"),
            createToken("]", "punctuation.squarebracket.close.qsharp"),
        ]);
    });
});