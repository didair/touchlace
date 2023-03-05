import cx from 'classnames';
import { Link } from "react-router-dom";

const Header = () => {

	const onSignout = () => {
		localStorage.removeItem('touchlace-base-uri');
		localStorage.removeItem('hassTokens');
	};

	const linkStyles = cx(
		'transition-all',
		'ease-in-out',
		'py-2 px-3',
		'rounded-md',
		'hover:bg-light/10',
		'hover:backdrop-blur-lg',
	);

	return (
		<header className="border-b border-gray/50 py-3 flex items-center justify-end space-x-2 mb-6">
			<Link to="/" className={linkStyles}>
				Home
			</Link>

			<Link to="/settings" className={linkStyles}>
				Settings
			</Link>

			<a href="#" className={linkStyles} onClick={onSignout}>
				Sign out
			</a>
		</header>
	);

};

export default Header;