import cx from 'classnames';

const Button = (props) => {
	return (
		<div className="form-element mb-4 last-of-type:mb-0">
			<button
				{...props}
				{...props.input}
				className={cx(
					'py-3 px-5',
					'rounded-md',
					'text-dark',
					'bg-green',
					'border-2',
					'border-green',
					'hover:border-bright-green',
					'shadow-md',
					'hover:shadow-lg',
					'cursor-pointer',
					{
						'opacity-70': false,
						'cursor-not-allowed': false,
					},
					props.className
				)}
			/>
		</div>
	);
};

Button.defaultProps = {
	className: '',
};

export default Button;