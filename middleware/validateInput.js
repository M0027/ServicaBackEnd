const { body, validationResult } = require('express-validator');

const validateSignup = [
  body('name').notEmpty().trim().escape(),
  body('phone').isNumeric().isLength({ min: 9 }),
  body('password').isStrongPassword({
    minLength: 8,
    minSymbols: 1,
    minNumbers: 1
  }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }

];

const validateComment = [
  body('comment').notEmpty().trim().escape(),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }

];

const validateOrder = [
  body('description').isLength({ min: 15 }).trim().escape(),
  body('location').notEmpty().trim().escape(),
  body('title').notEmpty({ min: 6 }).trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }

];

const validateProfile = [
  body('description').isLength({ min: 15 }).trim().escape(),
  body('address').notEmpty().trim().escape(),
  body('image_url').optional().isURL(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

const validateProposta = [
  body('price').notEmpty().isNumeric(),
  body('message').notEmpty().trim().escape(),
  body('status').notEmpty().trim().escape(),


  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
// outros campos...

;

module.exports = {
  validateSignup,
  validateComment,
  validateOrder,
  validateProfile,
  validateProposta
};
