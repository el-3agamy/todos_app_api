    import { InferSchemaType, Schema, model } from "mongoose";
    const userSchema = new Schema({
        firstName: {
            type: String,
            minlength: 3,
            maxlength: 15,
            required: true,
        },
        lastName: {
            type: String,
            minlength: 3,
            maxlength: 15,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            validate: {
                validator: (mail: string) => {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)
                }
            },
            required: false
        },
        password :{
        type: String ,
        required: true ,

        }
        ,
        phone: {
            type: Number, // chatgpt is told me that phone numbers should be string not number
            unique: false,
            // validate: {
            //     validator: (p: number) => {
            //         return /\d{3}-\d{3}-\d{4}/.test(p.toString()); // test() accept string only
            //     },
            //     message: (props: { value: string }) => `${props.value} is invalid number`
            // }
        },

        age: {
            type: Number,
            max: 99,
            min: 12,
            required: false,
        },
        DOB: {
            type: Date,
            required: false,
            validate: {
                validator: (date: Date) => {
                    
                    const age = new Date().getFullYear() - date.getFullYear();
                    return age >= 12 && age <= 99;
                },
                message: (props: { value: Date }) => `${props.value.toString()} is not older than 12 or younger than 99`
            }
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        }

    }, {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    });
    export type IUser = InferSchemaType<typeof userSchema>
    const userModel = model<IUser>("UsersTs", userSchema, "UsersTs");
    export default userModel;