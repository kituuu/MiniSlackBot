var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
// Importing bolt js module
var App = require("@slack/bolt").App;
require("dotenv").config();
// Function to fetch data from agify API
var guessAge = function (name) { return __awaiter(_this, void 0, void 0, function () {
    var response, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("https://api.agify.io/?name=".concat(name))];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                return [2 /*return*/, data];
        }
    });
}); };
// Creating a app (interface) to control our slack bot.
var app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true,
    appToken: process.env.SLACK_APP_TOKEN,
    port: process.env.PORT || 3000,
});
// message methods read all the message and response according to the first paramater passed to it.
// this will response only when "hello" is send
// Hard codede the botID cause I don't know how to dynamically get that from message +_+
app.message("<@U056JRZG0RY> hello", function (_a) {
    var message = _a.message, say = _a.say;
    return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: 
                // say() sends a message to the channel where the event was triggered
                return [4 /*yield*/, say("Hey there <@".concat(message.user, ">!"))];
                case 1:
                    // say() sends a message to the channel where the event was triggered
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
});
// general message event handler, this will check that if the bot is mentioned in the message or not, if the bot is mentioned in the message, this event handler will say (console on slack) the same message again
app.message("", function (_a) {
    var message = _a.message, say = _a.say;
    return __awaiter(_this, void 0, void 0, function () {
        var msg;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    msg = message.text.toString();
                    if (!(msg.includes("<@U056JRZG0RY>") && !msg.includes("hello"))) return [3 /*break*/, 2];
                    return [4 /*yield*/, say("".concat(msg.replace("<@U056JRZG0RY>", "<@".concat(message.user, ">"))))];
                case 1:
                    _b.sent();
                    _b.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
});
// Demo command - will respond with the message attach with it nothing fancy
app.command("/echo", function (_a) {
    var command = _a.command, ack = _a.ack, respond = _a.respond;
    return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: 
                // Acknowledge command request
                return [4 /*yield*/, ack()];
                case 1:
                    // Acknowledge command request
                    _b.sent();
                    // Generating a response for /echo command
                    return [4 /*yield*/, respond("".concat(command.text))];
                case 2:
                    // Generating a response for /echo command
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
});
// guessage command will guess he age of user using his/her name only using a online api
app.command("/guessage", function (_a) {
    var command = _a.command, ack = _a.ack, respond = _a.respond;
    return __awaiter(_this, void 0, void 0, function () {
        var apiData;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, ack()];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, guessAge(String(command.text))];
                case 2:
                    apiData = _b.sent();
                    //Generating a response for our slack command /guessage
                    return [4 /*yield*/, respond("Hmm look like a ".concat(apiData["age"], " years old"))];
                case 3:
                    //Generating a response for our slack command /guessage
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
});
// initialising bot app
(function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: 
            // Starting the app
            return [4 /*yield*/, app.start()];
            case 1:
                // Starting the app
                _a.sent();
                // Logging in the terminal when the bot is running
                console.log("Mr.Awesome is doing his magixxx :D");
                return [2 /*return*/];
        }
    });
}); })();
