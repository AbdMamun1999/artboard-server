const mongoose = require("mongoose");

// Schema design
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: [true, "Provide a name"],
    },
    username: {
      type: String,
      trim: true,
      unique: [true, "Provide an unique name"],
      require: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: [true, "Already have an account by this email"],
      validate: {
        validator: (value) => {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
        },
        message: (props) => `${props.value} is not a valid email`,
      },
      require: [true, "Provide an email"],
    },
    password: {
      type: String,
      trim: true,
      require: [true, "Provide a password"],
    },
  },
  {
    tiemstamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
