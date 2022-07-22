import { should } from 'chai';
import { tokenize, createToken, Token } from './utils/tokenize';

describe("Quantum: Allocation", () => {
    before(() => { should(); });

    it("Single qubit", async () => {
        const tokens = await tokenize(`use a = Qubit();`);
        tokens.should.deep.equal([
            createToken("use", "keyword.other.use.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("a", "entity.name.variable.local.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("=", "keyword.operator.assignment.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Qubit", "entity.name.function.qsharp"), // todo: should this be storage.type.qsharp or is this OK?
            createToken("(", "punctuation.parenthesis.open.qsharp"),
            createToken(")", "punctuation.parenthesis.close.qsharp"),
        ]);
    });

    it("Qubit array", async () => {
        const tokens = await tokenize(`use a = Qubit[2];`);
        tokens.should.deep.equal([
            createToken("use", "keyword.other.use.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("a", "entity.name.variable.local.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("=", "keyword.operator.assignment.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Qubit", "storage.type.qsharp"), 
            createToken("[", "punctuation.squarebracket.open.qsharp"),
            createToken("2", "constant.numeric.decimal.qsharp"),
            createToken("]", "punctuation.squarebracket.close.qsharp"),
        ]);
    });
});