const conf=require("dotenv");

module.exports= ()=>{
    
    conf.config({path:'./config/.env'});
}
