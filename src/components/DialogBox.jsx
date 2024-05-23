import { useForm } from "react-hook-form";
import { Container, Input, Button, RTE } from "./components";
import { useUserContext } from "../contexts/user.context";
import { useBlogContext } from "../contexts/blog.context";
import { Navigate, Link } from "react-router-dom";
import dbService from "../services/db.service";
import storeService from "../services/store.service";

const DialogBox = () => {
	const { register, handleSubmit, setValue, formState, control } = useForm({
		defaultValues: {
			title: "",
			featuredImage: "",
			content: "",
		},
	});
	const { errors } = formState;
	const { loggedIn, userData } = useUserContext();
	const { addBlog } = useBlogContext();

	if (!loggedIn) return <Navigate to='/' />; // redirect
	return (
		<Container>
			<form noValidate className='space-y-4 md:space-y-6 flex flex-col'>
				<div className='flex flex-col gap-1'>
					<Input
						label='Title'
						type='text'
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
					<RTE control={control} />
					<p className='text-red-600'>{errors.content?.message}</p>
				</div>

				<div className="flex justify-between">
					<Link to="/" className="text-violet-800" >Return to Posts</Link>
					<Button
						label='Publish'
						className='p-2'
						functionality={handleSubmit((formData) => {
							storeService
								.uploadFile({ file: formData.featuredImage[0] })
								.then((res) => {
									dbService
										.insert({
											title: formData.title,
											content: formData.content,
											featuredImage: res.$id,
											userId: userData.$id,
										})
										.then((doc) => {
											addBlog({
												$id: doc.$id,
												title: doc.title,
												content: doc.content,
												status: doc.status,
												userId: doc.userId,
											})
										})
										.catch((err) => {
											alert(err.message);
										})
										.finally(() => {
											setValue("title", "");
											setValue("featuredImage", "");
											setValue("content", "");
										});
								})
								.catch((err) => {
									alert(err.message);
								})
						})}
					/>
				</div>
			</form>
		</Container>
	);
};

export default DialogBox;
