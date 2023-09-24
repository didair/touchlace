import { Link } from 'react-router-dom';
import cx from 'classnames';
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
			className={cx(
				"bg-gray/30",
				"inline-flex flex-shrink-0 flex-col",
				"py-2 px-4",
				"border border-gray rounded-full",
				"select-none",
				"text-light-gray/90",
			)}
		>
			<div className="flex items-center">
				{props.icon != null ?
					<div className="flex flex-shrink-0 items-center justify-center rounded-full w-7 h-7 mr-2 bg-light text-center">
						<Icon name={props.icon} className="text-dark" />
					</div>
				: null}

				<div className="text-xs">
					{props.meta != null ?
						<div className="font-semibold">
							{props.meta}
						</div>
					: null}

					{props.children}
				</div>
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