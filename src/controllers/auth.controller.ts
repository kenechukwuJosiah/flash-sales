import { Request, Response } from 'express';
import { User } from '../models';
import jwt from 'jsonwebtoken';


// Generate a JWT token with the user's id and a secret key
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: '30d',
  });
};

/**
 * Registers a new user
 * @param req Request object
 * @param res Response object
 * @returns A JSON response with the user's id, name, email, and a JWT token
 */
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;


    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Unable to create user' });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};


/**
 * Logs in an existing user
 * @param req Request object
 * @param res Response object
 * @returns A JSON response with the user's id, name, email, and a JWT token
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}