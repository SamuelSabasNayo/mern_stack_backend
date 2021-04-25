/* eslint-disable no-underscore-dangle */
import chaihttp from 'chai-http';
import chai, { expect } from 'chai';
import { INTERNAL_SERVER_ERROR, CREATED, OK } from 'http-status';

import app from '../src/index';
import dummyData from './data.dummy';
import userHelper from '../src/helpers/userHelper';
import sessionHelper from '../src/helpers/sessionHelper';

let data;
let superAdmin;
let superAdminSession;
let createdUsersession;

const password = 'Qwerty@123';
const action = 'resetPassword';
const confirmPassword = 'Qwerty@123';

chai.use(chaihttp);
const router = () => chai.request(app);

describe('TEST REGISTER USER API', async () => {
  before(async () => {
    superAdmin = await userHelper.saveUser(dummyData[0], password, dummyData[0].profilePicture, true, dummyData[0].id);
    superAdminSession = await sessionHelper.generateSession(superAdmin._id, superAdmin.userName, superAdmin.email, superAdmin.isVerified);
  });

  it('LoggedIn user should be able to create an account', (done) => {
    router()
      .post('/api/auth/register-user')
      .set('session', superAdminSession)
      .field('userName', 'Test One')
      .field('email', 'test@gmail.com')
      .attach('profilePicture', `${__dirname}/./files/image.png`)
      .end((error, response) => {
        data = response.body.data;
        expect(response).to.have.status(CREATED);
        expect(response.body.message).to.be.a('string');
        expect(response.body).to.have.property('data');
        done(error);
      });
  });

  it('Catched error during create an account', (done) => {
    router()
      .post('/api/auth/register-user')
      .end((error, response) => {
        expect(response).to.have.status(INTERNAL_SERVER_ERROR);
        expect(response.body.message).to.be.a('string');
        done(error);
      });
  });
});

describe('TEST VIEW USER API', async () => {
  it('LoggedIn user should be able to view his/her users', (done) => {
    router()
      .get('/api/user/view-users?page=1&limit=1')
      .set('session', superAdminSession)
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body.message).to.be.a('string');
        expect(response.body).to.have.property('data');
        done(error);
      });
  });
});

describe('TEST EDIT USER DETAILS API', async () => {
  it('LoggedIn user should be able to edit his/her created un-verified user', (done) => {
    router()
      .patch(`/api/user/edit-user/${data.user._id}`)
      .set('session', superAdminSession)
      .field('userName', 'Test One Edited')
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body.message).to.be.a('string');
        done(error);
      });
  });
});

describe('TEST VERIFY USER API', async () => {
  before(async () => { createdUsersession = await sessionHelper.generateSession(data.user._id, data.user.userName, data.user.email); });

  it('User should be able to verify his/her account', (done) => {
    router()
      .get(`/api/auth/verify-user-account/${createdUsersession}`)
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body.message).to.be.a('string');
        done(error);
      });
  });
});

describe('TEST RESEND LINK API', async () => {
  it('User should be able to request a verification link', (done) => {
    router()
      .post(`/api/auth/resend-verification-link/${action}`)
      .send({ email: data.user.email })
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.be.a('string');
        done(error);
      });
  });
});

describe('TEST RESET USER PASSWORD API', async () => {
  before(async () => { createdUsersession = await sessionHelper.generateSession(data.user._id, data.user.userName, data.user.email); });

  it('User should be able to create reset password account', (done) => {
    router()
      .patch('/api/user/edit-profile')
      .set('session', createdUsersession)
      .field('password', password)
      .field('confirmPassword', confirmPassword)
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body.message).to.be.a('string');
        done(error);
      });
  });
});

describe('TEST LOGIN USER API', async () => {
  before(async () => { createdUsersession = await sessionHelper.generateSession(data.user._id, data.user.userName, data.user.email); });

  it('User should be able to login into his/her account', (done) => {
    router()
      .post('/api/auth/login-user')
      .send({ email: data.user.email, password })
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body.message).to.be.a('string');
        done(error);
      });
  });
});

describe('TEST LOGOUT USER API', async () => {
  it('Logged-in user should be able to loggout from his/her account', (done) => {
    router()
      .get('/api/auth/logout-user')
      .set('session', createdUsersession)
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body.message).to.be.a('string');
        done(error);
      });
  });
});

describe('TEST REMOVE USER API', async () => {
  before(async () => { await userHelper.verifyUserProfile(data.user._id, false); });

  it('Super logged-in user should be able to delete his/her unverified user', (done) => {
    router()
      .delete(`/api/user/remove-user/${data.user._id}`)
      .set('session', superAdminSession)
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body.message).to.be.a('string');
        done(error);
      });
  });
});

describe('TEST GET ENDPOINT AND KILL SUPER ADMIN', async () => {
  before(async () => {
    await userHelper.removeUser(superAdmin._id);
    await sessionHelper.destroySession('userId', superAdmin._id);
  });

  it('Logged-in user should be able to loggout from his/her account', (done) => {
    router()
      .get('/api')
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body.message).to.be.a('string');
        done(error);
      });
  });
});
