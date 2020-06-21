const express = require('express')
const bodyparser = require('body-parser')
// const qraphqlHttp = require('express-graphql')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const mongoose = require('../../node/nodedb/test/node_modules/mongoose')
const modelsmongo = require('./models/event')
const mongoUsermodels = require('./models/user')
const bcrypt = require('../../node/nodedb/test/node_modules/bcrypt')
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
creator:Users!


}


input EventInput {

    title: String!
    description: String!
    price: Float!
    date:String!
    createEvents:[Event!]

}

type Users {

    _id:ID!
    email:String!
    password:String!

}

input UsersInput {

    email:String!
    password:String!

}

type RootQuery {

    events:[Event!]! ,
    book:[String!]!


} 




type RootMutation {

    
    createEvent(eventInput:EventInput):Event

    createuser(inputuser:UsersInput):Users
} 


schema{

    query:RootQuery

    mutation:RootMutation

}

`),


    rootValue: {

        events: () => {


return modelsmongo.find().populate('creator')

.then(result => {

return result.map(docc => {

    return{ ...docc._doc , _id: docc.id.toString() , creator:{


        ...docc._doc.creator._doc,
        _id:docc._doc.creator.id
        

    } }

})

})
.catch(err => {

    console.log(err);
    

})


            // return events //['Hi test gra' , 'appl' , 'food']


        },


        book: () => {

            return ['book v', 'book y']

        },


        createEvent: (arges) => {

            // const eventName = arges.name
            // return eventName
            // const event = {

            //     _id: Math.random().toString(),
            //     title: arges.eventInput.title,
            //     description: arges.eventInput.description,
            //     price: +arges.eventInput.price,

            //     date: arges.eventInput.date //new Date().toISOString()

            // }
const eventss = new modelsmongo  ({

                title: arges.eventInput.title,
                description: arges.eventInput.description,
                price: +arges.eventInput.price,

                date: new Date(arges.eventInput.date) //new Date().toISOString()
})

return eventss
.save()
.then(result => {

    console.log(result);
    return {...result._doc}

})
.catch(err => {

console.log(err);

throw err
}) 


            // console.log(arges)


            // events.push(event)

            // return event

        },

        createuser:userdoc => {

            return bcrypt.hash(userdoc.inputuser.password, 12)

            .then(doc => {
            
            
                const users = new mongoUsermodels({
             
                    email:userdoc.inputuser.email,
                    password: doc //userdoc.UsersInput.password,
                })
            
                return users.save()
            
            })
            
            .catch(err => {
            
            throw err
            
            })
                

        }

    },

    graphiql: true




}))



mongoose.connect('mongodb://localhost:27017/hapi').then(doc => {

console.log('connect');


})

.catch(docc => {

console.log('no connect');


})


app.listen(3000, () => {

    console.log('====================================');
    console.log('run server');
    console.log('====================================');

})