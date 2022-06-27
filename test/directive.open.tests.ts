import { should } from 'chai';
import { tokenize, createToken, Token } from './utils/tokenize';

describe("Open directive", () => {
    before(() => { should(); });

    it("Basic", async () => {
        const tokens = await tokenize(`namespace A {
    open Microsoft.Quantum.Arithmetic;
}`);
        tokens.should.deep.equal([
            createToken("namespace", "keyword.other.namespace.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("A", "entity.name.type.namespace.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("{", "punctuation.curlybrace.open.qsharp"),
            createToken("    ", "source.qsharp"),
            createToken("open", "keyword.other.open.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Microsoft", "entity.name.type.namespace.qsharp"),
            createToken(".", "punctuation.accessor.qsharp"),
            createToken("Quantum", "entity.name.type.namespace.qsharp"),
            createToken(".", "punctuation.accessor.qsharp"),
            createToken("Arithmetic", "entity.name.type.namespace.qsharp"),
            createToken(";", "source.qsharp"),
            createToken("}", "punctuation.curlybrace.close.qsharp"),
        ]);
    });

    it("With alias", async () => {
        const tokens = await tokenize(`namespace A {
    open Microsoft.Quantum.Arrays as Array;
}`);
        tokens.should.deep.equal([
            createToken("namespace", "keyword.other.namespace.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("A", "entity.name.type.namespace.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("{", "punctuation.curlybrace.open.qsharp"),
            createToken("    ", "source.qsharp"),
            createToken("open", "keyword.other.open.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Microsoft", "entity.name.type.namespace.qsharp"),
            createToken(".", "punctuation.accessor.qsharp"),
            createToken("Quantum", "entity.name.type.namespace.qsharp"),
            createToken(".", "punctuation.accessor.qsharp"),
            createToken("Arrays", "entity.name.type.namespace.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("as", "keyword.other.alias.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Array", "entity.name.type.alias.qsharp"),
            createToken(";", "source.qsharp"),
            createToken("}", "punctuation.curlybrace.close.qsharp"),
        ]);
    });
});