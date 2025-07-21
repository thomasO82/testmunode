const request = require("supertest");
const app = require("../src/server.js");


describe('Pack test user post', () => {
    it("create user with good value", async () => {
        const res = await request(app)
            .post('/users')
            .send({ name: "flo", email: "flo@live.fr" })
        expect(res.statusCode).toBe(201)
        expect(res.body).toHaveProperty('id')
        expect(res.body.name).toBe("flo")
    })

    it("create user with bad value", async () => {
        const res = await request(app)
            .post('/users')
            .send({ email: "flo@live.fr" })
        expect(res.statusCode).toBe(400)
        expect(res.body.error).toBe('Missing fields')

    })

})
