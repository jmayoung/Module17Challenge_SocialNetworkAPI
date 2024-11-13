import User from "../models/user.js";
export const getUsers = async (_req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
export const createUser = async (req, res) => {
    try {
        const createdUser = await User.create(req.body);
        res.json(createdUser);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
export const getSingleUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.userId });
        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
        }
        if (user.thoughts.length > 0) {
            await user.populate('thoughts');
        }
        if (user.friends.length > 0) {
            await user.populate('friends');
        }
        return res.json(user);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
export const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate({ _id: req.params.userId }, req.body, { new: true });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete({ _id: req.params.userId }, { new: true });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json({ message: 'User successfully deleted' });
    }
    catch (err) {
        res.status(500).json(err);
    }
};
export const addFriend = async (req, res) => {
    try {
        const friend = await User.findOne({ _id: req.params.friendId });
        if (!friend) {
            res.status(404).json({ message: 'Friend not found' });
            return;
        }
        const user = await User.findByIdAndUpdate({ _id: req.params.userId }, { $push: { friends: req.params.friendId } }, { new: true });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
export const deleteFriend = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
