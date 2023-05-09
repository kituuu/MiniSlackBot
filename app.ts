// Importing bolt js module
const { App } = require("@slack/bolt");
require("dotenv").config();
// Function to fetch data from agify API
const guessAge = async (name: String): Promise<Object> => {
  // calling the fetch method with the name specified
  const response: Response = await fetch(`https://api.agify.io/?name=${name}`);
  // converting response object to json for conveniece
  const data: Object = await response.json();
  return data;
};

// Creating a app (interface) to control our slack bot.
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  port: process.env.PORT || 3000,
});

// message methods read all the message and response according to the first paramater passed to it.
// this will response only when "hello" is send
// Hard codede the botID cause I don't know how to dynamically get that from message +_+
app.message("<@U056JRZG0RY> hello", async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  await say(`Hey there <@${message.user}>!`);
});

// general message event handler, this will check that if the bot is mentioned in the message or not, if the bot is mentioned in the message, this event handler will say (console on slack) the same message again
app.message("", async ({ message, say }) => {
  let msg: String = message.text.toString();

  if (msg.includes("<@U056JRZG0RY>") && !msg.includes("hello"))
    await say(`${msg.replace("<@U056JRZG0RY>", `<@${message.user}>`)}`);
});

// Demo command - will respond with the message attach with it nothing fancy
app.command("/echo", async ({ command, ack, respond }) => {
  // Acknowledge command request
  await ack();
  // Generating a response for /echo command
  await respond(`${command.text}`);
});

// guessage command will guess he age of user using his/her name only using a online api
app.command("/guessage", async ({ command, ack, respond }) => {
  await ack();
  // Getting the response of API (data)
  let apiData: Object = await guessAge(String(command.text));
  //Generating a response for our slack command /guessage
  await respond(`Hmm look like a ${apiData["age"]} years old`);
});

// initialising bot app
(async () => {
  // Starting the app
  await app.start();
  // Logging in the terminal when the bot is running
  console.log("Mr.Awesome is doing his magixxx :D");
})();
