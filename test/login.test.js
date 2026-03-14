const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const postLogin = require('../fixtures/postLogin.json');

describe('Login', () => {
    describe('POST /login', () => {
        it('Should return 200 with token in string when credentials are valid', async () => {
            const bodyLogin = {...postLogin }

            const response = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin); //Body from Swagger
                
            // Add assertions here
            expect(response.status).to.equal(200);
            console.log(response.status)
            expect(response.body.token).to.be.a('string');
            console.log(response.body)
        });
    });
});