import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config();

import router from './routes/web.js';


const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8000;


app.use('/api', router)

app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`)
})