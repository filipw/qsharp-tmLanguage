import { should } from 'chai';
import { tokenize, createToken, Token } from './utils/tokenize';

describe("Callable declarations", () => {
    before(() => { should(); });

    it("Typed argument", async () => {
        const tokens = await tokenize(`function Subarray<'T>(indices : Int[], array : 'T[]) : 'T[]`);
        tokens.should.deep.equal([
            createToken("function", "keyword.other.callable.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Subarray", "entity.name.callable.qsharp"),
            createToken("<", "punctuation.definition.typeparameters.begin.qsharp"),
            createToken("'T", "entity.name.type.type-parameter.qsharp"),
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

    it("Twp typed arguments", async () => {
        const tokens = await tokenize(`operation Delay<'T, 'U>(op : ('T => 'U), arg : 'T, aux : Unit) : 'U`);
        tokens.should.deep.equal([
            createToken("operation", "keyword.other.callable.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("Delay", "entity.name.callable.qsharp"),
            createToken("<", "punctuation.definition.typeparameters.begin.qsharp"),
            createToken("'T", "entity.name.type.type-parameter.qsharp"),
            createToken(",", "punctuation.separator.comma.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("'U", "entity.name.type.type-parameter.qsharp"),
            createToken(">", "punctuation.definition.typeparameters.end.qsharp"),
            createToken("(op : ('", "source.qsharp"),
            createToken("T", "support.function.quantum.qsharp"),
            createToken(" => 'U)", "source.qsharp"),
            createToken(", arg : '", "source.qsharp"),
            createToken("T", "support.function.quantum.qsharp"),
            createToken(", aux : ", "source.qsharp"),
            createToken("Unit", "storage.type.qsharp"),
        ]);
    });

    
});