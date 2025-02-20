// import user from "../mongoose/schemas/user";

// const forgotPassword = async (req: Request, res: Response) => {
//     try {
//         const { email } = req.body;

//         const User = await user.findOne({ email });

//         if (!user) {
//             res.status(400).json({
//                 message: "User not found with this email",
//             });
//             return;
//         }
//         const token = crypto.randomBytes(32).toString("hex");

//         user.resetPasswordToken = token;
//         user.resetPasswordTokenExpires = new Date(Date.now() + 3600000);
//         await user.save();
//         transporter.sendMail({
//             from: '"Authentication 👻" <mmmdovasbnm47@gmail.com>', // sender address
//             to: email, // list of receivers
//             subject: "Reset Your Password", // Subject line
//             html: `
//         <h1>Reset Your Password</h1>
//         <p>Click <a href="http://localhost:5173/reset-password/${token}">here</a> to reset your password</p>
//         <p>If you didn't request this, please ignore this email</p>
//         <p>Your token will expire in 1 hour</p>
//         <p>Your token is: ${token}</p>
//       `,
//         });
//         res.json({
//             message: "Email sent",
//         });
//     } catch (e) {
//         console.log(e);
//         res.status(500).json({
//             message: "Something went wrong",
//         });
//     }
// };

// const resetPassword = async (req: Request, res: Response) => {
//     console.log(req.body);

//     const { token, password } = req.body;

//     const user = await User.findOne({
//         resetPasswordToken: token,
//         resetPasswordTokenExpires: { $gt: Date.now() },
//     });

//     if (!user) {
//         res.status(400).json({ message: "Invalid or expired token" });
//         return;
//     }

//     user.password = hashPassword(password);
//     user.resetPasswordToken = "";
//     user.resetPasswordTokenExpires = new Date(0);
//     await user.save();

//     res.json({
//         message: "Password reset successful",
//     });
// };  