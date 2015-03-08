# Elevator-Mechanic

There shouldn't be much here that you haven't seen before. There is a simple [HTTP node server](https://nodejs.org/api/http.html).

The handler has been separated from the creation of the server. As your applications grow, separating your project into logical parts is essential.

Keeping the handlers separate also allows us to test it in isolation. This is important because we are not interested in Node HTTP's ability to trigger request events but whether or not the logic within the handler works as expected.

We are using [shot](https://www.npmjs.com/package/shot) to inject requests to the handler. This means we do not have to start the server or make real HTTP requests through the network stack. Instead, we inject mock requests directly to the handler and receive mock responses that we can then test. This saves us A LOT of time (real HTTP requests are slow).

We have also introduced a model file for managing your data, which is currently empty. 

### Tools
* We are writing acceptance tests using Mocha and Shot.
* We are using node's core Assert module for assertions.
* We are writing HTTP servers using node.

### Commands

* Install dependencies with ``` npm install ```
* Start the server with ``` make s ``` or ```node server.js```
* Run the tests with ``` make t ``` or ``` npm test ```

(If you are not familiar with [Make](http://en.wikipedia.org/wiki/Make_(software)), you might want to read Mike Bostock's article, *[Why Use Make](http://bost.ocks.org/mike/make/)*).
