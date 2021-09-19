let express=require('express');

let app=express();
let address="127.0.0.1:3300"


app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.use(express.static("public"))

app.listen(3300,'127.0.0.1',function(){
    console.log(`run server ${address}`);
})

app.get('/',function(req,res){
    // res.header("Access-Control-Allow-Origin", "*");
    res.send('ddd');
})