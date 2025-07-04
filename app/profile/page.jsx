"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";

const MyProfile = () => {
	const { data: session } = useSession();
	const router = useRouter();
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await fetch(
					`../api/users/${session?.user.id}/posts`
				);
				if (response.ok) {
					const data = await response.json();
					setPosts(data);
				} else {
					throw new Error("Failed to fetch posts");
				}
			} catch (error) {
				console.error(error);
			}
		};

		if (session?.user.id) {
			fetchPosts();
		}
	}, [session]);

	const handleEdit = (post) => {
		router.push(`/update-prompt?id=${post._id}`);
	};

	const handleDelete = async (post) => {
		const hasConfirmed = confirm(
			"Are you sure you want to delete this prompt?"
		);
		if (hasConfirmed) {
			try {
				await fetch(`/api/prompt/${post._id.toString()}`, {
					method: "DELETE",
				});
				const filteredPosts = posts.filter((p) => p._id !== post._id);
				setPosts(filteredPosts);
			} catch (error) {
				console.error(error);
			}
		}
	};

	return (
		<div>
			<Profile
				name="My"
				desc="Welcome to your personalized profile page"
				data={posts}
				handleEdit={handleEdit}
				handleDelete={handleDelete}
			/>
		</div>
	);
};

export default MyProfile;
