# Hacker News - React/Apollo App
This app is following a tutorial for how to use Apollo with React.
[Tutorial Link](https://www.howtographql.com/react-apollo/0-introduction/)

Goal - learn how to use react/redux with apollo to make graphql calls.

Note - built using node version 8.9

## Client App
Used tutorial ([React & Apollo](https://www.howtographql.com/react-apollo/0-introduction/)) as a guide.  

To run the app:
>$ npm install

>$ npm start

#### Issue #1
I ran into issues using graphcool, so I decided to just stand up my own graphql server (see section below).  The issues were due to the fact that when I started working on this, the tutorial is written for an older version of graphcool.  The instructions have since been updated and will probably now work without issue now.  I'm glad that I ran into this issue, because it was good experience to get a graphql server stood up and figure out the schema.

#### Issue #2
Part of the tutorial adds a search page to allow the user to type into a field and then display those links that contain that string in the description or url.  On the search page, there is a defect in the functionality in that when the links are displayed, if the user votes for a link, the cache is not updated, so the number of votes is not updated.  If you reload the page or go to the home page, the vote totals will be updated correctly.  This is due to the fact that the function to update the cache lives in the LinkList component and is passed into each Link component as a prop.  The Search component doesn't have access to that function and therefore doesn't pass it into the Link components.

## Graphql server
Stood up a little graphql server to provide the endpoint for our app.  

To run server:
>$ cd graphqlServer

>$ npm install

>$ npm run dev

http://localhost:4000/graphiql

### Issue with using express-graphql and react-apollo
It seems that `react-apollo` makes an `OPTIONS` call under the hood, which `express-graphql` doesn't support.  Added `cors` to handle the `OPTIONS` request.  Found solution [here](https://github.com/graphql/express-graphql/issues/14#issuecomment-219881556).

### Issue using subscriptions with express-graphql
First stood up graphql server with express-graphql: See [Running an Express GraphQL Server](http://graphql.org/graphql-js/running-an-express-graphql-server/).  However, in order to get the subscriptions working I had to change the server to use apollo-server-express.  See [Graphql Subscriptions Docs](https://www.apollographql.com/docs/graphql-subscriptions/express.html) and [How to Use Subscriptions in GraphiQL Tutorial](https://blog.apollographql.com/how-to-use-subscriptions-in-graphiql-1d6ab8dbd74b).  For some reason though, I can't get subscriptions working in GraphiQL