import * as express from "express";
import * as dotenv from 'dotenv';
import parser from "./parser";
import saveData from "./save";
dotenv.config();

const app = express();
const port = process.env.PORT;
app.use('/images',express.static('public/images'));
app.use('/data',express.static('public/data'));

app.use('*',(req,res)=>{
    res.redirect('/data/parse.json');
})
const start=async()=>{
   const data =await parser();
   saveData(data);
}
start();
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});