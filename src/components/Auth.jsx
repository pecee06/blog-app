import { useForm } from "react-hook-form";
import { Input, Button, Container, Logo } from "./components";
import { Link } from "react-router-dom";
import { googleIcon } from "../assets/assets";
import authService from "../services/auth.service";
import { useUserContext } from "../contexts/user.context";
import { useNavigate } from "react-router-dom";

const Auth = ({ label = "" }) => {
	const { register, handleSubmit, setValue, formState } = useForm({
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});
	const { errors } = formState;
	const { login, setUserData } = useUserContext();
	const navigate = useNavigate();

	return (
		<Container className='flex flex-col gap-[5vw]'>
			<Logo />
			<div className='w-full mx-auto bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
				<div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
					<h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
						{label == "signup"
							? "Create a new Account"
							: "Sign In to your Account"}
					</h1>
					<form className='space-y-4 md:space-y-6' noValidate>
						{
							label=="signup" &&
							<div className='flex flex-col gap-1'>
								<Input
									label='Name'
									type='text'
									{...register("name", {
										required: {
											value: true,
											message: "This is a required field",
										}
									})}
								/>
								<p className='text-red-600'>{errors.name?.message}</p>
							</div>
						}

						<div className='flex flex-col gap-1'>
							<Input
								label='Email'
								type='email'
								{...register("email", {
									required: {
										value: true,
										message: "This is a required field",
									},
									pattern: {
										value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
										message: "Enter a valid Email",
									},
								})}
							/>
							<p className='text-red-600'>{errors.email?.message}</p>
						</div>

						<div className='flex flex-col gap-1'>
							<Input
								label='Password'
								type='password'
								placeholder='••••••••'
								{...register("password", {
									required: {
										value: true,
										message: "This is a required field",
									},
									pattern: {
										value:
											/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/,
										message: "Enter a strong password (uppercase, lowercase, special-characters, numbers)",
									},
								})}
							/>
							<p className='text-red-600'>{errors.password?.message}</p>
						</div>

						<Button
							type='submit'
							className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
							label={label}
							functionality={handleSubmit((formData) => {
								if (label == "signup") {
									authService
										.signup({
											email: formData.email,
											password: formData.password,
											name: formData.name
										})
										.then((res) => {
											if (res) {
												setUserData(res)
												login();
												navigate("/");
											}
										})
										.catch((err) => {
											alert(err.message);
											// Hot Toast
										})
										.finally(() => {
											setValue("email", "");
											setValue("password", "");
										});
								} else {
									authService
										.login({
											email: formData.email,
											password: formData.password,
										})
										.then((res) => {
											if (res) {
												setUserData(res)
												login();
												navigate("/");
											}
										})
										.catch((err) => {
											alert(err.message);
											// Hot Toast
										})
										.finally(() => {
											setValue("email", "");
											setValue("password", "");
										});
								}
							})}
						/>

						<Button
							type='submit'
							label={`${label} with Google`}
							className='flex justify-center gap-2 items-center w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
							functionality={() => {
								authService.signupWithGoogle();
								setValue("email", "");
								setValue("password", "");
							}}
						>
							<img src={googleIcon} width={30} height={30} />
						</Button>

						{label != "signup" ? (
							<p className='text-sm font-light text-gray-500 dark:text-gray-400'>
								Don't have an account yet?
								<Link
									to='/signup'
									className='font-medium text-primary-600 hover:underline dark:text-primary-500 mx-2'
								>
									Sign up
								</Link>
							</p>
						) : (
							<p className='text-sm font-light text-gray-500 dark:text-gray-400'>
								Already having an account?
								<Link
									to='/signin'
									className='font-medium text-primary-600 hover:underline dark:text-primary-500 mx-2'
								>
									Sign In
								</Link>
							</p>
						)}
					</form>
				</div>
			</div>
		</Container>
	);
};

export default Auth;
