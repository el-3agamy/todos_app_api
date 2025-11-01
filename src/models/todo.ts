import mongoose, { Schema, model, InferSchemaType , Types } from "mongoose";

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

export type ITodo = InferSchemaType<typeof todoSchema>;

const todoModel = model<ITodo>("TodosTS", todoSchema , "TodosTS");

export default todoModel;
