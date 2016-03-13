/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.
    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
        http://aws.amazon.com/apache2.0/
    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Space Geek for a space fact"
 *  Alexa: "Here's your space fact: ..."
 */

/**
 * App ID for the skills 
 */
var APP_ID = "amzn1.echo-sdk-ams.app.4531e2d0-d49b-48e0-8748-05f817475945"; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing space facts.
 */
var US_FACTS = [
     "The Declaration of Independence was signed on July four, seventeen seventy six.",
     "The idea of self-government is in the first three words of the Constitution. These words are, \"We the People\".",
     "The Constitution of the United States was written in seventeen eighty seven.",
     "The Bill of Rights is the first ten amendments to the United States Constitution.",
     "Thomas Jefferson wrote the Declaration of Independence and is the third President of the United States.",
     "James Madison is considered to be the \"Father of the Constitution\".",
     "Abraham Lincoln was the sixteenth President of the United States and signed the Emancipation Proclamation that set all slaves in the confederate states free.",
     "There are twenty seven amendments to the United States Constitution.",
     "The Bill of Rights is the first ten amendments to the United States Constitution.",
     "The three branches of the United States goverment are the executive, legislative and judicial.",
     "The Senate and the House are the two parts of United States Congress.",
     "The Supreme Court is the highest court in the United States.",
     "There are nine justices to the Supreme Court.",
     "George Washington was the first President of the United States.",
     "The United States Civil War was fought in the eighteen hundreds between the North and the South.",
     "Washington DC is the capital of the United States.",
     "Star Spangled Banner is the name of the United States national anthem.",
     "Franklin Roosevelt was the United States President during World War Two and the Great Depression.",
     "The Second Amendment to the United States Constitution guarantees the right of states to organize militias, or armies, and the right of individuals to bear arms.",
     "The Thirteenth Amendment to the United States Constitution abolished slavery.",
     "Andrew Jackson is considered to be the \"President of the People\"."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * USGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var USGeek = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
USGeek.prototype = Object.create(AlexaSkill.prototype);
USGeek.prototype.constructor = USGeek;

USGeek.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("USGeek onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

USGeek.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("USGeek onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
USGeek.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("USGeek onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

USGeek.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask Space Geek tell me a space fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random space fact from the space facts list
    var factIndex = Math.floor(Math.random() * US_FACTS.length);
    var fact = US_FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your US History fact: " + fact;

    response.tellWithCard(speechOutput, "USGeek", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the USGeek skill.
    var usGeek = new USGeek();
    usGeek.execute(event, context);
};

