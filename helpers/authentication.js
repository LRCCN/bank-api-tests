const request = require('supertest');
const postLogin = require('../fixtures/postLogin.json');


const getToken = async (username, password) => {
    const bodyLogin = {...postLogin }
    
    const responseLogin = await request(process.env.BASE_URL) // When await is used the function must be async
        .post('/login')
        .set('Content-Type', 'application/json')
        .send(bodyLogin); //Body from Swagger

    return responseLogin.body.token;
}

module.exports = {
    getToken
}
