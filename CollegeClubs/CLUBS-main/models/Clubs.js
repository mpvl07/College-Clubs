const mongoose=require("mongoose");
const eventsSchema=new mongoose.Schema({
    clubname:{
        type:String,
        required:true
    },
    image:{
        type:Buffer,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },venue:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    }
})

const ClubEvent=new mongoose.model("ClubEvent",eventsSchema);
module.exports=ClubEvent;