import { Outlet } from 'react-router-dom';
import ScrollToTop from 'components/ScrollToTop';

function App() {

	return (
		<div className="px-10 py-6">
			<ScrollToTop />
			<Outlet />
		</div>
	);

}

export default App;
