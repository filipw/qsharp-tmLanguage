import { should } from 'chai';
import { tokenize, createToken, Token } from './utils/tokenize';

describe("Array Assignment", () => {
    before(() => { should(); });

    it("Set array", async () => {
        const tokens = await tokenize("set arr w/= 0 <- 1;");
        tokens.should.deep.equal([
            createToken("set", "keyword.other.set.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("arr", "entity.name.variable.local.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("w/=", "keyword.operator.assignment.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("0", "constant.numeric.decimal.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("<-", "keyword.operator.assignment.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("1", "constant.numeric.decimal.qsharp"),
        ]);
    });
});