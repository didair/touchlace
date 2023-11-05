import { Outlet } from 'react-router-dom';
import { useGetConfigQuery } from "services/config/api";
import { resolveMedia } from 'services/mediabrowser/slice';

import Time from 'components/Time';
import Sidebar from "components/Sidebar";
import Footer from 'components/Footer';
import ScrollToTop from 'components/ScrollToTop';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function App() {
	let mounted = false;
	const dispatch = useDispatch();
	const settings = useSelector((state) => state.settings.entities);
	const { data: config } = useGetConfigQuery();

	const onResize = () => {
		const squares = document.querySelectorAll('.calculated-square');

		if (squares.length > 0) {
			squares.forEach((square) => {
				if (square.classList.contains('square-h')) {
					square.style.width = square.scrollHeight + 'px';
				}

				if (square.classList.contains('square-h-half')) {
					square.style.width = (square.scrollHeight / 2) + 'px';
				}

				if (square.classList.contains('square-w')) {
					square.style.width = square.scrollWidth + 'px';
				}

				if (square.classList.contains('square-w-half')) {
					square.style.width = (square.scrollWidth / 2) + 'px';
				}
			});
		}
	};

	useEffect(() => {
		if (!mounted) {
			settings.forEach((entity) => {
				if (entity.backgroundImageId != null) {
					dispatch(resolveMedia({
						media_content_id: entity.backgroundImageId,
					}));
				}
			});
		}

		window.addEventListener('resize', onResize);
		mounted = true;
		return () => window.removeEventListener('resize', onResize);
	}, []);

	return (
		<div className="app">
			<ScrollToTop />

			<div className="flex flex-col max-h-full h-screen flex-nowrap overflow-hidden">
				<div className="pt-6 flex-1 flex flex-col overflow-scroll">
					<div className="px-8 mb-5 flex justify-between">
						<h1 className="text-xl">
							<Time />
							{config != null ?
								' • ' + config.location_name
							: null}
						</h1>

						<div id="header-right"></div>
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
