import Auth from "../models/AuthModel.js";
import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

export const register = async (req, res) => {
  try {
    // Retrieve the user data from the request body
    const {
      role_id,
      username,
      email =  username ,
      password,
      confPassword,
    } = req.body;
    const uuid = uuidv4();

    //validate password
    if (password !== confPassword)
      return res
        .status(400)
        .json({ msg: "Password dan Confirm Password tidak cocok" });

    const authUser = await Auth.findOne({ where: { username } });

    if(authUser){
      return res.status(401).json({ message: "Account already exists" });
    }
   

    //insert user peserta
    const user = await User.create({ 
        id: uuid,
        first_name:null, 
        last_name:null,
         npm :null, 
         kelas:null, 
         jurusan:null, 
         email, 
         line_account:null,
        wa_account:null, 
        phone_number:null, 
        img:null, 
        role_id });

    // Hash the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new authentication entry
    const auth = await Auth.create({
      id:  uuidv4(),
      username,
      password: hashedPassword,
      user_id: uuid,
      role_id,
    });

    // Send a response with the newly created authentication entry
    res.status(201).json({ auth });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const signin = async (req, res) => {
  const { username, password, } = req.body;

  try {
    // Find the user by username
    const user = await Auth.findOne( { include : User ,  where: { username } });

    // If the user doesn't exist, return an error response
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Compare the provided password with the stored password hash
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If the password is invalid, return an error response
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    
    // Generate a JWT token
    const token = jwt.sign({ id: user.id , role_id : user.role_id , img : user.User.img },  process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "5d",
    });

    // Return the token in the response
    res.cookie("accessToken", token, {
      httpOnly: true,
      maxAge: 5 * 24 * 60 * 60 * 1000, //5days 
    });
    res.json({ user_id : user.user_id , role_id : user.role_id , token ,  img : user.User.img });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {   
    // const { id } = req.params;
    // const auth = await Auth.findByPk(id);
    // if (auth) {
    //   auth.updated_at = new Date();   
    //   return res.json(role);
    // }
    res.clearCookie("accessToken");
    return res.json({  msg: "logout" });
  } catch (err) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
