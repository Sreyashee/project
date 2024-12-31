const mongoose = require('mongoose');
const config = require("config");
mongoose.connect(`${config.get("MONGODB_URI")}`/myproj)
.then(function(){
  console.log("connected");
})
.catch(function(err){
  onslotchange.lg(err);
});
module.exports = mongoose.connection;