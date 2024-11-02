const User = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secretKey = "thisisnotgood"; 

const generateToken = async (userId) => {
    return jwt.sign({ userId }, secretKey);
};

const auth = {
    signup:async(req,res) =>{
        try {
            const { email, username, password, age,region } = req.body;
            console.log('done');
            
            let existingUsermail = await User.findOne({ email });
            if (existingUsermail) {
                return res.status(400).json({ message: 'User already exists' });
            }
            let existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }
            
            const hashedPassword = await bcrypt.hash(password, 10);
            
            
                const newUser = new User({
                    email,
                    username,
                    password: hashedPassword,
                    age,
                    region
                });
                await newUser.save();
            
            
            
        
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server error' });
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email:email });
            console.log(user);
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            
            const isPasswordValid = await bcrypt.compare(password, user.password);
            console.log(isPasswordValid,password,user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            
            
            else{
            const token = await generateToken(user._id);
            console.log(token);
            res.status(200).json({ 
                token,
                user: {
                  username: user.username,
                  age: user.age,
                  region: user.region,
                  email: user.email,
                }
              });
            }
        } catch (error) {
            
            res.status(500).json({ message: 'Server error' });
        }
    },
    editProfile: async(req,res)=>{
        try{
            const authHeader = req.headers.authorization;
            const {username, email,age,region} = req.body;
            
            if (!authHeader) {
                return res.status(401).json({ message: 'User not logged in' });
            }
    
            const tokenArray = authHeader.split(' ');
            const token = tokenArray[1];
            if (!token) {
                return res.status(401).json({ message: 'User not logged in' });
            }
    
            const decoded = jwt.verify(token, secretKey);
            const userId = decoded.userId;

            
            
            if (!userId) {
                return res.status(401).json({ message: 'Invalid token' });
            }

            const user = await User.findById(userId);

            user.username = username;
            user.email = email;
            user.age = parseInt(age);
            user.region = region;

            await user.save();

            res.status(200).json({message:"profile changed succesfully"});



        }
        catch{
            res.status(500).json({message:"Internal Server error"});
        }
    }
};
module.exports = {auth, secretKey};