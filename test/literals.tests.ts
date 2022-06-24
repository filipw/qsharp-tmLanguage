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

    it("Zero", async () => {
        const tokens = await tokenize("return input == Zero;");
        tokens.should.deep.equal([
            createToken("return", "keyword.control.qsharp"),
            createToken(" input == ", "source.qsharp"),
            createToken("Zero", "constant.language.result.zero.qsharp")
        ]);
    });

    it("One", async () => {
        const tokens = await tokenize("return input == One;");
        tokens.should.deep.equal([
            createToken("return", "keyword.control.qsharp"),
            createToken(" input == ", "source.qsharp"),
            createToken("One", "constant.language.result.one.qsharp")
        ]);
    });

    it("Paulis", async () => {
        const tokens = await tokenize("let pauliGroup = [PauliX, PauliY, PauliZ];");
        tokens.should.deep.equal([
            createToken("let", "keyword.control.qsharp"),
            createToken(" pauliGroup = [", "source.qsharp"),
            createToken("PauliX", "constant.language.pauli.qsharp"),
            createToken(", ", "source.qsharp"),
            createToken("PauliY", "constant.language.pauli.qsharp"),
            createToken(", ", "source.qsharp"),
            createToken("PauliZ", "constant.language.pauli.qsharp")
        ]);
    });
});