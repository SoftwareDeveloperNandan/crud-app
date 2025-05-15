import crudModel from "../model/crud.model.js";

export const getCrudData = async (req, res) => {
    try {
        const userData = await crudModel.find();
        if (!userData) {
            return res.status(404).send('User Not Found.')
        }
        res.status(200).render('home', {userData});

    } catch (error) {
        console.error('Error in getCrudData.', error.message);
        res.status(500).send('Internal Server Error.')
    }
}


export const showContactDetails = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("What is id::", id);
        if(!id){
            return res.status(404).send("User ID is required.");
        }
        const getUserInfo = await crudModel.findById(req.params.id);
        if (!getUserInfo) {
            return res.status(404).send("User not found.");
        }
        res.status(200).render('show-contact', { getUserInfo });

    } catch (error) {
        console.error('Error in showContactDetails.', error.message)
        res.status(500).send('Internal Server Error.');
    }
}


export const updateUserDetails = async (req, res) => {
    try {
        const { id } = req.params;
        if ( !id ) {
            return res.status(404).send("User id not found.")
        }
        const getUserInfo = await crudModel.findById(id);
        if (!getUserInfo) {
            return res.status(404).send("User details not found.")
        }

        res.status(200).render('update-contact', {
            getUserInfo,
            id,
            formData: {},
            error: {},
        });
    } catch (error) {
        console.error("Error in updateUserDetails.", error.message);
        res.status(500).send('Internal Server Error')   
    }
}

export const updateUserNewDetails =  (req, res) => {
    const updateUserDetail = req.params;
    console.log(updateUserDetail);
}