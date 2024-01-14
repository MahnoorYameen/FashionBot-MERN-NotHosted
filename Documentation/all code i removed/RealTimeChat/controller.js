
// require("dotenv").config();
const { RoomInfo } = require("./RoomInfo");
const { connect } = require("mongoose");
require("dotenv").config();

const CreateRoom = async (req, res) => {
  console.log(req.body); // Log the entire request body
  const { roomID } = req.body;

  // Validate input data
  if (!roomID) {
    return res.status(400).json({ error: "Invalid userName or roomID" });
  }

  await connect(process.env.MONGO_URL);
  const CheckRoom = await RoomInfo.findOne({ room_id:roomID });
  if (!CheckRoom) {
    res.status(404).json({
      message: "Room Doesn't Exist",
    });
  try {
    // Save the room information to the MongoDB database
    await RoomInfo.create({
      room_id: roomID,
      // user_name: userName,
    });

    console.log("Room created successfully in the database");
    res.status(200).json({ message: "Room created successfully", roomID });
  } catch (error) {
    console.error("Error creating room:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
}
// module.exports = {CreateRoom}

module.exports = {
    CreateRoom
  }
  