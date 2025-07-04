"use client";
import React, { Suspense } from "react";
import Form from "@components/Form";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const UpdatePrompt = () => {
	const router = useRouter();

	const [submitting, setSubmitting] = useState(false);
	const [post, setPost] = useState({
		prompt: "",
		tag: "",
	});

	const searchParams = useSearchParams();
	const promptId = searchParams.get("id");

	useEffect(() => {
		const getPromptDetails = async () => {
			if (!promptId) return;
			try {
				const data = await response.json();
				setPost({
					prompt: data.prompt,
					tag: data.tag,
				});
			} catch (error) {
				console.log(error);
			}
		};
		getPromptDetails();
	}, [promptId]);

	const updatePrompt = async (e) => {
		e.preventDefault();
		setSubmitting(true);

		if (!promptId) return alert("Prompt ID not found");

		try {
			const response = await fetch(`/api/prompt/${promptId}`, {
				method: "PATCH",
				body: JSON.stringify({
					prompt: post.prompt,
					tag: post.tag,
				}),
			});
			if (response.ok) {
				router.push("/");
			}
		} catch (error) {
			console.log(error);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Form
			type="Edit"
			post={post}
			setPost={setPost}
			submitting={submitting}
			handleSubmit={updatePrompt}
		/>
	);
};

export default function UpdatePromptPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<UpdatePrompt />
		</Suspense>
	);
}
