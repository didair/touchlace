import { useId } from 'react';
import cx from 'classnames';

const Input = (props) => {
	const id = useId();

	return (
		<div className="form-element mb-4 last-of-type:mb-0">
			{props.label != null ?
				<label className="block font-bold mb-2" htmlFor={id}>
					{props.label}
				</label>
			: null}

			<input
				id={id}
				{...props}
				{...props.input}
				className={cx(
					"outline-none",
					'block',
					'w-full',
					'py-3 px-5',
					'rounded-md',
					'border-2',
					'border-green',
					'focus:border-bright-green',
					'text-dark',
					props.className
				)}
			/>
		</div>
	);
};

Input.defaultProps = {
	className: '',
};

export default Input;