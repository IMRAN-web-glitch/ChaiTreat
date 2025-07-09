import mongoose, { model, Schema } from "mongoose";
const paymentschema = new Schema({
    name: { type: String, required: true },
    to_user: { type: String, required: true },
    oid: { type: String },
    message: { type: String },
    amount: { type: Number, required: true },
    isdone: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});


export default mongoose.models.Payment || model("Payment", paymentschema);