import express from 'express';
import cors from 'cors';
import routes from './routes.js';
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
cors({
    origin: '*', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
});
// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use('/',routes);


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});