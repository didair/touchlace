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
			className="bg-gray/30 inline-flex flex-col p-2 px-4 border border-gray rounded-full select-none text-light-gray/90"
		>
			{props.meta != null ?
				<div className="text-xs font-semibold">
					{props.meta}
				</div>
			: null}

			<div className="flex items-center">
				{props.icon != null ?
					<div className="flex items-center justify-center rounded-full w-7 h-7 mr-2 bg-light text-center">
						<Icon name={props.icon} className="text-dark" />
					</div>
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