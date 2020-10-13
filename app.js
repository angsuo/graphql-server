const express = require("express");

const bodyParser = require("body-parser");

const { graphqlHTTP } = require("express-graphql");

const { buildSchema } = require("graphql");

const app = express();

app.use(bodyParser.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(`
        type RootQuery {
            events: [String!]!
        }   
        
        type RootMutation {
            createEvent(name: String): String
        }
    
        schema {
                query: RootQuery
                mutation: RootMutation
        }
    `),
    rootValue: {
      events: () => {
        return ["Event X", "Event Y", "Event Z"];
      },
      createEvent: (args) => {
        const eventName = args.name;
        return eventName;
      },
    },
    graphiql: true,
  })
);

app.get("/", (req, res, next) => {
  res.send("hello world");
});

app.listen(5000, () => console.log("Connected on port 5000"));
