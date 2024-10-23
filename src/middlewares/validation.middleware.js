import { body, validationResult } from 'express-validator';

const validateRequest = async (req, res, next) => {
  console.log(req.body);

  // 1. Setup rules for validation.
  const rules = [
    body('name')
      .notEmpty()
      .withMessage('Name is required'),  // Validation for name
    body('email')
      .isEmail()
      .withMessage('Invalid email address'),  // Validation for email
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),  // Password validation
    body('confirmPassword')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords do not match');  // Check if confirmPassword matches password
        }
        return true;  // Indicates the value is valid
      }),
  ];

  // 2. Run those rules.
  await Promise.all(rules.map((rule) => rule.run(req)));

  // 3. Check if there are any errors after running the rules.
  const validationErrors = validationResult(req);
  console.log(validationErrors);

  // 4. If errors, return the error message.
  if (!validationErrors.isEmpty()) {
    return res.render('signup', {  // Ensure correct template is rendered (e.g., 'signup' form)
      errorMessage: validationErrors.array()[0].msg,  // Show the first error message
    });
  }

  next();  // Proceed to the next middleware if validation passes
};

export default validateRequest;
