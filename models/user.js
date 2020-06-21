const mongoose = require('../../../node/nodedb/test/node_modules/mongoose')

const Schemauser = mongoose.Schema

const Modelsuers = new Schemauser({

email:{

type:String,
required:true

},


password:{
    
    type:String,
    required:true
    
    },

    createEvents:[
        {


type:Schemauser.Types.ObjectID,
ref:'graphql'

        }
    ]


})


module.exports = mongoose.model('usersql' , Modelsuers)