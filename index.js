import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/db.connection.js';
import router from './routes/crud.routes.js';
const app = express();

// initialize environment variable..
dotenv.config();
connectDB(); // db execute


// middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(router);


// Fallback Error handling 500 error before the 404 error.
app.use((err, req, res, next) => {
  console.error('SERVER ERROR:', err.stack);
  res.status(500).render('500', { message: 'Something went wrong on the server.'});
});

// 404 Not Found - fallback (Always last)
app.use((req, res) => {
  res.status(404).render('404', { message: 'The page you are looking for does not exist.' });
});

// Server creating
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App listen at Port ${PORT}`);
});
