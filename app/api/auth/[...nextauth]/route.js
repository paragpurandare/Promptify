import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";

// Function to generate a valid username based on the user's profile information
const generateUsername = (email) => {
	// Extracting the username from the email (before '@')
	const username = email.split("@")[0];
	// Trimming and converting to lowercase
	return username.trim().toLowerCase();
};

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	callbacks: {
		async session({ session }) {
			await connectToDB(); // <-- Ensure DB is connected
			const sessionUser = await User.findOne({
				email: session.user.email,
			});
			session.user.id = sessionUser._id.toString();
			return session;
		},

		async signIn({ profile }) {
			try {
				await connectToDB(); // <-- Ensure DB is connected
				// Check if a user already exists
				const userExists = await User.findOne({ email: profile.email });

				// If not, create a new user
				if (!userExists) {
					// Generate a username based on the email
					const username = generateUsername(profile.email);

					// Create the user with the generated username
					await User.create({
						email: profile.email,
						username: username,
						image: profile.picture,
					});
				}
				return true;
			} catch (error) {
				console.log(error);
				return false;
			}
		},
	},
});

export { handler as GET, handler as POST };
