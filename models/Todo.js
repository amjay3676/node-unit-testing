const mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


const schema = mongoose.Schema({
  title: String,
  description: String
});

module.exports = mongoose.model("Todo", schema);
