const { Router } = require('express');
const { TopSecret } = require('../models/Secret');
// const authenticate = require('../middleware/authenticate');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const data = await TopSecret.getAll();
    res.json(data);
  } catch (e) {
    next(e);
  }
});
