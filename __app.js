const express = require('express')
const bodyparser = require('body-parser')
// const qraphqlHttp = require('express-graphql')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')

const app = express()


const events = []



app.use(bodyparser.json())

app.use('/garph', graphqlHTTP({


    schema: buildSchema(`


type Event {

_id: ID!
title: String!
description: String!
price: Float!
date:String!


}


input EventInput {

    title: String!
    description: String!
    price: Float!
    date:String!
    

}

type RootQuery {

    events:[Event!]! ,
    book:[String!]!


} 




type RootMutation {

    
    createEvent(eventInput:EventInput):Event

    
} 


schema{

    query:RootQuery

    mutation:RootMutation

}

`),


    rootValue: {

        events: () => {

            return events //['Hi test gra' , 'appl' , 'food']


        },


        book: () => {

            return ['book v', 'book y']

        },


        createEvent: (arges) => {

            // const eventName = arges.name
            // return eventName
            const event = {

                _id: Math.random().toString(),
                title: arges.eventInput.title,
                description: arges.eventInput.description,
                price: +arges.eventInput.price,

                date: arges.eventInput.date //new Date().toISOString()


            }

            console.log(arges)


            events.push(event)

            return event

        }

    },

    graphiql: true




}))




app.listen(3000, () => {

    console.log('====================================');
    console.log('run server');
    console.log('====================================');

})
