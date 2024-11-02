const Test = require('../models/test');
const {getUsername} = require('../controllers/getUsername');

const test = {
    save: async(req,res) =>{
        try{
        const answers = req.body.answers;
        const name = req.body.name;
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'User not logged in' });
        }

        const tokenArray = authHeader.split(' ');
        const token = tokenArray[1];
        if (!token) {
            return res.status(401).json({ message: 'User not logged in' });
        }

        const username = await getUsername(token);
        if (!username) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        

        const testInstance = new Test({
            username,
            answers,
            name
        });
        await testInstance.save();

        res.status(201).json({message :'test answers recorded Succesfully'});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message :'Server Error'});
    }
    }
};


module.exports = test;