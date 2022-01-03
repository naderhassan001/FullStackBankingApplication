var express = require('express');
var app = express();
var cors = require('cors');
var dal = require('./dal.js');
const path = require('path');

const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(
  '118740429808-b9r40h91la2cdm4sm74ml1uqgkk3tkfa.apps.googleusercontent.com'
);

// used to serve static files from public directory
// app.use(express.static('public'));
app.use(cors());

const jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var saltRouds = 10;

const authenticateMiddleware = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  //Check if bearer is undefined

  if (typeof bearerHeader !== 'undefined') {
    //Split at the space
    const bearer = bearerHeader.split(' ');
    //Get token from array
    const bearerToken = bearer[1];
    //Set the token
    req.token = bearerToken;
    //Next middlware
    jwt.verify(req.token, 'abcdefghijklmnopqrstuvwxyz', (err, authData) => {
      if (err) {
        console.log(err);
        res.sendStatus(403);
      } else {
        next();
      }
    });
  } else {
    res.sendStatus(403);
  }
};

const getTokenIdMiddleware = async (req, res, next) => {
  if (req.headers.authorization != null) {
    const usertoken = req.headers.authorization;
    console.log(usertoken);
    const token = usertoken.split(' ');
    console.log(token);
    console.log(token[1]);
    const decoded = jwt.verify(token[1], 'abcdefghijklmnopqrstuvwxyz');
    console.log('CHECK');
    console.log(decoded);
    console.log(decoded.user.email);

    if (decoded.user.email != null) {
      req.email = decoded.user.email;
      console.log('HIIIII', req.email);
      next();
    } else {
      res.json('user not found');
    }
  } else {
    res.json('No header ');
  }
};

app.get('/account/getLogged', getTokenIdMiddleware, async (req, res) => {
  console.log(req.email);
  const user = await dal.find(req.email);
  let UserObj = Object.keys(user).length;
  console.log(UserObj);
  if (UserObj > 0) {
    console.log(user);
    res.send({ user, success: true });
  } else {
    res.send({ success: false, message: 'user not found' });
  }
});

// create user account
app.get('/account/create/:name/:email/:password', async (req, res) => {
  // check if account exists
  dal.find(req.params.email).then(async (users) => {
    // if user exists, return error message
    if (users.length > 0) {
      console.log('User already exists');
      res.send('User already exists');
    } else {
      // else create user
      let hash = await bcrypt.hash(req.params.password, saltRouds);
      console.log('else');
      hashedpassword = hash;
      dal
        .create(req.params.name, req.params.email, hashedpassword)
        .then((user) => {
          console.log(user);
          res.send(user);
        });
    }
  });
});

// google login
app.get('/account/googlelogin/:idToken', async function (req, res) {
  const { idToken } = req.params;
  try {
    const { payload: { email_verified, email, name } = {} } =
      await client.verifyIdToken({
        idToken,
        audience:
          '118740429808-b9r40h91la2cdm4sm74ml1uqgkk3tkfa.apps.googleusercontent.com',
      });
    let user;
    if (email_verified) {
      user = await dal.findOne(email);
      console.log({ user });
      let token = jwt.sign({ user }, 'abcdefghijklmnopqrstuvwxyz');
      if (user) {
        return res.status(200).json({
          token,
          user,
        });
      }
      console.log('2');

      let hash = await bcrypt.hash('password-google', saltRouds);
      user = await dal.create(name, email, hash);
      console.log('1');

      return res.json({ token, user });
    }

    return res.status(500).json({ message: 'Email not verified' });
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: 'Error while login with google' });
  }
});

// login user
app.get('/account/login/:email/:password', function (req, res) {
  dal.find(req.params.email).then((user) => {
    // if user exists, check password
    if (user.length > 0) {
      console.log(req.params.password);
      console.log(user[0].password);
      if (bcrypt.compareSync(req.params.password, user[0].password)) {
        let token = jwt.sign({ user: user[0] }, 'abcdefghijklmnopqrstuvwxyz');
        res.status(200).json({
          token,
          user: user[0],
        });
      } else {
        res.send('Login Failed: Wrong Password');
      }
    } else {
      res.send('Login Failed: User Not Found');
    }
  });
});

// find user account
app.get('/account/find/:email', async (req, res) => {
  console.log(req.params.email);
  const user = await dal.find(req.params.email);
  let UserObj = Object.keys(user).length;
  console.log(UserObj);
  if (UserObj > 0) {
    console.log(user);
    res.send(user);
  } else {
    res.send('Requested User not Found');
  }
});

// find one user by email - alternative to find
app.get('/account/findOne/:email', async (req, res) => {
  console.log(req.params.email);
  const user = await dal.find(req.params.email);
  let UserObj = Object.keys(user).length;
  console.log(UserObj);
  console.log(user);
  if (UserObj > 0) {
    console.log(user);
    res.json(user[0].balance);
  } else {
    console.log('Hi');
    res.send('Requested User not Found');
  }
});

// update - deposit/withdraw amount
app.get('/account/update/:email/:amount', async (req, res) => {
  var amount = Number(req.params.amount);
  const getUser = await dal.find(req.params.email);
  console.log(getUser.length);
  console.log(getUser);
  if (getUser.length <= 0) {
    console.log(getUser);
    res.send('Requested User not Found');
    return;
  } else {
    console.log('FIRST ELSE');
    console.log(getUser);
    balance = getUser[0].balance;
    console.log('Balance', balance);
    if (amount === 0) {
      console.log('IF');
      res.send('Invalid Transaction');
      return;
    } else if (balance + amount < 0) {
      console.log('Else If');
      res.send('Invalid Transaction');
      return;
    } else {
      console.log('Else');
      dal.update(req.params.email, amount).then((response) => {
        console.log(response);
        res.json('Transaction Successful');
      });
    }
  }
});

// all accounts
app.get('/account/all', function (req, res) {
  dal.all().then((docs) => {
    console.log(docs);
    res.send(docs);
  });
});

if (process.env.NODE_ENV === 'production') {
  // Set static folder

  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 4000;
app.listen(PORT);
console.log('Running on port: ' + PORT);
