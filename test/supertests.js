const { app, mongoURI } = require('./../server/server');
const request = require('supertest')(app);
const expect = require('chai').expect;


//require in Mongoose
const mongoose = require('mongoose');


//require in the Models
const User = require('./../server/models/userModel.js');
const Session = require('./../server/models/sessionModel.js');
const Thought = require('./../server/models/thoughtModel.js');


// Test Suite for MongoDB 

describe('MongoDB Tests', () => {
    
    before(async () => {
        process.env.NODE_ENV = 'test';
        await mongoose.connect(mongoURI);
        await User.deleteMany();
        await Session.deleteMany();
        await Thought.deleteMany();
      });
    
      after(async () => {
        await User.deleteMany();
        await Session.deleteMany();
        await Thought.deleteMany();
        await mongoose.connection.close();
      });


    describe ('Data Model Testing', () => {


        // Test Suite for User Model
        describe('User Data Model Tests', () => {
        
            beforeEach(async () => {
                await User.deleteMany(); // Clear the User collection before each test
              });
            
              afterEach(async () => {
                await User.deleteMany(); // Clear the User collection after each test
              });
          
            it('Should validate userData against User Schema', async () => {
              const userData = {
                username: 'Test Name',
                password: 'password',
                admin: false,
              };
          
              try {
                const createdUser = await User.create(userData);
          
                expect(createdUser).to.have.property('username', userData.username);
                expect(createdUser).to.have.property('admin', userData.admin);
                expect(createdUser.password).to.not.equal(userData.password);
              } catch (err) {
                throw new Error(`Validation or save failed: ${err.message}`);
              }
            });
          
          }); //END of User Model Testing Suite
          
    
    
    
        // Test Suite for Session Model
        describe('Session Data Model Tests', () => {
            beforeEach(async () => {
              await Session.deleteMany(); 
            });
          
            afterEach(async () => {
              await Session.deleteMany(); 
            });
          
            it('Should validate sessionData against Session Schema', async () => {
              const sessionData = {
                cookieId: 'uniqueCookie12345',
              };
          
              try {
                const createdSession = await Session.create(sessionData);
          
                expect(createdSession).to.have.property('cookieId', sessionData.cookieId);
                expect(createdSession).to.have.property('createdAt');
                expect(new Date(createdSession.createdAt).getTime()).to.be.lessThan(Date.now());
              } catch (err) {
                throw new Error(`Validation or save failed: ${err.message}`);
              }
            });
          
            it('Should fail validation for missing cookieId', async () => {
              const sessionData = {}; // Missing cookieId
          
              try {
                await Session.create(sessionData);
                throw new Error('Validation should have failed but did not');
              } catch (err) {
                expect(err).to.have.property('errors');
                expect(err.errors).to.have.property('cookieId');
              }
            });
          
          }); //END of Session Model Testing Suite
          
    
    
    
          // Test Suite for Thought Model
          describe('Thought Data Model Tests', () => {
            beforeEach(async () => {
              await Thought.deleteMany(); 
            });
          
            afterEach(async () => {
              await Thought.deleteMany(); 
            });
          
            it('Should validate thoughtData against Thought Schema', async () => {
              const thoughtData = {
                message: 'This is a test thought.',
                username: 'TestUser',
              };
          
              try {
                const createdThought = await Thought.create(thoughtData);
          
                expect(createdThought).to.have.property('message', thoughtData.message);
                expect(createdThought).to.have.property('username', thoughtData.username);
                expect(new Date(createdThought.createdAt).getTime()).to.be.lessThan(Date.now());
                expect(new Date(createdThought.expiresAt).getTime()).to.be.greaterThan(Date.now());
              } catch (err) {
                throw new Error(`Validation or save failed: ${err.message}`);
              }
            });
          
            it('Should fail validation for missing required fields', async () => {
              const thoughtData = {
                message: 'This is missing a username.',
              };
          
              try {
                await Thought.create(thoughtData);
                throw new Error('Validation should have failed but did not');
              } catch (err) {
                expect(err).to.have.property('errors');
                expect(err.errors).to.have.property('username');
              }
            });
          
          }); //END of Thought Model Testing Suite

    }); //END Data Model Testing




    describe('Admin Tools Route Tests', () => {
        describe('/allUsers Route', () => {
            it('Should return all users', async () => {
            // Insert test users
            await User.create([
                { username: 'User1', password: 'password1', admin: false },
                { username: 'User2', password: 'password2', admin: true },
            ]);
        
            const response = await request.get('/allUsers');
            console.log ("Response: ", response.body);
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array');
            expect(response.body).to.have.lengthOf(2);
        
            const usernames = response.body.map((user) => user.username);
            expect(usernames).to.include('User1');
            expect(usernames).to.include('User2');
            });
        });
        
        describe('/allSessions Route', () => {
            it('Should return all sessions', async () => {
            // Insert test sessions
            await Session.create([
                { cookieId: 'session1' },
                { cookieId: 'session2' },
            ]);
        
            const response = await request.get('/allSessions');
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array');
            expect(response.body).to.have.lengthOf(2);
        
            const sessionIds = response.body.map((session) => session.cookieId);
            expect(sessionIds).to.include('session1');
            expect(sessionIds).to.include('session2');
            });
        });
        
        describe('/allThoughts Route', () => {
            it('Should return all thoughts', async () => {
            // Insert test thoughts
            await Thought.create([
                { message: 'Thought1', username: 'User1' },
                { message: 'Thought2', username: 'User2' },
            ]);
        
            const response = await request.get('/allThoughts');
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array');
            expect(response.body).to.have.lengthOf(2);
        
            const messages = response.body.map((thought) => thought.message);
            expect(messages).to.include('Thought1');
            expect(messages).to.include('Thought2');
            });
        });
        
        describe('/deleteUser Route', () => {
            it('Should delete a user by username', async () => {
            // Insert test user
            await User.create({ username: 'UserToDelete', password: 'password', admin: false });
        
            // Send delete request
            const response = await request.get('/deleteUser').query({ username: 'UserToDelete' });
            expect(response.status).to.equal(200);
        
            // Verify user is deleted
            const user = await User.findOne({ username: 'UserToDelete' });
            expect(user).to.be.null;
            });
        
            it('Should return 404 if user does not exist', async () => {
            const response = await request.get('/deleteUser').query({ username: 'NonExistentUser' });
            expect(response.status).to.equal(404);
            });
        });


    }); //END ADMIN Tool End Points




}); //END of MongoDB Testing Suite