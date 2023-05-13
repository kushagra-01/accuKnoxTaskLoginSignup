
const nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken");
const User = require("../models/Users.model");

//creates token and expires in 1 hr
const newToken = (user) => {
  return jwt.sign({ user }, "Nrupul",{ expiresIn: '1h' });
};




// Its a free smtp ethereal email which provides free id on One click
// https://ethereal.email/


const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'graham.hammes@ethereal.email',
      pass: '77bvBVgx5zmKW2EAX9'
  }
});


// for Registration 
const register = async (req, res, next) => {
  try {
    const { email } = req.body;

    //  Checks Email already registered or not
    let user = await User.findOne({ email: email });
    if (user) return res.send("user already exist");

    const token = newToken(user);

    // if email is not registered it will create new registration
    user = await User.create({
      email: req.body.email,
      password: req.body.password,
      confirmationCode: token
    });
   


    // for totp registration it will send mail

    transporter.sendMail({
      from:'zachary.fisher@ethereal.email',
      to: email,
      subject: 'Email Verification',
      html: `<h1>Email Confirmation</h1>
      <p>Please confirm your email by clicking on the following link</p>
      <a href=http://localhost:5000/confirm/${token}> Click here</a>
      </div>`,
    });


    return res.status(201).send('Email sent successfully Plase Verify');


  } catch (err) {
    return res.status(500).send(err.message);
  }
};


// verification
const verify = async (req, res) => {
  User.findOne({
    confirmationCode: req.params.token,
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      user.status = "Active";
      user.save((err) => {
        if (err) {
          return res.status(500).send({ message: err });

        }
        return res.send('registered');
      });
    })
    .catch((e) => console.log("error", e));
};


// login
const login = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).send("User not found!");
    if (user.status == 'Pending') return res.status(404).send("Email is not registered");

    const match = user.check(req.body.password);
    if (!match) return res.send("wrong password!");
    const token = newToken(user);
    return res.send({ token });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
module.exports = { register, login, verify };
