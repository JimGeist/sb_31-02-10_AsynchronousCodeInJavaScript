# sb_31-01-12_AsynchronousCodeInJavaScript

Please go to [jimgeist.github.io/sb_31-01-12_AsynchronousCodeInJavaScript](https://jimgeist.github.io/sb_31-01-12_AsynchronousCodeInJavaScript/) to execute the code via gitpages.

## Assignment Details
## Part 1: Number Facts
1. Make a request to the [Numbers API](http://numbersapi.com/) to get a fact about your favorite number. 

1. Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.

1. Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.

**Number Facts does not work on git hub pages because of mixed content. The numbers api is not available via https.**

**Enhancements**

- I am not sure if this counts as an enhancement, but the same form is used for all 3 options and each are correctly handled with JavaScript.
- For multiple numbers in a single request, any spaces are removed from the favorite number(s) field before processing.


## Part 2: Deck of Cards

It is funny that the Deck of Cards API exists!

The real piece of this exercise was building the html page that allows for the draw of cards from the deck. I thought to use localStorage to use the same deck_id instead of a new deck each time. It was possible, but the completed code required a decent amount of refactoring since it could not continue until the promise was satisfied, and it seemed incorrect to insert async and wait.  


### ENHANCEMENTS
- 'Card Me' button is disabled when remaining cards is zero (. . . I know - lame!). 


### DIFFICULTIES 
Forgetting how asynchronous code works and not thinking 4th dimensionally!

When stepping through code in a debugger, the promise does not execute right away. Without `async` and `wait`, the 'main' code will continue. This presented an issue as I attempted to stray away from always using a new deck each time and instead thought to write the deck id to local storage and use the local storage deck id. A shuffle in the page load event tests the deck id and a new deck id is obtained if the shuffle fails. 

Writing this description out made me realize the pieces that required refactoring to get it all to work. Needless to say, no local storage, and we get a new deck every time the program runs. Sad how long it takes to add code, but how quickly it can get removed (and no, I did not try this in a new branch which would have made the abort even quicker!).

And while on git hub, interesting factoid -- 'main' is used because they no longer wanted to use 'master'. ['Master', ‘Slave’ and the Fight Over Offensive Terms in Computing](https://www.nytimes.com/2021/04/13/technology/racist-computer-engineering-terms-ietf.html)