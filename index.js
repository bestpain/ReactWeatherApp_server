const express=require('express');
const cors=require('cors');
const app=express();
const bodyParser=require('body-parser')
const api_helper = require('./api')
const API_KEY="beb4ede2007cd8285aba1d47a36b4045";
const ROOT_URL=`http://api.weatherstack.com/current?access_key=${API_KEY}`;
const port=process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());


app.get('/city/:zip',(req,res)=>{
	let {zip}=req.params
	api_helper.make_API_call(`${ROOT_URL}&query=${zip}`)
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.send(error)
    })	
});

app.get('/cities/:ziplist',async (req,res)=>{
	let zipList=(req.params.ziplist).split(',')
	let response=[];
	for(zip of zipList){
		try{
			let data=await api_helper.make_API_call(`${ROOT_URL}&query=${zip}`);
			response.push(data)
		}catch(e){
			res.status(500).send(e)
		}
	}
	res.send(response);	
});

app.listen(port,()=>{
	console.log('server listening on port',port)
})
