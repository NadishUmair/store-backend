const bcrypt = require("bcryptjs");
const AdminModel = require("../model/adminModel");




exports.createAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingAdmin = await AdminModel.findOne({ email: email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new AdminModel({
      email: email,
      password: hashedPassword,
    });

    await newAdmin.save();

    res.status(201).json({
      message: "Admin created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await AdminModel.findOne({ email: email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const matchPassword = await bcrypt.compare(password, admin.password);
    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = generateToken(admin._id);

    res.status(200).json({
      message: "Admin logged in successfully",
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.VerifyAdmin=async(req,res)=>{
  try {
         const {email}=req.body;
         const findAdmin=await AdminModel.findOne({email});
         if(!findAdmin){
          return res.status(404).json({message:"not authorized"})
         }
         const otp =await genrateOtp();
         findAdmin.resetPasseordOtp=otp;
         
  } catch (error) {
    
  }
}
