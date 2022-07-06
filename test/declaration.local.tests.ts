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

    it("Pauli array", async () => {
        const tokens = await tokenize("let pauliGroup = [PauliX, PauliY, PauliZ];");
        tokens.should.deep.equal([
            createToken("let", "keyword.other.let.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("pauliGroup", "entity.name.variable.local.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("=", "keyword.operator.assignment.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("[", "punctuation.squarebracket.open.qsharp"),
            createToken("PauliX", "constant.language.pauli.qsharp"),
            createToken(",", "punctuation.separator.comma.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("PauliY", "constant.language.pauli.qsharp"),
            createToken(",", "punctuation.separator.comma.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("PauliZ", "constant.language.pauli.qsharp"),
            createToken("]", "punctuation.squarebracket.close.qsharp"),
        ]);
    });

    it("From callable invocation", async () => {
        const tokens = await tokenize("let result = M(qubit);");
        tokens.should.deep.equal([
            createToken("let", "keyword.other.let.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("result", "entity.name.variable.local.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("=", "keyword.operator.assignment.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("M", "entity.name.function.qsharp"),
            createToken("(", "punctuation.parenthesis.open.qsharp"),
            createToken("qubit", "variable.other.readwrite.qsharp"),
            createToken(")", "punctuation.parenthesis.close.qsharp"),
        ]);
    });
});