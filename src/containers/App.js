import { Outlet } from 'react-router-dom';
import Header from 'components/Header';

function App() {

	return (
		<div className="px-10">
			<Header />
			<Outlet />
		</div>
	);

}

export default App;
