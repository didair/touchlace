import { Outlet } from 'react-router-dom';
import { useGetConfigQuery } from "services/config/api";

import Time from 'components/Time';
import Sidebar from "components/Sidebar";
import Footer from 'components/Footer';
import ScrollToTop from 'components/ScrollToTop';
import { useEffect } from 'react';

function App() {
	const { data: config } = useGetConfigQuery();

	const onResize = () => {
		const squares = document.querySelectorAll('.calculated-square');

		if (squares.length > 0) {
			squares.forEach((square) => {
				if (square.classList.contains('square-h')) {
					square.style.width = square.scrollHeight + 'px';
				}

				if (square.classList.contains('square-w')) {
					square.style.width = square.scrollWidth + 'px';
				}
			});
		}
	};

	useEffect(() => {
		window.addEventListener('resize', onResize);
		return () => window.removeEventListener('resize', onResize);
	}, []);

	return (
		<div className="app">
			<ScrollToTop />

			<div className="flex flex-col max-h-full h-screen flex-nowrap overflow-hidden">
				<div className="pt-6 flex-1 flex flex-col overflow-scroll">
					<div className="px-8 mb-5">
						<h1 className="text-xl">
							<Time />
							{config != null ?
								' • ' + config.location_name
							: null}
						</h1>
					</div>

					<div className="flex flex-1 h-full overflow-scroll">
						<div className="w-64 flex-shrink-0">
							<Sidebar />
						</div>

						<div className="w-full overflow-y-hidden overflow-x-scroll">
							<Outlet />
						</div>
					</div>
				</div>

				<Footer />
			</div>

		</div>
	);

}

export default App;
