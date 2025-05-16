import express from 'express'
import { getCrudData, showContactDetails, updateUserDetails, updateUserNewDetails, userDetailDelete,addContacts } 
from '../controller/crud.controller.js';
import { checkFormValidation } from '../middleware/crud.middleware.js';


const router = express.Router();

// Create routes
router.get('/', getCrudData)

// add contact
router.get('/add-contact', (req, res)=> res.render('add-contact', {errors: {}, formData: {}}))
router.post('/add-contact', checkFormValidation, addContacts)

router.get('/show-contact/:id', showContactDetails);

// User update routes
router.get('/update-contact/:id', updateUserDetails);
router.post('/update-contact/:id', checkFormValidation, updateUserNewDetails );

// Delete route
router.get('/delete-user/:id', userDetailDelete);


export default router;