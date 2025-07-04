import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
	email: {
		type: String,
		unique: [true, "Email already exists!"],
		required: [true, "Email is required!"],
	},
	username: {
		type: String,
		required: [true, "Username is required"],
		unique: [true, "Username already exists!"],
		match: [
			/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
			"Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
		],
	},
	image: {
		type: String,
	},
});

export default mongoose.models.User || mongoose.model("User", userSchema);
