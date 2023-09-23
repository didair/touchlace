import cx from 'classnames';
import useLongPress from 'lib/useLongPress';
import { useEffect } from 'react';

const Card = (props) => {

	useEffect(() => {
		window.dispatchEvent(new Event('resize'));
	}, []);

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
				'relative',
				'transition-all',
				'ease-in-out',
				'duration-200',
				'text-dark',
				'rounded-xl',
				'text-md',
				'cursor-pointer',
				'backdrop-blur-lg',
				'select-none',
				'calculated-square square-h',
				{
					'bg-light': props.state == 'light',
					'bg-light/20': props.state == 'dark',
				},
				props.className,
				props.type,
			)}
		>
			<div
				className={cx(
					"h-full",
					"w-full",
					"flex",
					"flex-col",
					"justify-between",
					"p-4",
					"inset-0",
					{
						"absolute": props.type != 'media'
					}
				)}
			>
				{props.children}
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
