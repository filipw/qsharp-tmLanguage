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

    it("X", async () => {
        const tokens = await tokenize("X(qubit)");
        tokens.should.deep.equal([createToken("X", "support.function.quantum.qsharp")]);
    });

    it("Y", async () => {
        const tokens = await tokenize("Y(qubit)");
        tokens.should.deep.equal([createToken("Y", "support.function.quantum.qsharp")]);
    });

    it("Z", async () => {
        const tokens = await tokenize("Z(qubit)");
        tokens.should.deep.equal([createToken("Z", "support.function.quantum.qsharp")]);
    });

    it("CNOT", async () => {
        const tokens = await tokenize("CNOT(qubit1, qubit2)");
        tokens.should.deep.equal([createToken("CNOT", "support.function.quantum.qsharp")]);
    });

    it("Rx", async () => {
        const tokens = await tokenize("Rx(0.5, qubit)");
        tokens.should.deep.equal([
            createToken("Rx", "support.function.quantum.qsharp"),
            createToken("(", "source.qsharp"),
            createToken("0.5", "constant.numeric.decimal.qsharp"),
        ]);
    });

    it("Ry", async () => {
        const tokens = await tokenize("Ry(0.5, qubit)");
        tokens.should.deep.equal([
            createToken("Ry", "support.function.quantum.qsharp"),
            createToken("(", "source.qsharp"),
            createToken("0.5", "constant.numeric.decimal.qsharp"),
        ]);
    });

    it("Rz", async () => {
        const tokens = await tokenize("Rz(0.5, qubit)");
        tokens.should.deep.equal([
            createToken("Rz", "support.function.quantum.qsharp"),
            createToken("(", "source.qsharp"),
            createToken("0.5", "constant.numeric.decimal.qsharp"),
        ]);
    });

    it("R", async () => {
        const tokens = await tokenize("R(PauliX, 0.5, qubit)");
        tokens.should.deep.equal([
            createToken("R", "support.function.quantum.qsharp"),
            createToken("(", "source.qsharp"),
            createToken("PauliX", "constant.language.pauli.qsharp"),
            createToken(", ", "source.qsharp"),
            createToken("0.5", "constant.numeric.decimal.qsharp"),
        ]);
    });

    it("R1", async () => {
        const tokens = await tokenize("R1(0.5, qubit);");
        tokens.should.deep.equal([
            createToken("R1", "support.function.quantum.qsharp"),
            createToken("(", "source.qsharp"),
            createToken("0.5", "constant.numeric.decimal.qsharp"),
        ]);
    });

    it("RFrac", async () => {
        const tokens = await tokenize("RFrac(PauliX, 2, 3, qubit);");
        tokens.should.deep.equal([
            createToken("RFrac", "support.function.quantum.qsharp"),
            createToken("(", "source.qsharp"),
            createToken("PauliX", "constant.language.pauli.qsharp"),
            createToken(", ", "source.qsharp"),
            createToken("2", "constant.numeric.decimal.qsharp"),
            createToken(", ", "source.qsharp"),
            createToken("3", "constant.numeric.decimal.qsharp"),
        ]);
    });

    it("M", async () => {
        const tokens = await tokenize("M(qubit)");
        tokens.should.deep.equal([createToken("M", "support.function.quantum.qsharp")]);
    });

    it("MultiM", async () => {
        const tokens = await tokenize("MultiM(qubits)");
        tokens.should.deep.equal([createToken("MultiM", "support.function.quantum.qsharp")]);
    });
});