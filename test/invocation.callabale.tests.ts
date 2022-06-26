import { should } from 'chai';
import { tokenize, createToken, Token } from './utils/tokenize';

describe("Callable invocation", () => {
    before(() => { should(); });

    it("Two arguments", async () => {
        const tokens = await tokenize("ApplyFermionicSWAP(left, right)");
        tokens.should.deep.equal([
            createToken("ApplyFermionicSWAP", "entity.name.function.qsharp"),
            createToken("(", "punctuation.parenthesis.open.qsharp"),
            createToken("left", "variable.other.readwrite.qsharp"),
            createToken(",", "punctuation.separator.comma.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("right", "variable.other.readwrite.qsharp"),
            createToken(")", "punctuation.parenthesis.close.qsharp"),
        ]);
    });

    it("String argument", async () => {
        const tokens = await tokenize(`EqualityFactI(n, 0, "syndrome failure")`);
        tokens.should.deep.equal([
            createToken("EqualityFactI", "entity.name.function.qsharp"),
            createToken("(", "punctuation.parenthesis.open.qsharp"),
            createToken("n", "variable.other.readwrite.qsharp"),
            createToken(",", "punctuation.separator.comma.qsharp"),
            createToken(" 0", "source.qsharp"),
            createToken(",", "punctuation.separator.comma.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("\"", "string.quoted.double.qsharp"),
            createToken("syndrome failure", "string.quoted.double.qsharp"),
            createToken("\"", "string.quoted.double.qsharp"),
            createToken(")", "punctuation.parenthesis.close.qsharp"),
        ]);
    });

    it("Nested invocation", async () => {
        const tokens = await tokenize(`PowD(Cos(angle), 4.0)`);
        tokens.should.deep.equal([
            createToken("PowD", "entity.name.function.qsharp"),
            createToken("(", "punctuation.parenthesis.open.qsharp"),
            createToken("Cos", "entity.name.function.qsharp"),
            createToken("(", "punctuation.parenthesis.open.qsharp"),
            createToken("angle", "variable.other.readwrite.qsharp"),
            createToken(")", "punctuation.parenthesis.close.qsharp"),
            createToken(",", "punctuation.separator.comma.qsharp"),
            createToken(" 4.0", "source.qsharp"),
            createToken(")", "punctuation.parenthesis.close.qsharp"),
        ]);
    });

    it("Member access invocation", async () => {
        const tokens = await tokenize(`purifiedState::Prepare(qROMIdxRegister, [], qROMGarbage)`);
        tokens.should.deep.equal([
            createToken("purifiedState", "source.qsharp"),
            createToken("::", "punctuation.accessor.qsharp"),
            createToken("Prepare", "entity.name.function.qsharp"),
            createToken("(", "punctuation.parenthesis.open.qsharp"),
            createToken("qROMIdxRegister", "variable.other.readwrite.qsharp"),
            createToken(",", "punctuation.separator.comma.qsharp"),
            createToken(" []", "source.qsharp"),
            createToken(",", "punctuation.separator.comma.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("qROMGarbage", "variable.other.readwrite.qsharp"),
            createToken(")", "punctuation.parenthesis.close.qsharp"),
        ]);
    });
    
});