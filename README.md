# sb_31-02-10_AsynchronousCodeInJavaScript

Please go to [jimgeist.github.io/sb_31-02-10_AsynchronousCodeInJavaScript](https://jimgeist.github.io/sb_31-02-10_AsynchronousCodeInJavaScript/) to execute the code via gitpages.

## Assignment Details
## Part 1: Number Facts
Make a request to the [Numbers API](http://numbersapi.com/) to get a fact about a favorite number, multiple facts (some may repeat) about a favorite number, or one fact per number when multiple numbers are specified at once. 

`async` and `await` were used instead of using promises with `.then()` / `.catch()` callbacks.

**PLEASE NOTE: Number Facts does not work on git hub pages because of mixed content. The numbers api is not available via https.**

**Enhancements**

- The same form is used for all 3 options and each are correctly handled with JavaScript.
- For multiple numbers in a single request, any spaces are removed from the favorite number(s) field before processing.
- The same API function is called for both mulitiple facts about one number and for one fact for each number when multiple numbers are entered for favorite numbers.


## Part 2: Deck of Cards

The exercise involved building an html page that allows for the draw of cards from the deck. 

`async` and `await` were used instead of using promises with `.then()` / `.catch()` callbacks.

I thought to use localStorage to use the same deck_id instead of a new deck each time. It was possible, but the completed code required a decent amount of refactoring since it could not continue until the promise was satisfied, and it seemed incorrect to insert async and wait.  


### ENHANCEMENTS
- A DeckOfCards class was created with methods to shuffle a deck, shuffle a new deck, deal cards, get the deck id from local storage and save the deck id to local storage. 
- 'Card Me' button is disabled when remaining cards is zero. 


### DIFFICULTIES 
Forgetting to add `this.` before any method calls when the method call is made from within the class! And forgetting to set the class deckId to the deck_id returned when a new deck was used.
