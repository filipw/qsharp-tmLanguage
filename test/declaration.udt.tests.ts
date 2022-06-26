import { should } from 'chai';
import { tokenize, createToken, Token } from './utils/tokenize';

describe("User Defined Type declarations", () => {
    before(() => { should(); });

    it("Simple UDT without parenthesis", async () => {
        const tokens = await tokenize(`newtype LogicalRegister = Qubit[];`);
        tokens.should.deep.equal([
            createToken("newtype", "keyword.other.udt.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("LogicalRegister", "entity.name.type.udt.qsharp"),
            createToken(" = ", "source.qsharp"),
            createToken("Qubit", "storage.type.qsharp"),
            createToken("[", "punctuation.squarebracket.open.qsharp"),
            createToken("]", "punctuation.squarebracket.close.qsharp"),
            createToken(";", "source.qsharp"),
        ]);
    });

    it("Simple UDT with parenthesis", async () => {
        const tokens = await tokenize(`newtype StatePreparationTestCase = (Int, Double[]);`);
        tokens.should.deep.equal([
            createToken("newtype", "keyword.other.udt.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("StatePreparationTestCase", "entity.name.type.udt.qsharp"),
            createToken(" = ", "source.qsharp"),
            createToken("(", "punctuation.parenthesis.open.qsharp"),
            createToken("Int", "storage.type.qsharp"),
            createToken(",", "punctuation.separator.comma.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Double", "storage.type.qsharp"),
            createToken("[", "punctuation.squarebracket.open.qsharp"),
            createToken("]", "punctuation.squarebracket.close.qsharp"),
            createToken(")", "punctuation.parenthesis.close.qsharp"),
        ]);
    });

    it("Multi line UDT", async () => {
        const tokens = await tokenize(`internal newtype MCMTMask = (
ControlMask : Int, TargetMask : Int
);`);
        tokens.should.deep.equal([
            createToken("internal", "keyword.other.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("newtype", "keyword.other.udt.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("MCMTMask", "entity.name.type.udt.qsharp"),
            createToken(" = ", "source.qsharp"),
            createToken("(", "punctuation.parenthesis.open.qsharp"),
            createToken("ControlMask : ", "source.qsharp"),
            createToken("Int", "storage.type.qsharp"),
            createToken(",", "punctuation.separator.comma.qsharp"),
            createToken(" TargetMask : ", "source.qsharp"),
            createToken("Int", "storage.type.qsharp"),
            createToken(")", "punctuation.parenthesis.close.qsharp"),
        ]);
    });
});