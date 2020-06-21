const mongoose = require('../../../node/nodedb/test/node_modules/mongoose')

const Schema = mongoose.Schema

const Schemamodels = new Schema({

    // _id: ID!
    title: {type : String , required:true },
    description:{type : String , required:true},
    price:{type : Number , required:true },
    date:{type : Date , required:true },
    creator:{

        type:Schema.Types.ObjectID,
        ref:'users'
    }
    



})


module.exports = mongoose.model('graphql', Schemamodels)