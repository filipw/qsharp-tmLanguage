import { should } from 'chai';
import { tokenize, createToken, Token } from './utils/tokenize';

describe("Expression: Logical", () => {
    before(() => { should(); });

    it("Declaration not", async () => {
        const tokens = await tokenize(`let a = not b;`);
        tokens.should.deep.equal([
            createToken("let", "keyword.other.let.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("a", "entity.name.variable.local.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("=", "keyword.operator.assignment.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("not", "keyword.operator.logical.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("b", "variable.other.readwrite.qsharp"),
        ]);
    });

    it("Argument not", async () => {
        const tokens = await tokenize(`Fact(not And(false, false), "And returned wrong output.");`);
        tokens.should.deep.equal([
            createToken("Fact", "entity.name.function.qsharp"),
            createToken("(", "punctuation.parenthesis.open.qsharp"),
            createToken("not", "keyword.operator.logical.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("And", "entity.name.function.qsharp"),
            createToken("(", "punctuation.parenthesis.open.qsharp"),
            createToken("false", "constant.language.boolean.false.qsharp"),
            createToken(",", "punctuation.separator.comma.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("false", "constant.language.boolean.false.qsharp"),
            createToken(")", "punctuation.parenthesis.close.qsharp"),
            createToken(",", "punctuation.separator.comma.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("\"", "string.quoted.double.qsharp"),
            createToken("And returned wrong output.", "string.quoted.double.qsharp"),
            createToken("\"", "string.quoted.double.qsharp"),
            createToken(")", "punctuation.parenthesis.close.qsharp"),
        ]);
    });

    it("Declaration or", async () => {
        const tokens = await tokenize(`let a = b or c;`);
        tokens.should.deep.equal([
            createToken("let", "keyword.other.let.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("a", "entity.name.variable.local.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("=", "keyword.operator.assignment.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("b", "variable.other.readwrite.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("or", "keyword.operator.logical.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("c", "variable.other.readwrite.qsharp"),
        ]);
    });

    it("Declaration and", async () => {
        const tokens = await tokenize(`let a = b and c;`);
        tokens.should.deep.equal([
            createToken("let", "keyword.other.let.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("a", "entity.name.variable.local.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("=", "keyword.operator.assignment.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("b", "variable.other.readwrite.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("and", "keyword.operator.logical.qsharp"),
            createToken(" ", "source.qsharp"),
            createToken("c", "variable.other.readwrite.qsharp"),
        ]);
    });
});