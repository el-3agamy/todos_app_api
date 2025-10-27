import mongoose, { Schema, model, InferSchemaType , Types } from "mongoose";

// 1️⃣ عرّف الـ Schema عادي (من غير Interface ولا extends Document)
const todoSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      // maxlength: 12,
      minlength: 3,
    },
    date: {
      type: Date,
      default: Date.now,
      // required : false
    },
    status: {
      type: String,
      enum: ["Done", "In progress"],
      default: "In progress",
      // required : false
    },
    userID: {
      type : Types.ObjectId ,
      ref : "UsersTs"
    }
  },
  { timestamps: true }
);

// 2️⃣ خلّي TypeScript يستنتج النوع تلقائيًا من الـ Schema
export type ITodo = InferSchemaType<typeof todoSchema>;

// 3️⃣ اعمل الـ Model مضبوط
const todoModel = model<ITodo>("TodosTS", todoSchema , "TodosTS");

export default todoModel;
