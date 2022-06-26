import { should } from 'chai';
import { tokenize, createToken, Token } from './utils/tokenize';

describe("Comments", () => {
    before(() => { should(); });

    it("Single line comment", async () => {
        const tokens = await tokenize("// this is a comment");
        tokens.should.deep.equal([
            createToken("//", "punctuation.definition.comment.qsharp"),
            createToken(" this is a comment", "comment.line.double-slash.qsharp")
        ]);
    });

    it("Single line comment with leading whitespace", async () => {
        const tokens = await tokenize("    // this is a comment");
        tokens.should.deep.equal([
            createToken("    ", "punctuation.whitespace.comment.leading.qsharp"),
            createToken("//", "punctuation.definition.comment.qsharp"),
            createToken(" this is a comment", "comment.line.double-slash.qsharp")
        ]);
    });

    it("Multi-line comment", async () => {
        const tokens = await tokenize(`// this is a
// multi-line comment`);
        tokens.should.deep.equal([
            createToken("//", "punctuation.definition.comment.qsharp"),
            createToken(" this is a", "comment.line.double-slash.qsharp"),
            createToken("//", "punctuation.definition.comment.qsharp"),
            createToken(" multi-line comment", "comment.line.double-slash.qsharp")
        ]);
    });

    it("Doc comment", async () => {
        const tokens = await tokenize(`/// # Summary
/// Term data in the optimized block-encoding algorithm.`);
        tokens.should.deep.equal([
            createToken("///", "punctuation.definition.comment.qsharp"),
            createToken(" # Summary", "comment.block.documentation.qsharp"),
            createToken("///", "punctuation.definition.comment.qsharp"),
            createToken(" Term data in the optimized block-encoding algorithm.", "comment.block.documentation.qsharp")
        ]);
    });
});