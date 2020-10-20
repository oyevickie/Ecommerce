const router = require('express').Router();
const About = require('../models/aboutt');

router.route('/')
.get((req, res, next) => {
    About.find({}, (err, data) => {
        if (err) {
          res.send(err);
        } else {
          res.send(data);
        }
      })
})
.put((req,res, next) => {
    try {
        let about = About.create({
            title: req.body.title,
            description: req.body.description,
            descriptionn: req.body.descriptionn
        }) ;
        res.json({
            success: true,
            message: "Successfull"
        })      
        }
        catch(e) {
            console.log("error in post of About", e.message, e.toString());
            res.json({ message: "error", error: e.message }) 
        }
})

    module.exports = router;
