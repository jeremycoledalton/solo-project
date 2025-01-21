const Thought = require('../models/thoughtModel.js');

const thoughtController = {


    async createThought (req, res, next) {
      try {
        const { username, message } = req.body;
        
        if ( !username || !message ) {
          return res.status(400).json({ log: 'Username and message are required' })
        }

        const thought = await Thought.create ({ username, message });
        console.log(`User ${thought.username} dropped the thought: ${thought.message}`)
        res.locals.thought = thought;
        return next();

      } catch (err) {
        console.log('Error saving thought', err);
        res.status(400).json({
          err: err,
          log: 'Failed to save thought to database'
        });
      }
    },

  
  
    async deleteThought (req, res, next) {
      try {
        const { id } = req.params;

        const result = await Thought.deleteOne({ id });
        if (result.deletedCount === 0) {
          console.log('No thought found');
          return res.status(404).json({ log: 'Thought not found. Failed to delete.' });
      }
        console.log(`Thought with ID: ${id} deleted`);
        return next();
      } catch (err) {
        console.log('Error deleting thought', err);
        res.status(500).json({
          err: err,
          log: 'Failed to delete thought from database'
        });

      }

    },





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