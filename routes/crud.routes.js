import express from 'express'
import { getCrudData, showContactDetails, updateUserDetails, updateUserNewDetails } from '../controller/crud.controller.js';



const router = express.Router();


// Create routes
router.get('/', getCrudData)
router.get('/show-contact/:id', showContactDetails);

// User update routes
router.get('/update-contact/:id', updateUserDetails);
router.post('/update-contact/:id', updateUserNewDetails );

export default router;