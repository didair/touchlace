import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import cx from 'classnames';

const SidebarItem = ({ to, children }) => (
	<NavLink
		to={to}
		className={({ isActive }) => cx(
			'block',
			'py-4 px-8',
			'text-lg',
			'font-semibold',
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
		const active = document.querySelector(`#sidebar a[href="${location.pathname}"]`);

		if (active != null) {
			const activeRect = active.getBoundingClientRect();
			const indicatorRect = indicator.getBoundingClientRect();
			indicator.classList.remove('-translate-x-1');
			indicator.style.top = activeRect.top + (activeRect.height/2) - (indicatorRect.height/2) + 'px';
		} else {
			indicator.classList.add('-translate-x-1');
		}
	}, [location]);

	return (
		<div className="flex flex-col gap-y-2" id="sidebar">
			<SidebarItem to="/">
				Home
			</SidebarItem>

			<div className="bg-gray rounded-full mx-8" style={{ height: 1 }} />

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
