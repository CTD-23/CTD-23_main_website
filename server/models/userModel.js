const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "Please Enter first name"],
    maxLength: [30, "First Name Cannot exceed 30 characters"],
    minLength: [1, "First Name should have more than 1 characters"],
  },

  last_name: {
    type: String,
    required: [true, "Please Enter first name"],
    maxLength: [30, "Last Name Cannot exceed 30 characters"],
    minLength: [1, "Last Name should have more than 1 characters"],
  },

  email: {
    type: String,
    required: [true, "Email Required"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },

  Username: {
    type: String,
    required: [true, "Username Required"],
    maxLength: [30, "UserName Cannot exceed 10 characters"],
    minLength: [1, "UserName should have atleast 8 characters"],
  },

  password: {
    type: String,
    required: [true, "Password Required"],
    validate: {
      validator: function (password) {
        const passwordRegex =
          /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return passwordRegex.test(password);
      },
      message:
        "Password must have at least 8 characters, one number, one special character, and both upper and lower characters.",
      select: false,
    },
  },

  reg_id: {
    type: String,
    required: [true, "Registration id required"],
    minLength: [11, "reg id must have 11 char"],
    maxLength: [11, "reg id must have 11 char only"],
    validate: {
      validator: function(v) {
        return /^[ECI]2K[0-9]+$/.test(v);
      },
      message: props => `${props.value} Enter Valid Registeration I.D` 
    },
  },

  isJunior: {
    type: Boolean,
    required: [true, "isJunior required"],
    default: false,
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

//before saving the password hash
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

//JWT token
//so server  will understand that user i registered and can access routes
userSchema.methods.getJWTtoken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//Compare Password
userSchema.methods.compare = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//generating password reset token
userSchema.methods.getResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  //hashing and adding to user schema

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

module.exports = mongoose.model("User", userSchema);

// "first_name": "gaygian",
//         "last_name": "gayer",
//         "email": "giyan@gmail.com",
//         "Username": "Username",
//         "password": "$2a$10$gxZQDy3KM6rMRSxhwJUNeuJktAaAyEKA2/IeNHvXSQdZlyj4m6EA6",
//         "reg_id": "ASDFGHJKLAS",
//         "isJunior": true,
//         "_id": "64b043c0f2213bd0a2c912da",
