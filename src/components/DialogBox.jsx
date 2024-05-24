import { useForm } from "react-hook-form";
import { Container, Input, Button, RTE } from "./components";
import { useUserContext } from "../contexts/user.context";
import { useBlogContext } from "../contexts/blog.context";
import { Navigate, Link, useNavigate } from "react-router-dom";
import dbService from "../services/db.service";
import storeService from "../services/store.service";
import { useEffect, useState, useCallback } from "react";

const DialogBox = () => {
	const { addBlog, currentBlog, editBlog } = useBlogContext();
	const [fileName, setFileName] = useState("");
	const { register, handleSubmit, setValue, formState, control } = useForm({
		defaultValues: {
			title: currentBlog.title || "",
			featuredImage: "",
			content: currentBlog.content || "",
		},
	});
	const { errors } = formState;
	const { loggedIn, userData } = useUserContext();
	const navigate = useNavigate()

	useEffect(() => {
		storeService
			.fetchFile({ fileId: currentBlog.featuredImage || "" })
			.then((res) => {
				setFileName(res.name);
			}).catch(err => {
				console.error(err);
			})
	}, []);
	const uploadBlogHandler = useCallback((formData) => {
		storeService
			.uploadFile({ file: formData.featuredImage[0] })
			.then((res) => {
				dbService
					.insert({
						title: formData.title,
						content: formData.content,
						featuredImage: res.$id,
						userId: userData.userId || userData.$id,
					})
					.then((doc) => {
						addBlog({
							$id: doc.$id,
							title: doc.title,
							content: doc.content,
							featuredImage: res.featuredImage,
							status: doc.status,
							userId: doc.userId,
						});
					})
					.catch((err) => {
						alert(err.message);
					})
					.finally(() => {
						setValue("title", "");
						setValue("featuredImage", "");
						setValue("content", "");
						navigate("/")
					});
			})
			.catch((err) => {
				alert(err.message);
			});
	}, []);
	const updateBloghandler = useCallback((formData, uploadedFile="") => {
		dbService
			.update({
				documentId: currentBlog.$id,
				changes: {
					title: formData.title,
					content: formData.content,
					featuredImage: uploadedFile.$id || currentBlog.featuredImage,
				},
			})
			.then((doc) => {
				editBlog(currentBlog.$id, {
					$id: doc.$id,
					title: doc.title,
					content: doc.content,
					featuredImage: doc.featuredImage,
				});
			})
			.catch((err) => {
				alert(err.message);
			})
			.finally(() => {
				setValue("title", "");
				setValue("featuredImage", "");
				setValue("content", "");
				navigate("/")
			});
	}, []);

	if (!loggedIn) return <Navigate to='/' />; // redirect
	return (
		<Container>
			<form noValidate className='space-y-4 md:space-y-6 flex flex-col'>
				<div className='flex flex-col gap-1'>
					<Input
						label='Title'
						type='text'
						defaultValue={currentBlog.title || ""}
						{...register("title", {
							required: {
								value: true,
								message: "This is a required field",
							},
						})}
					/>
					<p className='text-red-600'>{errors.title?.message}</p>
				</div>

				<Input
					label='Featured Image'
					type='file'
					{...register("featuredImage")}
					className='flex flex-col gap-1'
					accept='.png, .jpg'
				/>

				<div className='flex flex-col gap-1'>
					<RTE control={control} initialValue={currentBlog.content || ""} />
					<p className='text-red-600'>{errors.content?.message}</p>
				</div>

				<div className='flex justify-between'>
					<Link to='/' className='text-violet-800'>
						Return to Posts
					</Link>
					<Button
						label={currentBlog.$id ? "Save" : "Publish"}
						className='p-2 bg-violet-700 hover:bg-violet-800'
						functionality={handleSubmit((formData) => {
							if (!currentBlog.$id) uploadBlogHandler(formData);
							else {
								if (typeof formData.featuredImage == "object" && fileName != formData.featuredImage[0].name) {
									storeService
										.deleteFile({ fileId: currentBlog.featuredImage })
										.then((res) => {
											if (res) {
												storeService
													.uploadFile({ file: formData.featuredImage[0] })
													.then((uploadedFile) => {
														updateBloghandler(formData, uploadedFile)
													})
													.catch(err => {
														console.error(err);
													})
											}
										})
										.catch((err) => {
											console.error(err);
										});
								}
								else updateBloghandler(formData)
							}
						})}
					/>
				</div>
			</form>
		</Container>
	);
};

export default DialogBox;
