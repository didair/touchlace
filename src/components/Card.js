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
		shouldPreventDefault: false,
		delay: 350,
	};

	let clickEvents = useLongPress(onLongPress, onClick, options);
	const cleanProps = {...props};
	delete cleanProps.onLongPress;
	delete cleanProps.onClick;
	delete cleanProps.state;
	delete cleanProps.type;
	delete cleanProps.backgroundImage;
	delete cleanProps.disableClickEvents;

	if (props.disableClickEvents) {
		clickEvents = undefined;
	}

	return (
		<div
			{...cleanProps}
			{...clickEvents}
			className={cx(
				'relative',
				'transition-all',
				'ease-in-out',
				'duration-200',
				'rounded-xl',
				'text-md',
				'cursor-pointer',
				'select-none',
				'overflow-hidden',
				'calculated-square square-h',
				{
					'text-dark': props.backgroundImage == null,
					'text-light': props.backgroundImage != null,
					'bg-light': props.state == 'light',
					'bg-light/20': props.state == 'dark',
				},
				props.className,
				props.type,
			)}
		>
			{props.backgroundImage != null ?
				<div className='absolute inset-0 w-full h-full z-0 bg-dark/50 rounded-xl overflow-hidden'>
					<div
						className={cx(
							"absolute inset-0 w-full h-full bg-cover bg-center",
						)}
						style={{
							backgroundImage: `url("${props.backgroundImage}")`
						}}
					/>

					<div
						className={cx(
							"absolute inset-0 w-full h-full bg-cover bg-center transition-all ease-in-out duration-300",
							{
								'opacity-30': props.state == 'light',
								'opacity-100': props.state == 'dark',
							}
						)}
						style={{
							backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6))`
						}}
					/>
				</div>
			: null}

			<div
				className={cx(
					"h-full",
					"w-full",
					"flex",
					"flex-col",
					"justify-between",
					"p-4",
					"inset-0",
					"absolute",
					"z-10",
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
	disableClickEvents: false,
};

export default Card;
