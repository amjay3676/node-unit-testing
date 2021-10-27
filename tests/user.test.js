const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");
const { response } = require("../server");
beforeEach((done) => {
    mongoose.connect("mongodb://localhost:27017/JestDB",
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => done());
  });
  
  afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(() => done())
    });
  });

  var token = null;
  test("POST /api/register", async () => {
    const data = { phone: "789-456-1230", email: "kali786@yopmail.com", password: "123456789" };
  
    await request(app).post("/api/register")
      .send(data)
      .expect(200)
      .then(async (response) => {
        expect(response.body).toMatchObject({ token: expect.anything()});

      });
  });

  test("POST /api/login", async () => {
    const data = { phone: "789-456-1230", email: "amjay1@yopmail.com", password: "pppppppp" };
    let response = await request(app).post("/api/login")
        .send({
            email: data.email,
            password: data.password,
        })
        .expect(200);
        // .then( async (response) => {
        //     expect(response.body).toMatchObject({ token: expect.anything()});
        // })
    expect(response.body);

  })
//   beforeAll((done) => {
//      request(app)
//       .post("/api/register")
//       .send({
//         phone: "8058360163",
//         email: "lmessi@fcbarcelona.com",
//         password: "12345678",
//       })
//       .end((err, response) => {
//         token = response.body.token; // save the token!
//         done();
//       });
    
//     request(app)
//       .post("/api/login")
//       .send({
//         email: "lmessi@fcbarcelona.com",
//         password: "12345678",
//       })
//       .end((err, res) => {
//         console.log(res.body.token)
//         token = res.body.token; // save the token!
//         done();
//       });
//   });