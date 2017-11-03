# Hacker News - React/Apollo App
This app is following a tutorial for how to use Apollo with React.
[Tutorial Link](https://www.howtographql.com/react-apollo/0-introduction/)

Goal - learn how to use react/redux with apollo to make graphql calls.


## Client App
Used tutorial ([React & Apollo](https://www.howtographql.com/react-apollo/0-introduction/)) as a guide.  

To run the app:
>$ npm install

>$ npm start

#### Issue #1
I ran into issues using graphcool (the tutorial is written for an older version), so I decided to just stand up my own graphql server (see section below).
#### Issue #2 
Needed to install `"react-apollo": "1.4.0",` specifically.  Otherwise there is an error about `createNetworkInterface` not being a function.

## Graphql server
Stood up a little graphql server to provide the endpoint for our app.  See [Running an Express GraphQL Server](http://graphql.org/graphql-js/running-an-express-graphql-server/)

To run server:
>$ cd graphqlServer

>$ npm install

>$ npm run dev

http://localhost:4000/graphql

### Issue with using express-graphql and react-apollo
It seems that `react-apollo` makes an `OPTIONS` call under the hood, which `express-graphql` doesn't support.  Added `cors` to handle the `OPTIONS` request.  Found solution [here](https://github.com/graphql/express-graphql/issues/14#issuecomment-219881556).