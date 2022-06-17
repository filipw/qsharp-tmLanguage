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
});