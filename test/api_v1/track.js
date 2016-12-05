const expect = require(`chai`).expect;
const request = require(`request-promise`);

describe(`/track`, () => {
    describe(`/add`, () => {
        it(`basic`, (done) => {
            let options = {
                method: `POST`,
                uri: `http://127.0.0.1:3000/api1/track/add`,
                body: {
                    money: 100 * Math.random(),
                    tags: `test, transfer fee`
                },
                json: true
            };
            request(options).then((res) => {
                expect(true).to.be.ok;
            }).catch((err) => {
                expect(true).to.be.not.ok;
            }).then(() => {
                done();
            });
        });
    });

    describe(`/list`, () => {
        it(`basic`, (done) => {
            let options = {
                uri: `http://127.0.0.1:3000/api1/track/list`,
                json: true
            };

            request(options).then((res) => {
                expect(Array.isArray(res.data)).to.be.ok;
            }).catch((err) => {
                expect(true).to.be.not.ok;
            }).then(() => {
                done();
            });
        });
    });
});
