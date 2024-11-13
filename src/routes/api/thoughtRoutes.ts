import { Router } from 'express';
import {
    getAllThoughts,
    getThoughtsById,
    createThought,
    deleteThought,
    updateThoughtsById,
    createReaction,
    deleteReaction,
} from '../../controllers/thoughtController.js';

const router = Router();

// Define the routes for GET and POST all Thoughts
router.route('/').get(getAllThoughts).post(createThought);

// Define the routes for GET, PUT, and DELETE Thoughts
router.route('/:thoughtId').get(getThoughtsById).put(updateThoughtsById).delete(deleteThought);

// Define the route for POST reaction to a Thought
router.route('/:thoughtId/reactions').post(createReaction);

// Define the route for DELETE reaction to a Thought
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

export default router;
