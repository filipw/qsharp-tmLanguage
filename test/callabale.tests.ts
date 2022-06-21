import { should } from 'chai';
import { tokenize, createToken, Token } from './utils/tokenize';

describe("Callable", () => {
    before(() => { should(); });

    it("Two arguments invocation", async () => {
        const tokens = await tokenize("ApplyFermionicSWAP(left, right);");
        tokens.should.deep.equal([
            createToken("ApplyFermionicSWAP", "entity.name.callable.qsharp"),
            createToken("(left, right)", "source.qsharp")
        ]);
    });

    it("String argument", async () => {
        const tokens = await tokenize(`EqualityFactI(n, 0, "syndrome failure");`);
        tokens.should.deep.equal([
            createToken("EqualityFactI", "entity.name.callable.qsharp"),
            createToken("(n, 0, ", "source.qsharp"),
            createToken("\"", "string.quoted.double.qsharp"),
            createToken("syndrome failure", "string.quoted.double.qsharp"),
            createToken("\"", "string.quoted.double.qsharp"),
            createToken(")", "source.qsharp"),
        ]);
    });

    it("Typed argument", async () => {
        const tokens = await tokenize(`Subarray<'T>(indices : Int[], array : 'T[]) : 'T[]`);
        tokens.should.deep.equal([
            createToken("Subarray", "entity.name.callable.qsharp"),
            createToken("<", "punctuation.definition.typeparameters.begin.qsharp"),
            createToken("'", "source.qsharp"),
            createToken("T", "entity.name.type.type-parameter.qsharp"),
            createToken(">", "punctuation.definition.typeparameters.end.qsharp"),
            createToken("(indices : ", "source.qsharp"),
            createToken("Int", "storage.type.qsharp"),
            createToken("[], array : '", "source.qsharp"),
            createToken("T", "support.function.quantum.qsharp"),
            createToken("[])", "source.qsharp"),
            createToken(" : '", "source.qsharp"),
            createToken("T", "support.function.quantum.qsharp"),
        ]);
    });
});