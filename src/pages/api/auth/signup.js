const validator = require("validator");
const { connectDb } = require("../../../lib/db")
const { encryptPassword } = require("../../../lib/bcrypt")
const mongoose = require("mongoose")
const User = require("../../../models/user")

const handler = async(req, res) => {
  if (req.method === "POST") {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    if (
      validator.isEmpty(name) ||
      !validator.isEmail(email) ||
      !validator.isStrongPassword(password) ||
      !validator.equals(password, confirmPassword)
    ) {
        res.status(401).json({ message: "Incorrect inputs! Please check and provide valid inputs" })
        return;
      }
      
      try {
          await connectDb()
      } catch (error) {
          res.status(500).json({ message: "Failed to connect to database!" })
          return
    }
    
      const existingUser = await User.findOne({ email: email })
    
    if (existingUser) {
        await mongoose.disconnect()
        return res.status(422).json({message: "User already exists!"})
      }

      const hashedPassword = await encryptPassword(password)

      const user = new User({
          name: name,
          email: email,
          password: hashedPassword
      })

      const savedUser = await user.save()
      res.status(201).json({message: "Signup successful!", user: savedUser.name})
      await mongoose.disconnect()
      return;

  }
};

export default handler;
