import express from 'express';
import cors from 'cors';
import routes from './routes.js';
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/',routes);


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});