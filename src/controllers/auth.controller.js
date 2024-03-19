import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";

import User from "../models/user.model.js";

// Define the Register function which handles the registration logic
const Register = async (req, res) => {
    // Extract the username, email, and password from the request body
    const { username, email, password } = req.body;

    try {
        // Hash the password using bcrypt with a salt factor of 10
        const passwordHash = await bcrypt.hash(password, 10);

        // Create a new User instance with the provided username, email, and hashed password
        const newUser = new User({ username, email, password: passwordHash });

        // Save the new user to the database
        const userSaved = await newUser.save();

        // Create an access token using the user's ID
        const token = await createAccessToken({ id: userSaved._id });

        // Set the access token as a cookie in the response
        res.cookie("token", token);

        // Send a JSON response with the user's ID, username, email, creation date, and update date
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        });
    } catch (error) {
        // If an error occurs, log the error and send a 500 status code with an error message
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const Login = async (req, res) => {
    // Extract the email and password from the request body
    const { email, password } = req.body;

    try {
        // Find a user with the provided email
        const userFound = await User.findOne({ email });

        // If no user is found, send a 400 status code with an error message
        if (!userFound)
            return res.status(400).json({ message: "User does not exist" });

        // Compare the provided password with the user's hashed password
        const isMatch = await bcrypt.compare(password, userFound.password);

        // If the passwords do not match, send a 400 status code with an error message
        if (!isMatch)
            return res.status(400).json({ message: "Invalid credentials" });

        // Create an access token using the user's ID
        const token = await createAccessToken({ id: userFound._id });

        // Set the access token as a cookie in the response
        res.cookie("token", token);

        // Send a JSON response with the user's ID, username, email, creation date, and update date
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        });
    } catch (error) {
        // If an error occurs, log the error and send a 500 status code with an error message
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const Logout = (req, res) => {
    // Clear the access token cookie
    res.cookie("token", "", { expires: new Date(0) });

    // Send a JSON response with a success message
    return res.status(200).json({ message: "Logout success" });
};

const Profile = async (req, res) => {
    // console.log(req.user);
    const userFound = await User.findById(req.user.id);
    
    if (!userFound) return res.status(404).json({ message: "User not found" });

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    
    });
};

export { Register, Login, Logout, Profile };
