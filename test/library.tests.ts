import { should } from 'chai';
import { tokenize, createToken, Token } from './utils/tokenize';

describe("Library", () => {
    before(() => { should(); });

    it("I", async () => {
        const tokens = await tokenize("I(qubit)");
        tokens.should.deep.equal([createToken("I", "support.function.quantum.qsharp")]);
    });

    it("H", async () => {
        const tokens = await tokenize("H(qubit)");
        tokens.should.deep.equal([createToken("H", "support.function.quantum.qsharp")]);
    });

    it("CNOT", async () => {
        const tokens = await tokenize("CNOT(qubit1, qubit2)");
        tokens.should.deep.equal([createToken("CNOT", "support.function.quantum.qsharp")]);
    });
});