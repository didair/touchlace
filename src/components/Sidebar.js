import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';
import cx from 'classnames';
import Icon from './Icon';

const SidebarItem = ({ to, children }) => (
	<NavLink
		to={to}
		className={({ isActive }) => cx(
			'block',
			'py-4 px-8',
			'text-lg',
			'font-semibold',
			'navitem',
			{
				'is-active': isActive,
			}
		)}
	>
		{children}
	</NavLink>
);

const Sidebar = () => {
	const rooms = useSelector((state) => state.rooms.list);
	const location = useLocation();

	useEffect(() => {
		const indicator = document.getElementById('sidebar-active-indicator');
		const active = document.querySelector(`#sidebar a[href="${location.pathname}"].navitem`);

		if (active != null) {
			const indicatorRect = indicator.getBoundingClientRect();
			indicator.classList.remove('-translate-x-1');
			indicator.style.top = active.offsetTop + (indicatorRect.height / 2) + 'px';
		} else {
			indicator.classList.add('-translate-x-1');
		}
	}, [location]);

	return (
		<div className="flex flex-col relative" id="sidebar">
			<SidebarItem to="/">
				Home
			</SidebarItem>

			<SidebarItem to="/media">
				Media
			</SidebarItem>

			<div className="bg-gray rounded-full mx-8 my-4" style={{ height: 1 }} />

			{rooms == null || rooms.length == 0 ?
				<div className="flex items-center justify-center text-green">
					<span className="mr-2">
						<Icon name="circle-plus" />
					</span>

					<Link to="/settings" className="font-bold ml-1">
						Add a room in settings
					</Link>
				</div>
			: null}

			{rooms.map((room) => {
				return (
					<SidebarItem
						to={`/room/${room.id}`}
						key={room.id}
					>
						{room.name}
					</SidebarItem>
				);
			})}
			
			<div
				className={cx(
					'h-8 w-1',
					'rounded-r-full',
					'bg-bright-green',
					'transition-all',
					'duration-300',
					'ease-in-out',
					'absolute -translate-x-1'
				)}
				id="sidebar-active-indicator"
			/>
		</div>
	);
};

export default Sidebar;
