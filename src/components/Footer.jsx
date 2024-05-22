import { Link } from "react-router-dom";

const Footer = () => {
  const date = new Date
  const year = date.getFullYear()

	return (
		<footer className='bg-white rounded-lg shadow m-4 dark:bg-gray-800'>
			<div className='w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between'>
				<span className='text-sm text-gray-500 sm:text-center dark:text-gray-400'>
					&copy; {year}{" "}
					<Link to="/" className='hover:underline'>
						BlogApp{" "}
					</Link>
					All Rights Reserved
				</span>
				<ul className='flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0'>
					<li className='hover:underline me-4 md:me-6 cursor-pointer'>About</li>
					<li className='hover:underline me-4 md:me-6 cursor-pointer'>Privacy Policy</li>
					<li className='hover:underline me-4 md:me-6 cursor-pointer'>Licensing</li>
					<li className='hover:underline me-4 md:me-6 cursor-pointer'>About</li>
				</ul>
			</div>
		</footer>
	)
}

export default Footer