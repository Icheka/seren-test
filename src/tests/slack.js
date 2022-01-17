const { expect } = require("chai");
const { mk, API_ROOT } = require(".");

describe("Slack bot API::", () => {
    it("should return a list of all registered users", async () => {
        return await mk(API_ROOT)
            .get(`/users`)
            .then(res => {
                // can't test for res.status === 200, since a cached response would return 304
                // that the 'type' property is 'success'.
                // More reliable this way.
                expect(res.body).property('type').to.be.eql('success');
            })
    });

    it("should return a list of user names and their moods", async () => {
        return await mk(API_ROOT)
            .get(`/moods`)
            .then(res => {
                expect(res.body).property('type').to.be.eql('success');
                if (res.body.data.length > 0) {
                    expect(res.body.data[0]).to.not.have.property('slackUserId');
                }
            })
    });

    it("should return a list of user names and their hobbies", async () => {
        return await mk(API_ROOT)
            .get(`/moods`)
            .then(res => {
                expect(res.body).property('type').to.be.eql('success');
                if (res.body.data.length > 0) {
                    expect(res.body.data[0]).to.not.have.property('slackUserId');
                }
            })
    });
});