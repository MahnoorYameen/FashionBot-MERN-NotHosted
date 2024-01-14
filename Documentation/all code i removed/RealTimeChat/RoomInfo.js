const { Schema, model } = require('mongoose')


const RoomInfoSchema = new Schema({
  //TO display only that user notes who are logged in to account and dont show other users notes to all others.
    room_id:{
      type: Number,
      
    },
  });
    // user_name:{
    //   type:String
    // }

const RoomInfo = model('RoomInfo',RoomInfoSchema);

module.exports = RoomInfo;