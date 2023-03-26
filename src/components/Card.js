import cx from 'classnames';
import useLongPress from 'lib/useLongPress';

const Card = (props) => {

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

	const options = {
		shouldPreventDefault: true,
		delay: 350,
	};

	const clickEvents = useLongPress(onLongPress, onClick, options);
	const cleanProps = {...props};
	delete cleanProps.onLongPress;
	delete cleanProps.onClick;
	delete cleanProps.state;
	delete cleanProps.type;

	return (
		<div
			{...cleanProps}
			{...clickEvents}
		>
			<div style={{ paddingTop: '100%' }} className={cx(
				'relative',
				'transition-all',
				'ease-in-out',
				'duration-200',
				'text-dark',
				'rounded-lg',
				'text-md',
				'cursor-pointer',
				'backdrop-blur-lg',
				'select-none',
				{
					'bg-light': props.state == 'light',
					'bg-light/20': props.state == 'dark',
				},
				props.className,
				props.type,
			)}>
				<div className={cx(
					"absolute",
					"top-0",
					"left-0",
					"h-full",
					"w-full",
					"flex",
					"flex-col",
					"justify-between",
					"p-4",
				)}>
					{props.children}
				</div>
			</div>
		</div>
	);
};

Card.defaultProps = {
	className: '',
	type: '',
	state: 'dark',
};

export default Card;
