import { should } from 'chai';
import { tokenize, createToken, Token } from './utils/tokenize';

describe("Callable invocation", () => {
    before(() => { should(); });

    it("Two arguments", async () => {
        const tokens = await tokenize("ApplyFermionicSWAP(left, right);");
        tokens.should.deep.equal([
            createToken("ApplyFermionicSWAP", "entity.name.callable.qsharp"),
            createToken("(", "source.qsharp"),
            createToken("left", "variable.other.readwrite.qsharp"),
            createToken(", ", "source.qsharp"),
            createToken("right", "variable.other.readwrite.qsharp"),
            createToken(")", "source.qsharp"),
        ]);
    });

    it("String argument", async () => {
        const tokens = await tokenize(`EqualityFactI(n, 0, "syndrome failure");`);
        tokens.should.deep.equal([
            createToken("EqualityFactI", "entity.name.callable.qsharp"),
            createToken("(", "source.qsharp"),
            createToken("n", "variable.other.readwrite.qsharp"),
            createToken(", 0, ", "source.qsharp"),
            createToken("\"", "string.quoted.double.qsharp"),
            createToken("syndrome failure", "string.quoted.double.qsharp"),
            createToken("\"", "string.quoted.double.qsharp"),
            createToken(")", "source.qsharp"),
        ]);
    });
});