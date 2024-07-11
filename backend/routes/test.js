
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const morgan = require("morgan");
const fs = require('fs');
const path = require('path');
const jwtSecret = "#$ThisIsAWebDevelopmentProjectCreatedUsingMernStack$#"



const Object = require('../models/Object');
const Company = require('../models/Company');
const Customer = require('../models/Customer');
const Cart = require('../models/Cart');
const Bought = require('../models/Bought');
const Admin = require('../models/Admin');
const SubCategory = require('../models/SubCategory');
const Category = require('../models/Category');
const DiscountCode = require('../models/DiscountCode');
const HomeObjects = require('../models/HomeObjects');
require('dotenv').config();



const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
router.use(morgan('combined', { stream: accessLogStream }));

// Route used for Customer Login
router.post('/login',
    morgan('combined'),
    body('username').isEmail(),
    body('password', "Password Too Short").isLength({ min: 7 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { username, password } = req.body;
        const cust = await Customer.findOne({ username: username });
        if (!cust) {
            return res.json({ success: false, message: "User Not Found" });
        }
        const pwdCompare = await bcrypt.compare(req.body.password, cust.password);
        if (!pwdCompare) {
            return res.json({ success: false, message: "Password Not Matched" })
        }
        const data = {
            user: {
                id: cust._id
            }
        }
        const authToken = jwt.sign(data, jwtSecret);
        return res.json({ success: true, authToken: authToken });
    })

// Route Used for Customer SignUp 
router.post('/signup',
    morgan('combined'),
    body('username').isEmail(),
    body('password', "Password Too Short").isLength({ min: 7 }),
    body('fullname').isLength({ min: 1 }),
    async (req, res) => {
        const errors = validationResult(req);
        const v = await Customer.findOne({ 'username': req.body.email });
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        if (v) {
            return res.json({ errors: "Email already used" });
        }
        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt);
        try {
            const cust = new Customer(req.body);
            cust.password = secPassword;
            await cust.save();
            res.json({ success: true })
        } catch (err) {
            console.log(err);
            console.log(req.body);
            res.json({ success: false });
        }
    }
)

