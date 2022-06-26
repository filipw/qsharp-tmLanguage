import { should } from 'chai';
import { tokenize, createToken, Token } from './utils/tokenize';

describe("Comments", () => {
    before(() => { should(); });

    it("Single line comment", async () => {
        const tokens = await tokenize("// this is a comment");
        tokens.should.deep.equal([createToken("// this is a comment", "comment.line.double-slash")]);
    });

    it("Multi-line comment", async () => {
        const tokens = await tokenize(`// this is a
// multi-line comment`);
        tokens.should.deep.equal([
            createToken("// this is a", "comment.line.double-slash"),
            createToken("// multi-line comment", "comment.line.double-slash")
        ]);
    });

    it("Doc comment", async () => {
        const tokens = await tokenize(`/// # Summary
/// Term data in the optimized block-encoding algorithm.`);
        tokens.should.deep.equal([
            createToken("/// # Summary", "comment.line.double-slash"),
            createToken("/// Term data in the optimized block-encoding algorithm.", "comment.line.double-slash")
        ]);
    });
});