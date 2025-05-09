import express from 'express'
import * as path from 'path'
import { GoogleGenAI } from "@google/genai";

const app = express();
const ai = new GoogleGenAI({ apiKey: "AIzaSyAMTrxsrwjiWUHiEJpfoMpGO-8E_FqVU_0" });

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "Explain how AI works in a few words",
  });
  console.log(response.text);
}

main();


app.use(express.json());
app.use(express.static('./public'));

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
app.listen(3000, () => {
  console.log('listening on *:3000');
});