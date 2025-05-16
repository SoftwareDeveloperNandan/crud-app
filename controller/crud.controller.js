import { validationResult } from "express-validator";
import Crud from "../model/crud.model.js";
import mongoose from "mongoose";


export const getCrudData = async (req, res) => {
    try {
        const { page = 1, limit = 5 } = req.query;
        const option = {
            page: parseInt(page),
            limit: parseInt(limit)
        }
        const userData = await Crud.paginate({}, option);
        const paginationKey = {
            totalDocs: userData.totalDocs,
            pageLimit: userData.limit,
            totalPages: userData.totalPages,
            currentPage: userData.page,
            pagingCounter: userData.pagingCounter,
            hasPrevPage: userData.hasPrevPage,
            hasNextPage: userData.hasNextPage,
            prevPage: userData.prevPage,
            nextPage: userData.nextPage,
            userData: userData.docs
        }

        // res.send(userData)
        // const userData = await Crud.find();
        if (!userData) {
            res.render('404', { message: 'User Not Found' });
        }
        res.status(200).render('home', { paginationKey });
        
    } catch (error) {
        console.error("Error in getCrudData:", error.message);
        res.status(500).render('500', { message: error });
    }
}
// New user Add.
export const addContacts = async (req, res) => {

    try {
        const errors = validationResult( req );
        // console.log("Error kya hai::", errors);
        // res.send(errors.mapped())

        if(errors.isEmpty()) {
            await Crud.create(req.body);
            res.status(201).redirect('/');
        } else {
            res.render('add-contact', { errors: errors.mapped(), formData: req.body });
        }
    } catch (error) {
        console.error("Error in addcontacts:", error.message)
        res.status(500).render('500', { message: error.message })
    }
}

export const showContactDetails = async (req, res) => {
    
    const { id } = req.params;

    const isValidId = mongoose.Types.ObjectId.isValid( id );
    if( !isValidId ){
       return res.status(400).render('404', { message: 'Invalid Id Format.' });
    }

    try {
        const getUserInfo = await Crud.findById( id );
        if (!getUserInfo) {
           return res.status(400).render('404', { message: 'User Not Found' });
        }
        res.status(200).render('show-contact', { getUserInfo });

    } catch (error) {
        console.error("Error in showContactDetails::", error.message);
        res.status(500).render('500', { message: "Somthing Went Wrong!" });
    }
}


export const updateUserDetails = async (req, res) => {

    const { id } = req.params;
    
    const isValidId = mongoose.Types.ObjectId.isValid( id );

    if ( !isValidId ) {
        return res.status(400).render('404', { message: 'Invalid User Id.' });
    }

    try {
        
        const getUserInfo = await Crud.findById( id );
        if ( !getUserInfo ) {
            return res.status(401).render('404', { message: 'User Not Found!' });
        }

        res.status(200).render('update-contact', {
            getUserInfo,
            id,
            formData: {},
            errors: {},
        });
    } catch (error) {
        console.error( 'Error in updateuserDetails:', error.message );
        res.status(500).render('500', { message: error });   
    }
}

export const updateUserNewDetails = async (req, res) => {

    const { id } = req.params;

    if( !mongoose.Types.ObjectId.isValid( id ) ){
       return res.status(400).render('404', { message: 'Invalid User Id.' });
    }

    // check middleware error
    const errors = validationResult( req );
    if ( !errors.isEmpty() ) {
        const getUserDetails = await Crud.findById( id ) // re-fetch userDetails from database
        return res.status(400).render('update-contact', {
            getUserInfo: getUserDetails,
            formData: req.body,
            errors: errors.mapped(),
            id
        })
    }

    try {
    const updateByUserDetails = req.body;
    const userUpdated = await Crud.findOneAndUpdate(
        { _id: id },
        { $set: updateByUserDetails },
        { new: true, runValidator: true } //runValidator check schema validation
    );

    // console.log("userUpdated:::", userUpdated)
    if ( !userUpdated ) {
        return res.status(400).render('404', { message: 'User Not Found' });
    }
    res.status(200).redirect('/');
   } catch (error) {

    console.error("Error in updateUserNewDetails:", error.message);
    res.status(500).render('500', { message: "Something Went Wrong." });

   }
}


export const userDetailDelete  = async (req, res) => {
    const { id } = req.params;

    const isValidId = mongoose.Types.ObjectId.isValid( id )
    if ( !isValidId ) {
        return res.status(400).render('404', { message: 'Invalid User Id.' });
    }
    try {
        console.log("Deleted id::", id)
        const userDeleted = await Crud.findByIdAndDelete( id );
        if ( !userDeleted ) {
            return res.status(402).render('404', { message: 'User Not Found' });
        }
    
        res.status(200).redirect('/')
    } catch (error) {
        console.error("Error in userDatailDelete:", error.message);
        
        res.status(500).render('500', { message: error });
    }
}