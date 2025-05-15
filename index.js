import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/db.connection.js';
import router from './routes/crud.routes.js';
const app = express();

// initialize environment variable..
dotenv.config();
const PORT = process.env.PORT || 3000;
connectDB(); // db execute


// middleware
app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(router)

// Server creating
app.listen(PORT, () => {
    console.log(`App listen at Port ${PORT}`);
});
