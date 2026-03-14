const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const { getToken } = require('../helpers/authentication');
const postTransfers = require('../fixtures/postTransfers.json');

describe('Transfers', () => {
    let token

    beforeEach(async () => {
        token = await getToken('luiz.neto', '123456'); // Call the getToken function with the correct credentials
    })

    describe('POST /transferencias', () => {


        it('Should return success 201 when transfer is equals or higher than R$ 10,00', async () => {
            const bodyTransfers = { ...postTransfers }

            const response = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransfers);

            // Add assertions here
            expect(response.status).to.equal(201);

        });

        it('Should return fail 422 when transfer is lower than R$ 10,00', async () => {
            const bodyTransfers = { ...postTransfers }
            bodyTransfers.valor = 7

            const response = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransfers);

            // Add assertions here
            expect(response.status).to.equal(422);

        });
    });

    describe('GET /transferencias/{id}', () => {
        it('It should return a 200 status with a successful transfer, and the database must be accurate when the ID is valid.', async () => {
            const response = await request(process.env.BASE_URL)
                .get('/transferencias/1')
                .set('Authorization', `Bearer ${token}`);

            // Add assertions here
            console.log(response.body)
            expect(response.body.id).to.equal(1);
            expect(response.body.conta_origem_id).to.equal(1);
            expect(response.body.conta_destino_id).to.equal(4);
            expect(response.body.id).to.be.a('number');
            expect(response.body.id).to.equal(1);
            expect(response.body.valor).to.equal(5001.00); // Issue, the value must be float and not string

            console.log(response.status)
            expect(response.status).to.equal(200);


        })
    });

    describe('GET /transferencias', () => {
        it('It should return 10 elements in the pagination when the limit is set to 10.', async () => {
            const response = await request(process.env.BASE_URL)
                .get('/transferencias?limit=10')
                .set('Authorization', `Bearer ${token}`);

            // Add assertions here
            expect(response.status).to.equal(200);
            expect(response.body.limit).to.equal(10); // Issue, the API is returning more than 10 elements instead of 10 when the limit is set to 10
            expect(response.body.transferencias).to.have.lengthOf(10);
            
        });
    });

});