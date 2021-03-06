// login & register
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const keys = require("../../config/keys");
const passport = require("passport");

const User = require("../../models/User");

// 引入验证方法
const validateRegisterInput = require("../../validator/register");
const validateLoginInput = require("../../validator/login");

// $router POST api/users/register
// @desc 进行注册
// @access Public
router.post("/register",(req,res) => {
    // 验证输入格式
    const {errors,isValid} = validateRegisterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // console.log(req.body);
    User.findOne({email: req.body.email})
        .then((user) => {
            if (user) {
                return res.status(400).json({email: "邮箱已被注册!"});
            }else {
                const avatar = gravatar.url(req.body.email,{
                    s:"200",
                    r:"pg",
                    d:"mm"});

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                });

                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(newUser.password, salt, function(err, hash) {
                        // Store hash in your password DB.
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                });
            }
        })
});

// $router POST api/users/login
// @desc 进行登录，并获得token
// @access Public
router.post("/login",(req,res) => {
    // 验证输入格式
    const {errors,isValid} = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

   User.findOne({email})
       .then(user => {
           if (!user) {
               return res.status(404).json({email: "用户不存在"})
           }
           bcrypt.compare(password,user.password)
               .then(isMatch => {
                 if (isMatch) {
                     const rule = {id: user.id,name: user.name,avatar: user.avatar};
                     jwt.sign(rule,keys.secretOrKey,{expiresIn: 3600},(err,token) => {
                         if (err) throw err;
                         res.json({
                             success: true,
                             token: "Bearer " + token
                         })
                     })
                 }else {
                     return res.status(400).json({password: "密码错误!"})
                 }
               });
       })
});

// $router GET api/users/current
// @desc 访问接口并进行token验证
// @access Private
router.get("/current",passport.authenticate("jwt", {session: false}),(req,res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    })
});

module.exports = router;