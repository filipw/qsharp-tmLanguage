import { should } from 'chai';
import { tokenize, createToken, Token } from './utils/tokenize';

describe("Callable declarations", () => {
    before(() => { should(); });

    it("Typed parameter", async () => {
        const tokens = await tokenize(`function Subarray<'T>(indices : Int[], array : 'T[]) : 'T[]`);
        tokens.should.deep.equal([
            createToken("function", "keyword.other.callable.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Subarray", "entity.name.function.qsharp"),
            createToken("<", "punctuation.definition.typeparameters.begin.qsharp"),
            createToken("'T", "entity.name.type.type-parameter.qsharp"),
            createToken(">", "punctuation.definition.typeparameters.end.qsharp"),
            createToken("(", "punctuation.parenthesis.open.qsharp"),
            createToken("indices", "entity.name.variable.parameter.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken(":", "punctuation.separator.colon.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Int", "storage.type.qsharp"),
            createToken("[", "punctuation.squarebracket.open.qsharp"),
            createToken("]", "punctuation.squarebracket.close.qsharp"),
            createToken(",", "punctuation.separator.comma.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("array", "entity.name.variable.parameter.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken(":", "punctuation.separator.colon.qsharp"),
            createToken(" '", "source.qsharp"),
            createToken("T", "support.function.quantum.qsharp"),
            createToken("[", "punctuation.squarebracket.open.qsharp"),
            createToken("]", "punctuation.squarebracket.close.qsharp"),
            createToken(")", "punctuation.parenthesis.close.qsharp"),
            createToken(" : '", "source.qsharp"),
            createToken("T", "support.function.quantum.qsharp"),
            createToken("[", "punctuation.squarebracket.open.qsharp"),
            createToken("]", "punctuation.squarebracket.close.qsharp"),
        ]);
    });

    it("Twp typed parameters", async () => {
        const tokens = await tokenize(`operation Delay<'T, 'U>(op : ('T => 'U), arg : 'T, aux : Unit) : 'U`);
        tokens.should.deep.equal([
            createToken("operation", "keyword.other.callable.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Delay", "entity.name.function.qsharp"),
            createToken("<", "punctuation.definition.typeparameters.begin.qsharp"),
            createToken("'T", "entity.name.type.type-parameter.qsharp"),
            createToken(",", "punctuation.separator.comma.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("'U", "entity.name.type.type-parameter.qsharp"),
            createToken(">", "punctuation.definition.typeparameters.end.qsharp"),
            createToken("(", "punctuation.parenthesis.open.qsharp"),
            createToken("op", "entity.name.variable.parameter.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken(":", "punctuation.separator.colon.qsharp"),
            createToken(" ('", "source.qsharp"),
            createToken("T", "support.function.quantum.qsharp"),
            createToken(" => 'U", "source.qsharp"),
            createToken(")", "punctuation.parenthesis.close.qsharp"),
            createToken(", arg : '", "source.qsharp"),
            createToken("T", "support.function.quantum.qsharp"),
            createToken(", aux : ", "source.qsharp"),
            createToken("Unit", "storage.type.qsharp"),
        ]);
    });

    
});