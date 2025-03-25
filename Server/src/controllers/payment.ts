import { Request, Response } from "express";
import PaymentMethod from "../mongoose/schemas/payment";
import User from "../mongoose/schemas/user";

const addPaymentMethod = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cardNumber, cvv, expiryDate, isDefault } = req.body;
    const userId = req.user?._id;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (isDefault) {
      await PaymentMethod.updateMany({ user: userId }, { isDefault: false });
    }

    const newPayment = new PaymentMethod({ user: userId, cardNumber, cvv, expiryDate, isDefault });
    await newPayment.save();

    res.json({ message: "Payment method added successfully", payment: newPayment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getPaymentMethods = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;
    const payments = await PaymentMethod.find({ user: userId }).select("-cvv -cardNumber");
    res.json({ message: "Payment methods retrieved", payments });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const removePaymentMethod = async (req: Request, res: Response): Promise<void> => {
  try {
    const { paymentId } = req.params;
    const userId = req.user?._id;

    const payment = await PaymentMethod.findOneAndDelete({ _id: paymentId, user: userId });
    if (!payment) {
      res.status(404).json({ message: "Payment method not found" });
      return;
    }

    res.json({ message: "Payment method removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default {
  addPaymentMethod,
  getPaymentMethods,
  removePaymentMethod,
};
