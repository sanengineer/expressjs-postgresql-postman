const User = require("../models").User;
const Product = require("../models").Product;
const jwt = require("jsonwebtoken");

function getToken(headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(" ");
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
}
module.exports = {
  SignUp: (req, res) => {
    console.log(req.body);
    if (!req.body.username || !req.body.password) {
      res.status(400).send({ msg: "Please pass username and password." });
    } else {
      User.create({
        username: req.body.username,
        password: req.body.password,
      })
        .then((user) => res.status(201).send(user))
        .catch((error) => {
          console.log(error);
          res.status(400).send(error);
        });
    }
  },

  SignIn: (req, res) => {
    User.findOne({
      where: {
        username: req.body.username,
      },
    })
      .then((user) => {
        if (!user) {
          return res.status(401).send({
            message: "Authentication failed. User not found.",
          });
        }
        user.comparePassword(req.body.password, (err, isMatch) => {
          if (isMatch && !err) {
            // const usernameReqBody = {
            //   username: req.body.username,
            // };

            var token = jwt.sign(
              // usernameReqBody,
              // { username: req.body.username },
              JSON.parse(JSON.stringify(user)),
              "nodeauthsecret",
              { expiresIn: 86400 * 30 }
            );
            // debugging token
            console.log(
              `\n\x1b[93mThis is token 👇 :\x1b[93m\n \x1b[91m${token}\x1b[91m\n\n`
            );
            jwt.verify(token, "nodeauthsecret", function (err, data) {
              console.log(err, data);
            });
            res.json({ success: true, token: "JWT " + token });
          } else {
            res.status(401).send({
              success: false,
              msg: "Authentication failed. Wrong password.",
            });
          }
        });
      })
      .catch((error) =>
        res.status(400).send({
          message: error.message || "error nih",
        })
      );
  },

  GetProduct: (req, res) => {
    var token = getToken(req.headers);

    console.log(`\nThis is var token: \n${token}\n\n`);

    console.log(`\nThis is req headers:\n${req.headers}\n\n`);

    if (token) {
      Product.findAll()
        .then((products) => res.status(200).send(products))
        .catch((error) => {
          res.status(400).send({
            message: error.message || "belum di authorzation",
          });
        });
    } else {
      return res
        .status(403)
        .send({ success: false, msg: "Please Login First" });
    }
  },

  PostProduct: (req, res) => {
    var token = getToken(req.headers);

    const postproduct = {
      prod_name: req.body.prod_name,
      prod_desc: req.body.prod_desc,
      prod_price: req.body.prod_price,
    };

    console.log(
      `\nthis is var token on PostProduct controller:\n \n${token}\n\n`
    );

    if (token) {
      Product.create(postproduct)
        .then((product) => res.status(201).send(product))
        .catch((error) => res.status(400).send(error));
    } else {
      return res
        .status(403)
        .send({ success: false, msg: "Please Login First" });
    }
  },
};
