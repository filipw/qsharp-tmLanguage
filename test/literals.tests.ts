import { should } from 'chai';
import { tokenize, createToken, Token } from './utils/tokenize';

describe("Literals", () => {
    before(() => { should(); });

    it("True", async () => {
        const tokens = await tokenize("return true;");
        tokens.should.deep.equal([
            createToken("return", "keyword.control.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("true", "constant.language.boolean.true.qsharp")
        ]);
    });

    it("False", async () => {
        const tokens = await tokenize("return false;");
        tokens.should.deep.equal([
            createToken("return", "keyword.control.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("false", "constant.language.boolean.false.qsharp")
        ]);
    });
});