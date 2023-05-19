import React from 'react';
// import Link from 'next/link';
import { Link } from 'react-router-dom';

const links = [
	{ name: 'Map', path: '/map' },
	{ name: 'About', path: '/about' },
];

const Navbar = () => {
	return (
		<header className='h-16 w-full bg-green-700'>
			<nav className='container mx-auto flex text-slate-100 justify-between h-full items-center'>
				<div className='flex'>
					<div className='mr-16 font-semibold text-white text-lg'>
						<Link to='/'>FuelService</Link>
					</div>
					<ul className='flex'>
						{links.map((link) => (
							<li
								key={link.name}
								className='mr-6 hover:underline hover:text-white'
							>
								<Link to={link.path} className='text-lg'>
									<p>{link.name}</p>
								</Link>
							</li>
						))}
					</ul>
				</div>
				<div>Home</div>
			</nav>
		</header>
	);
};

export default Navbar;