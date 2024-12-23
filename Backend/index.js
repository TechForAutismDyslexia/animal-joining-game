const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Segment = require("./models/Segment.js");
const app = express();

mongoose.connect('mongodb://localhost:27017/animaljoining')
.then(()=>{
    console.log("Mongodb connected");
})
.catch(()=>{
    console.log("Unable to connect to Mongodb");
})
app.use(express.json());
app.use(cors());

app.post("/segment", async (req, res) => {
    try {
      const { sessionId, levelId } = req.body;
      const existingSegment = await Segment.findOne({ sessionId, levelId });
      if (existingSegment) {
        return res.status(400).json({ message: "Segment already exists for this session and level" });
      }
  
      const segment = new Segment(req.body);
      await segment.save();
      res.status(201).json({ message: "Segment added!", segment });
    } catch (error) {
      res.status(400).json({ message: "Failed to add segment", error });
    }
  });
  

app.get("/segment/:sessionId/:levelId",async(req,res)=>{
    try {
        const {sessionId, levelId} = req.params;
        const segment = await Segment.findOne({levelId:levelId,sessionId:sessionId});
        if(!segment){
            res.status(404).json({message:"Not Found"});
        }
        res.status(200).json(segment);
    } catch (error) {
        res.status(400).json({message:"Bad request"});
    }
})

app.listen(4000,()=>{
    console.log("App listening at 4000 port");
})