const express=require("express");
const { User } = require("../schema/user");
const passport =require("passport")
const router = express.Router()

router.get('/', (req, res) => {
    res.send("Hello World! from user");
})
router.post('/register', async (req, res) => {
    try {
          let { name, email, password } = req.body;
          let newuser = new User({
            name,
            email,
          });
          let registereduser = await User.register(newuser, password);
          req.login(registereduser, (error, user) => {
            if (error) {
              return res.json({ message: error.message, name: error.name });
            }
          });
          res.send(req.user);
    } catch (error) {
        res.send({message:error.message,name:error.name})
    }
  
})
router.post('/login', passport.authenticate('local', { // Redirect on success
    failureRedirect: '/login',      // Redirect on failure
}),function (req,res) {
    res.json(req.user)
}
);
module.exports=router