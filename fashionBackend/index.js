// IMPORTING EXPRESS
const express = require("express");
const app = express();
const path = require("path");
//  mahnoor tauseef work

//const bodyParser = require('body-parser');
//const http = require('http');
//const httpServer = require("http").createServer();
//const RoomInfo = require('./API/RealTimeChat/RoomInfo.js')

//                            PORTING
const {
  google_client_email,
  google_private_key_id,
  google_project_id,
  df_private_key,
} = require('./devkey');
const dialogflow = require('dialogflow');
require("dotenv").config();
const port = process.env.SERVER_PORT || 3000; //port no mungwaya

//                                               cors
const cors = require("cors");
app.use(express.json()); //json stringify k liye
app.use(cors());
// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//                                         GIVING ALL API FOLDERS

app.use("/api", require("./API/svgname/Router")); //Category Line k liye krungi
app.use("/api", require("./API/user/Router")); //login register k liye
app.use("/api", require("./API/Ad/Router")); //for posting and retrieving ads
app.use("/api", require("./API/ProductAdd/Router")); //done by mahnoor tauseef
app.use("/api", require("./API/category/Router")); //for category
app.use("/api", require("./API/ContactUs/Router")); //for contactus
// app.use("/api", require("./API/Reviews/Router")); //for contactus



//app.use('/api',require('./API/RealTimeChat/Router'))           //Mahnoor Tauseef ne realtime chat k liye banaya

const credentials = {
  client_email: google_client_email,
  private_key: df_private_key,
  rivate_key_id: google_private_key_id,
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});
const { v4: uuidv4 } = require('uuid');


app.post("/send-msg", async (req, res) => {
  try {
    console.log("Incoming request:", req.body);
    // Check if user_message is present in the req.body
    if (!req.body || !req.body.user_message) {
      console.error("Invalid request structure");
      res.status(400).send({ error: "Bad Request" });
      return;
    }
    const data = await runSample(req.body.user_message);
    console.log("Sent data:", data);
    // Backend
    console.log("Received user message:", req.body);
    res.send({ Reply: data });
  } catch (error) {
    console.error("Error handling user message:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});
const sessionId = uuidv4();
/**
 * Your function or logic that requires projectId.
 *
 * @param {string} projectId - The Dialogflow project ID.
 */

async function runSample(user_message, projectId = google_project_id) {
  // A unique identifier for the given session
  // const sessionId = uuidv4();

  // Create a new session
  const sessionClient = new dialogflow.SessionsClient({
    projectId,
    credentials,
  });
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the Dialogflow agent
        text: user_message,
        // The language used by the client (en-US)
        languageCode: "en-US",
      },
    },
  };

  // Send request and log result
  try {
    const [response] = await sessionClient.detectIntent(request);
    console.log("Detected intent");
    const result = response.queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
    if (result.intent) {
      console.log(`  Intent: ${result.intent.displayName}`);
    } else {
      console.log(`  No intent matched.`);
    }
    return result.fulfillmentText;
  } catch (error) {
    console.error("Error during intent detection:", error);
  }
}
console.log(sessionId);
// Example usage
runSample();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
