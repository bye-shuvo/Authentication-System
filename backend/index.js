import express from 'express';

const app = express();

app.listen(3000 , () => {
    console.log("Server started at the port : " , 3000);
})