import { UserModel } from '../models/user.model';
import { hash } from 'bcryptjs';
import generateTokens from '../utils/generate-tokens';

export async function register(req, res) {
  const { name, email, password, ...otherInfo } = req.body; // Destructure user data

  // Validate user data

  const hashedPassword = await hash(password, 10); // Hash password securely

  const newUser = new UserModel({
    name,
    email,
    password: hashedPassword,
    ...otherInfo, // Include additional user information if needed
  });

  try {
    const savedUser = await newUser.save();
    const { accessToken, refreshToken } = generateTokens(savedUser);

    res.status(201).json({ message: 'User registered successfully!', accessToken, refreshToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering user!' });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password!' });
    }

    const isMatch = await bcrypt.compare(password, user.password); // Use bcrypt to compare password hashes
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password!' });
    }

    const { accessToken, refreshToken } = generateTokens(user);

    res.json({ message: 'Login successful!', accessToken, refreshToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in!' });
  }
}
