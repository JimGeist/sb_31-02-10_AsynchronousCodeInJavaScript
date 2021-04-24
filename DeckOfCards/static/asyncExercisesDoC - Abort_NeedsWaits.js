
const LOCALSTORAGEITEM = "deckOfCards";
let deckId = "new";


function callNumbersAPI(favNbr, fx) {

    /*
        Call the numbers api at http://numbersapi.com/favNbr
        for trivia about the number
    */

    const ROOT_API = 'http://numbersapi.com/';
    const config = {
        headers: { "Content-Type": "application/json" }
    }

    let numberPromise = axios.get(`${ROOT_API}${favNbr}`, config);

    numberPromise
        .then(data => fx(data, "success"))
        .catch(err => fx(err, "failure"));

}

function callNumbersAPIMulti(favNbr, nbrOfFacts, fx) {

    /*
        Call the numbers api at http://numbersapi.com/favNbr
        for trivia about the number.

        nbrOfFacts is the number of facts to return.

        Yes, this function (callNumbersAPIMulti) and callNumbersAPI 
        could get refactored into one function. 
    */

    const ROOT_API = 'http://numbersapi.com/';
    const config = {
        headers: { "Content-Type": "application/json" }
    }

    const nbrFacts = []

    for (let i = 0; i < nbrOfFacts; i++) {
        nbrFacts.push(axios.get(`${ROOT_API}${favNbr}`, config));
    }

    Promise.all(nbrFacts)
        .then(data => fx(data, "success-m"))
        .catch(err => fx(err, "error"))

}


/*
    DECK OF CARDS API RELATED FUNCTIONS
*/

function callDeckOfCardsAPI(inApiAction, fx) {

    /*
        Call the base deck of cards api at https://deckofcardsapi.com/api/deck/<apiAction>
        <apiAction> is the remainder of the url for a specific feature.

        apiAction:
        new/shuffle/?deck_count=1 -- shuffles a deck of cards
        <<deck_id>>/draw/?count=x -- draws x cards from <<deck_id>>
        new/draw/?count=x         -- shuffles deck and draws x cards
            response:
                {
                    "success": true,
                    "cards": [
                        {
                            "image": "https://deckofcardsapi.com/static/img/KH.png",
                            "value": "KING",
                            "suit": "HEARTS",
                            "code": "KH"
                        }, . . . 
                      . . . for x cards
                    ],
                    "deck_id":"vkl5zeyo13vw",
                    "remaining": 50
                }

        <<deck_id>>/shuffle/      -- reshuffles deck <<deck_id>>
    
        Using deck "vkl5zeyo13vw". No need to polute the api with unused decks.
    */

    const ROOT_DECK_API = 'https://deckofcardsapi.com/api/deck/';

    // const DECK_ID = "vkl5zeyo13vw";

    // let apiAction = inApiAction.replace("<<deck_id>>", DECK_ID)

    let cardPromise = axios.get(`${ROOT_DECK_API}${inApiAction}`);

    // REMEMBER TO CHECK FOR DECK_ID ERROR, ESPECIALLY SINCE WE ARE INITIALIZING FROM
    //  LOCAL STORAGE AND A BAD DECK_ID COULD PREVENT THE CARD DECK FROM EVER WORKING.
    cardPromise
        .then(data => fx(data["data"]))
        .catch(err => fx(err));

    // numberPromise
    // .then(data => fx(data, "success"))
    // .catch(err => fx(err, "failure"));

    let flowCheck = 1;

}


function handleCard(data) {

    // data:
    // {
    //     "success": true,
    //     "cards": [
    //         {
    //             "image": "https://deckofcardsapi.com/static/img/KH.png",
    //             "value": "KING",
    //             "suit": "HEARTS",
    //             "code": "KH"
    //         }, . . . 
    //       . . . for x cards
    //     ],
    //     "deck_id":"vkl5zeyo13vw",
    //     "remaining": 50
    // }

    if (data["success"]) {
        $("#card").attr("src", data["cards"][0]["image"])

        if (data["remaining"] < 1) {
            $("#deal-card").prop("disabled", true)
        }
    }

    let i = 1;

}


function dealCard(evt) {

    evt.preventDefault();

    callDeckOfCardsAPI(`${deckId}/draw/?count=1`, handleCard)

}


/** setLocalStorage
 * 
 * Function saves the deckId to the deckOfCards key in localStorage
 * 
 * @param {*} inObject: string, typically 12 characters in length.
 */
function setLocalStorage(inObject) {

    localStorage.setItem(LOCALSTORAGEITEM, JSON.stringify(inObject));

}


/** getLocalStorage
 * 
 * Function retrieves the "deckOfCards" item, the deck id, from localStorage and if it exists, the 
 *  global deck_id is set to the id.
 */
function getLocalStorage() {

    // retrieve the deck id, if any, from localStorage so we always use that deck.
    const tempId = JSON.parse(localStorage.getItem(LOCALSTORAGEITEM));

    if (tempId !== null) {
        deckId = tempId;
    }

    deckId = "vkl5zeyo13vw";
}


function handleShuffle(inData) {
    /* For a shuffle, data is either
        {
            "success": true,
            "deck_id": "vkl5zeyo13vw",
            "remaining": 52,
            "shuffled": true
        }
        OR
        {
            "success": false,
            "error": "Deck ID does not exist."
        }

       When success is false, we will get a new deck_id by using "new"
       and calling the shuffle again.

    */

    if (inData["success"]) {
        // set the deckId to the deck_id returned
        // save the deck_id to localStorage
        deckId = inData["deck_id"];
        setLocalStorage(deckId);

    } else {
        // failed.
        deckId = "new";
    }

    return inData["success"];

}


// waits for the DOM to load
$(function () {

    // // Once the DOM is loaded, build the structures needed for the Jeopardy game like the game name,
    // //  a container to handle messages, a container for the loader spinny-thingy, and a container for 
    // //  the game board. Once the containers are built, paragraph and button elements are created.

    // $("<h1>").text("JEOPARDY").prependTo($("body"));
    // // build game element containers
    // $("h1").after('<div id="container-messaging"></div>');
    // $("#container-messaging").after('<div class="shift loader center hide" id="loader"></div>');
    // $("#loader").after('<div id="container-board"></div>');

    // // set up space in container-messaging for a paragraph to hold errors, if any.
    // $("<p>").html("&nbsp;").attr("id", "messages").appendTo($("#container-messaging"));

    // // add a button to the board container.
    // $("<button>").text(BUTTON_TEXT_INITIAL).attr("id", "btn-start-restart").addClass("center").appendTo($("#container-board"));

    // get the deck id from localStorage
    getLocalStorage();

    // shuffle the deck. The deck shuffle ensures the deckId is valid.
    let continueLoop = true;
    let failSafe = 0;
    while (continueLoop && failSafe < 5) {

        callDeckOfCardsAPI(`${deckId}/shuffle`, handleShuffle);

        failSafe++;

    }




    // // listener for click of the start button
    // $("#btn-start-restart").on("click", setupAndStart);

});


$("#deal-card").on("click", dealCard);


