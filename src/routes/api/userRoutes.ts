import { Router } from 'express';
import {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} from '../../controllers/userController.js';

const router = Router();

// Define the routes for GET and POST all users
router.route('/').get(getUsers).post(createUser);

// Define the routes for GET, PUT, and DELETE a single user by ID
router.route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

// Define the routes for adding and deleting a friend for a specific user
router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

export default router;
