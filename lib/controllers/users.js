const { Router } = require('express');
// const { User } = require('../models/User');
// const authenticate = require('../middleware/authenticate');
const UserService = require('../services/UserService');

const TWO_DAYS_IN_MS = 2000 * 60 * 60 * 24;

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const user = await UserService.create(req.body);
      res.json(user);
    } catch (e) {
      next(e);
    }
  })

  .post('/sessions', async (req, res, next) => {
    try {
      const token = await UserService.signIn(req.body);
      res
        .cookie(process.env.COOKIE_NAME, token, {
          httpOnly: true,
          maxAge: TWO_DAYS_IN_MS,
        })
        .json({ message: 'Successfully signed in' });
    } catch (e) {
      next(e);
    }
  });
