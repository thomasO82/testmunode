const request = require("supertest");
const app = require("../src/server.js");

beforeEach(async () => {
    await request(app)
        .post('/test/reset')
})

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

    it("create user with bad value", async () => {
        const res = await request(app)
            .post('/users')
        expect(res.statusCode).toBe(400)
        expect(res.body.error).toBe('Missing fields')
    })
})

describe("get all users", () => {
    it("get all user with empty array", async () => {
        const res = await request(app)
            .get('/users')
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual([])
    })
    it("get all user with empty array", async () => {
        await request(app)
            .post('/users')
            .send({ name: "flo", email: "flo@live.fr" })
        const res = await request(app)
            .get('/users')
        expect(res.body[0].name).toBe("flo")
    })
    it("get all user with empty array", async () => {
        const users = [
            {
                name: "flolecassecouilles",
                email: "flo@live.fr",
            },
            {
                name: "Manon_late",
                email: "manon_jarrive-ptet@gmail.com"
            }
        ]
        users.forEach(async (user) => {
            await request(app)
                .post('/users')
                .send({ name: user.name, email: user.email })
        })
        const res = await request(app)
            .get('/users')
        expect(res.body.length).toBe(2)
        expect(res.body[0].name).toBe("flolecassecouilles")
        expect(res.body[1].name).toBe("Manon_late")
        expect(res.statusCode).toBe(200)
    })
})

describe('modify user', ()=>{
    it("modify user with success", async()=>{
         const user = await request(app)
            .post('/users')
            .send({ name: "flo", email: "flo@live.fr" })
             const res = await request(app)
            .put('/users/'+user.body.id)
            .send({name: "toto" , email: "toto.fr"})
            expect(res.statusCode).toBe(202)
            expect(res.body.message).toBe("update is successfull")
    })
})