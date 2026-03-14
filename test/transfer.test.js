const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const { getToken } = require('../helpers/authentication');

describe('Transfers', () => {
    describe('POST /transferencias', () => {
        it('Should return success 201 when transfer is equals or higher than R$ 10,00', async () => {
            const token = await getToken('luiz.neto', '123456'); // Call the getToken function with the correct credentials

            const response = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    contaOrigem: 1,
                    contaDestino: 2,
                    valor: 11,
                    token: ""
                });

            // Add assertions here
            expect(response.status).to.equal(201);

        });

        it('Should return fail 422 when transfer is lower than R$ 10,00', async () => {
            const token = await getToken('luiz.neto', '123456'); // Call the getToken function with the correct credentials

            const response = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    contaOrigem: 1,
                    contaDestino: 2,
                    valor: 8,
                    token: ""
                });

            // Add assertions here
            expect(response.status).to.equal(422);

        });
    });
});