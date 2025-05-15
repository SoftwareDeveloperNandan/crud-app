import mongoose from "mongoose";

const crudSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
    }
});

const crudModel = mongoose.model('Crud', crudSchema); // Model name
export default crudModel;
