import app from './src/app.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT_EXPRESS;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});