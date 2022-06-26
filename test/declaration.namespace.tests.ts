import { should } from 'chai';
import { tokenize, createToken, Token } from './utils/tokenize';

describe("Namespace declarations", () => {
    before(() => { should(); });

    it("Empty single line", async () => {
        const tokens = await tokenize(`namespace Microsoft.Quantum.Samples {}`);
        tokens.should.deep.equal([
            createToken("namespace", "keyword.other.namespace.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Microsoft", "entity.name.type.namespace.qsharp"),
            createToken(".", "punctuation.accessor.qsharp"),
            createToken("Quantum", "entity.name.type.namespace.qsharp"),
            createToken(".", "punctuation.accessor.qsharp"),
            createToken("Samples", "entity.name.type.namespace.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("{", "punctuation.curlybrace.open.qsharp"),
            createToken("}", "punctuation.curlybrace.close.qsharp"),
        ]);
    });

    it("Empty multi line", async () => {
        const tokens = await tokenize(`namespace Microsoft.Quantum.Samples
{
}`);
        tokens.should.deep.equal([
            createToken("namespace", "keyword.other.namespace.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Microsoft", "entity.name.type.namespace.qsharp"),
            createToken(".", "punctuation.accessor.qsharp"),
            createToken("Quantum", "entity.name.type.namespace.qsharp"),
            createToken(".", "punctuation.accessor.qsharp"),
            createToken("Samples", "entity.name.type.namespace.qsharp"),
            createToken("{", "punctuation.curlybrace.open.qsharp"),
            createToken("}", "punctuation.curlybrace.close.qsharp"),
        ]);
    });

    it("With no-op code", async () => {
        const tokens = await tokenize(`namespace Microsoft.Quantum.Samples {
    open Microsoft.Quantum.Arithmetic; 
    // ...
}
        `);
        tokens.should.deep.equal([
            createToken("namespace", "keyword.other.namespace.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Microsoft", "entity.name.type.namespace.qsharp"),
            createToken(".", "punctuation.accessor.qsharp"),
            createToken("Quantum", "entity.name.type.namespace.qsharp"),
            createToken(".", "punctuation.accessor.qsharp"),
            createToken("Samples", "entity.name.type.namespace.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("{", "punctuation.curlybrace.open.qsharp"),
            createToken("    ", "source.qsharp"),
            createToken("open", "keyword.other.qsharp"),
            createToken(" Microsoft.Quantum.Arithmetic; ", "source.qsharp"),
            createToken("    ", "punctuation.whitespace.comment.leading.qsharp"),
            createToken("//", "punctuation.definition.comment.qsharp"),
            createToken(" ...", "comment.line.double-slash.qsharp"),
            createToken("}", "punctuation.curlybrace.close.qsharp"),
        ]);
    });
});