import { Link } from 'react-router-dom';
import Icon from './Icon';

const Badge = (props) => {
	return (
		<Link
			to={props.to}
			className="p-2 px-4 border border-gray rounded-md select-none text-light-gray/90"
		>
			{props.icon != null ?
				<Icon name={props.icon} className="mr-2" />
			: null}

			{props.children}
		</Link>
	);
};

Badge.defaultProps = {
	to: '#',
	onClick: () => null,
};

export default Badge;