const Thought = require('../models/thoughtModel.js');

const thoughtController = {

    // Create a new thought
    createThought (req, res, next) {
      const { username, message } = req.body;
  
      const thought = new Thought({ username, message });
      thought.save().then((thought) => {
        res.locals.thought = thought;
        return next();
      }).catch((err) => {
        console.log('Error saving thought', err);
        res.status(400).json({
          err: err,
          log: 'Failed to save thought to database'
        });
      });
    },
  
    
    // Delete a thought by ID
    deleteThought (req, res, next) {
      const { id } = req.params;
      
      Thought.findByIdAndDelete(id)
      .then((deletedThought) => {
        if (!deletedThought) {
          return res.status(404).json({ message: 'Thought not found' });
        }
        res.locals.deletedThought = deletedThought;
        return next();
      }).catch((err) => {
        console.log('Error deleting thought', err);
        res.status(500).json({
          err: err,
          log: 'Failed to delete thought from database'
        });
      });
    },

    // Get all thoughts
   async getAllThoughts (req, res, next) {
      try {
        const thoughts = await Thought.find({});
  
        if (!thoughts) {
          return res.status(404).json({ log: 'Thoughts not found' });
        }
        res.locals.thoughts = thoughts;
        return next();
      } catch (err) {
        console.log('Error fetching thoughts', err);
        return res.status(500).json({
          log: 'error occured in the thoughtController.getAllThoughts',
          error: err,
        })
  
      };

  }

};
  
  module.exports = thoughtController;