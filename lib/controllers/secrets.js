const { Router } = require('express');
const { TopSecret } = require('../models/Secret');
// const SecretService = require('../services/SecretService');
// const authenticate = require('../middleware/authenticate');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const data = await TopSecret.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  })

  .post('/', async (req, res, next) => {
    try {
      const secret = await TopSecret.insert(req.body);
      res.json(secret);
    } catch (e) {
      next(e);
    }
  });
