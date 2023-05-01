import { Link } from 'react-router-dom';
import useLongPress from 'lib/useLongPress';
import Icon from './Icon';

const Badge = (props) => {
	const options = {
		shouldPreventDefault: true,
		delay: 350,
	};

	const onLongPress = () => {
		if (props.onLongPress != null && typeof props.onLongPress == 'function') {
			props.onLongPress();
		}
	};

	const onClick = () => {
		if (props.onClick != null && typeof props.onClick == 'function') {
			props.onClick();
		}
	};

	const clickEvents = useLongPress(onLongPress, onClick, options);

	return (
		<Link
			{...clickEvents}
			to={props.to}
			className="bg-gray/30 inline-flex flex-col p-2 px-4 border border-gray rounded-md select-none text-light-gray/90"
		>
			{props.meta != null ?
				<div className="text-xs font-semibold">
					{props.meta}
				</div>
			: null}

			<div>
				{props.icon != null ?
					<Icon name={props.icon} className="mr-2" />
				: null}

				{props.children}
			</div>
		</Link>
	);
};

Badge.defaultProps = {
	meta: null,
	to: '#',
	onClick: () => null,
	onLongPress: () => null,
};

export default Badge;