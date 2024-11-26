import { motion } from 'framer-motion';
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
		<motion.div
			initial={{ opacity: 0, scale: 0.55 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.55 }}
		>
			<Link
				{...clickEvents}
				to={props.to}
				className={cx(
					"bg-gray/30",
					"inline-flex flex-shrink-0 flex-col",
					"py-1 px-2 pr-4",
					"rounded-full",
					"select-none",
					"text-light-gray/90",
				)}
				tabIndex={0}
			>
				<div className="flex items-center">
					{props.icon != null ?
						<div className="flex flex-shrink-0 items-center justify-center rounded-full w-7 h-7 mr-2 bg-bright-green/70 text-center">
							<Icon name={props.icon} className="text-light" />
						</div>
					: null}

					<div className="text-xs">
						{props.meta != null ?
							<div className="font-semibold">
								{props.meta}
							</div>
						: null}

						<div className="text-light-gray/70">
							{props.children}
						</div>
					</div>
				</div>
			</Link>
		</motion.div>
	);
};

Badge.defaultProps = {
	meta: null,
	to: '#',
	onClick: () => null,
	onLongPress: () => null,
};

export default Badge;