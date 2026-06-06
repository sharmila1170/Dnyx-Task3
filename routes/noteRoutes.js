import express from "express";
import Note from "../models/Note.js";

const router = express.Router();

// Create note
router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required"
      });
    }

    const note = new Note({
      title,
      description
    });

    const savedNote = await note.save();

    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json({
      message: "Error creating note",
      error: error.message
    });
  }
});

// View all notes
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching notes",
      error: error.message
    });
  }
});

// View single note
router.get("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found"
      });
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching note",
      error: error.message
    });
  }
});

// Update note
router.put("/:id", async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required"
      });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({
        message: "Note not found"
      });
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({
      message: "Error updating note",
      error: error.message
    });
  }
});

// Delete note
router.delete("/:id", async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote) {
      return res.status(404).json({
        message: "Note not found"
      });
    }

    res.status(200).json({
      message: "Note deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting note",
      error: error.message
    });
  }
});

export default router;