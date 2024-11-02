const Journal = require('../models/Journal');
const {getUsername} = require('../controllers/getUsername');

const journal = {
    save: async(req,res) =>{
        try{
        const dream = req.body;
        const mood = dream.mood;
        const theme =  dream.theme;
        const time = dream.time;
        const duration =  dream.duration;
        
        const taskDuring = dream.workDuringDream;
        const description = dream.dreamDescription;
        
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

        const journalInstance = new Journal({
            username,
            mood,
            theme,
            time,
            duration,
            taskDuring,
            description
        });
        await journalInstance.save();

        res.status(201).json({message :'Dream Logged Succesfully'});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message :'Server Error'});
    }
    },
    retrieve: async(req,res) =>{
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

        const journalEntries = await Journal.find({username});
        console.log(journalEntries);
        res.status(200).json({journalEntries});
    },
    analytics: async(req,res) =>{
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

        const journalEntries = await Journal.find({username});
      
        res.status(200).json({journalEntries});
        
    },
    getTodayDreamCount: async(req,res) =>{
        console.log("6");
       try{
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
        const today = new Date();

    const startOfToday = new Date(today.setHours(0, 0, 0, 0));


    const endOfToday = new Date(today.setHours(23, 59, 59, 999));

        const dreams = await Journal.find({
            date: {
                $gte: startOfToday,
                $lte: endOfToday,
              },
        });
        const count = dreams.length;
        console.log(startOfToday,endOfToday)
        console.log('Start of today:', startOfToday.toLocaleString());
        console.log('End of today:', endOfToday.toLocaleString());

        res.status(200).json({count})
       }
       catch(error){
        console.log(error);
        res.status(500).json({message :"Internal Server Error"});
       }
    }
};


module.exports = journal;