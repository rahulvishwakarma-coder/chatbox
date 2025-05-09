import express from 'express'
import * as path from 'path'
import { GoogleGenAI } from "@google/genai";
import mongoose from 'mongoose';

const app = express();
const ai = new GoogleGenAI({ apiKey: "AIzaSyAMTrxsrwjiWUHiEJpfoMpGO-8E_FqVU_0" });
const MongoURI = "mongodb+srv://newuser:Rahul1234@cluster0.zk6c18d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async ()=>{
    await mongoose.connect(MongoURI)
    console.log("connect Successfull");
}

connectDB().catch((error) => console.log(error));

app.use(express.json());
app.use(express.static('./public'));
app.use(express.urlencoded());


const CropsSchema = new mongoose.Schema({
    Name:String,
    Quantity:Number,
    Price:Number,
    Location:String
})

const Crops = mongoose.model('crops',CropsSchema);

const addcrops = async (Name,Quantity, Price,Location)=>{
    const crop = new Crops({
        Name,
        Quantity,
        Price,
        Location
    })
    await crop.save();
}


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/chat',async(req,res)=>{
  const usermessage = req.body.query;
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `${usermessage}`,
  });

  res.json({reply:response.text})
});

app.get('/getcrops',(req,res)=>{
      Crops.find()
        .then((crops)=>{
            res.send(crops);
        })
})

app.post('/crops',async(req,res)=>{
  const data = req.body;
  const {Name , Quantity, Price,Location} = data;
  await addcrops(Name,Quantity,Price,Location);
  res.send(200);
})

app.listen(3000, () => {
  console.log('listening on *:3000');
});