const mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const schema = mongoose.Schema({
  title: String,
  content: String
});

module.exports = mongoose.model("Post", schema);
