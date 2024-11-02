
const mongoose = require('mongoose');


const testSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true
  },
  name: {
    type: String, 
  },
  answers: [{
    type: String,
  }],
  test_date: {
    type: Date,
    default: Date.now
},
});


const test = mongoose.model('test', testSchema);
module.exports = test;
