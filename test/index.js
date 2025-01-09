const app = require('./../server/server');
const request = require('supertest')(app);
const expect = require('chai').expect;
const bcrypt = require('bcryptjs');
const sinon = require('sinon');

describe('The Test is running', () => {
    console.log ('Hello World');

    it('This test is running and it checks that 1 = 1', (done) => {
        expect (1 === 1);
        done ();
    });
})