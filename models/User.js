const mongoose = require("mongoose");
const schema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        require: [true, "User email is required."]
    },
    phone: {
        type: String,
        validate: {
          validator: function(v) {
            return /\d{3}-\d{3}-\d{4}/.test(v);
          },
          message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, "User phone number required"]
      },
    token: {
      type: String,
    }
  });

module.exports = User = mongoose.model("User", schema);