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
			className={cx(
				'grid-item',
				'w-40 h-40',
				'transition-all',
				'ease-in-out',
				'duration-200',
				'flex',
				'flex-col',
				'justify-between',
				'p-4 mb-3',
				'text-dark',
				'rounded-lg',
				'text-md',
				'cursor-pointer',
				'backdrop-blur-lg',
				{
					'bg-light': props.state == 'light',
					'bg-light/20': props.state == 'dark',
				},
				props.className,
				props.type,
			)}
		/>
	);
};

Card.defaultProps = {
	className: '',
	type: '',
	state: 'dark',
};

export default Card;
