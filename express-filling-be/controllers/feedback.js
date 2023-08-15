import Feedback from "../models/FeedbackModel.js";
import User from "../models/UserModel.js";
import Workshop from "../models/WorkshopModel.js";

// Get all feedback
export const getAllFeedback = async (req, res) => {
  try {
    const feedbackList = await Feedback.findAll( {
      include: [User , Workshop],
      
    });
    res.status(200).json(feedbackList);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch feedback" });
  }
};


export const getAllByWorkshop = async (req, res) => {
  try {
    const {workshop_id} = req.params

    // return res.json({"a":workshop_id})
    const feedbackList = await Feedback.findAll( {
      include: [User , Workshop],
      where: {workshop_id : workshop_id}      
    });
    res.status(200).json(feedbackList);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch feedback"  , error});
  }
};

export const getAllByWorkshopByUser = async (req, res) => {
  try {
    const {user_id ,workshop_id} = req.params

    // return res.json({"a":workshop_id})
    const feedbackList = await Feedback.findAll( {
      include: [User , Workshop],
      where: {  user_id: user_id,  workshop_id : workshop_id}      
    });
    res.status(200).json(feedbackList);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch feedback"  , error});
  }
};

// Get a single feedback by ID
export const getFeedbackById = async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await Feedback.findByPk(id);
    if (feedback) {
      res.status(200).json(feedback);
    } else {
      res.status(404).json({ message: "Feedback not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch feedback" });
  }
};

// Create a new feedback
export const createFeedback = async (req, res) => {
  try {
    let filename = ''
    const { user_id, workshop_id, feedback, image } = req.body;
    if(!req.file) {
      filename = null
    }else {
      filename = req.file.filename
    }

    const newFeedback = await Feedback.create({
      user_id,
      workshop_id,
      feedback,
      image : filename,
    });
    res.status(201).json(newFeedback);
  } catch (error) {
    res.status(500).json({ error: "Failed to create feedback" });
  }
};

// Update a feedback by ID
export const updateFeedbackById = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, workshop_id, feedback, image } = req.body;
    const feedbackToUpdate = await Feedback.findByPk(id);
    if (feedbackToUpdate) {
      feedbackToUpdate.user_id = user_id;
      feedbackToUpdate.workshop_id = workshop_id;
      feedbackToUpdate.feedback = feedback;
      feedbackToUpdate.image = image;
      await feedbackToUpdate.save();
      res.status(200).json(feedbackToUpdate);
    } else {
      res.status(404).json({ message: "Feedback not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update feedback" });
  }
};

// Delete a feedback by ID
export const deleteFeedbackById = async (req, res) => {
  try {
    const { id } = req.params;
    const feedbackToDelete = await Feedback.findByPk(id);
    if (feedbackToDelete) {
      await feedbackToDelete.destroy();
      res.status(200).json({ message: "Feedback deleted" });
    } else {
      resjavascript.status(404).json({ message: "Feedback not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete feedback" });
  }
};
