import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
dotenv.config();
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js'//import router and rename it into productRoutes
import userRoutes from './routes/userRoutes.js'
const port = process.env.PORT || 3000;

connectDB();

const app = express();

//Body parser middleware
//for raw json
app.use(express.json());
//for url encoded
app.use(express.urlencoded({ extended: true }));

//cookie parser middleware
app.use(cookieParser());


app.get('/', (req, res) => {
    res.send('Api is running...');
})

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);



app.listen(port, () => console.log(`server running on port ${port}`))