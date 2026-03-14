const request = require('supertest');

const getToken = async (username, password) => {
    const responseLogin = await request(process.env.BASE_URL) // When await is used the function must be async
        .post('/login')
        .set('Content-Type', 'application/json')
        .send({ 'username': username, 'senha': password }); //Body from Swagger

    return responseLogin.body.token;
}

module.exports = {
    getToken
}
