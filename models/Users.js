const mongoose = require("mongoose");

// Schema design
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: true,
    },
    username: {
      type: String,
      trim: true,
      unique: true,
      require: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      validate: {
        validator: (value) => {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email`,
      },
      require: true,
    },
    password: {
      type: String,
      trim: true,
      require: true,
    },
  },
  {
    tiemstamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
