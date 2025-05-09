const express = require('express');
const path = require('path');
const app = express();


app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/chat',(req,res)=>{
  console.log(req.body);
  res.json({reply:"hello kaise hoo"});
});
app.listen(3000, () => {
  console.log('listening on *:3000');
});