import { useEffect, useId } from "react";
import cx from 'classnames';

const Select = ({ label, value, onChange, children, input }) => {
	const id = useId();

	useEffect(() => {
		if (input != null && input.value == '') {
			if (children[0]?.props?.value) {
				input.onChange(children[0].props.value);
			}
		}
	}, []);

	return (
		<div className="form-element mb-4 last-of-type:mb-0">
			{label != null ?
				<label className="block font-bold mb-2" htmlFor={id}>
					{label}
				</label>
			: null}

			<div className="text-dark">
				<select
					value={input?.value ?? value}
					id={id}
					className={cx(
						'w-full',
						'py-3 px-5',
						'outline-none',
						'rounded-md',
						'border-2',
						'border-green',
						'focus:border-bright-green',
					)}
					onChange={input?.onChange ?? onChange}
				>
					{children}
				</select>
			</div>
		</div>
	);
};

export default Select;
