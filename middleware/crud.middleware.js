import { body, validationResult } from "express-validator";
 
export const checkFormValidation =  [
        body('firstname')
        .notEmpty()
            .withMessage('Firstname is required.')
        .isLength({min: 3, max: 50})
            .withMessage('Firstname must be at least 3 charecter long.')
        .isAlpha().withMessage('Firstname must contain only latters.')
        .trim(),

        body('lastname')
        .notEmpty()
            .withMessage('Lastname is required.')
        .isLength({min: 3})
            .withMessage('Lastname must be at least 3 charecter long.')
        .isAlpha()
            .withMessage('Lastname must contain only latters.')
        .trim(),

        body('phone')
        .notEmpty()
            .withMessage("Phone number is required.")
        .isLength({ min: 10, max: 10 })
            .withMessage("Phone number must be exactly 10 digits.")
        .isNumeric()
            .withMessage("Phone number must contain only digits.")
        .matches(/^[6-9]\d{9}$/)
            .withMessage("Please enter a valid Indian phone number.")
        .trim(),

        body('email')
        .notEmpty()
            .withMessage("Email is required.")
        .isEmail()
            .withMessage("Please provide a valid email.")
        .trim().normalizeEmail(),

        body('address')
        .notEmpty()
            .withMessage('Address field required')
        .isLength({ min: 10 })  
            .withMessage('Address must be at least 10 charecter long.')
        .trim(),
    ]
