import { Request, Response } from 'express';
import { User } from '../models';
import jwt from 'jsonwebtoken';
import { loginValidator, userValidator } from '../validators';


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
    const { error } = userValidator.validate(req.body);

    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const { name, email, password } = req.body;


    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      }
      });
    } else {
      res.status(400).json({ success: false, message: 'Unable to create user' });
    }
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
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

    const { error } = loginValidator.validate(req.body);

    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }


    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      }
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
}