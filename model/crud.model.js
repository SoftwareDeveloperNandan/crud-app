import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const crudSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        trim: true,
    },
    lastname: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        trim: true,
    },
    phone: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        
    },
    address: {
        type: String,
        trim: true,
        maxlength: 200
    }
},{
    timestamps: true
}
);

crudSchema.plugin(mongoosePaginate);

const Crud = mongoose.model('Crud', crudSchema); // Model name
export default Crud;
