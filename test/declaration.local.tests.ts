import { should } from 'chai';
import { tokenize, createToken, Token } from './utils/tokenize';

describe("Local declarations", () => {
    before(() => { should(); });

    it("Simple numeric", async () => {
        const tokens = await tokenize(`let foo = 1.0;`);
        tokens.should.deep.equal([
            createToken("let", "keyword.other.let.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("foo", "entity.name.variable.local.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("=", "keyword.operator.assignment.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("1.0", "constant.numeric.decimal.qsharp"),
        ]);
    });
});