const { Router } = require('express');
// const { User } = require('../models/User');
// const authenticate = require('../middleware/authenticate');
const UserService = require('../services/UserService');

// const TWO_DAYS_IN_MS = 2000 * 60 * 60 * 24;

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const user = await UserService.create(req.body);
    res.json(user);
  } catch (e) {
    next(e);
  }
});
