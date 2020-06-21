const express = require('express')
const bodyparser = require('body-parser')
// const qraphqlHttp = require('express-graphql')
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require('graphql')
const app = express()



app.use(bodyparser.json())


const list = ['a' , 'b' , 'c' , 'new']
const listnew = []

app.use('/test',graphqlHTTP({

    schema:buildSchema(`
    
type Event {

 name:String!
price:Float!

}

    input EventInput{

name:String!
price:Float!

    }

    type RootQuery {

        listbook:[Event!]!,
        book:[String!]!
        
            }


    type RootMutation{

        inputCreate(inputmodels:EventInput):Event

    }
    
    schema{

query:RootQuery
mutation:RootMutation
    }
    
    `),

    rootValue:{

        listbook:()=> {

return listnew
},



inputCreate: (arges)=>{


    const inpu = {

        name:arges.inputmodels.name,
        price:+arges.inputmodels.price


    }

    listnew.push(inpu)
    console.log(inpu);
    return inpu
    


}



// inputt: (bodys) => {

// const inp = {

//     name:bodys.inputmodela.name,
//     price:+bodys.inputmodela.price

// }

// console.log(bodys)
// listnew.push(inp)
// return inp

// // return inp

// } 


    },

    graphiql:true


}))

app.listen(3000 , ()=>{


console.log('run');


})