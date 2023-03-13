import { useId } from 'react';

const Checkbox = (props) => {
	const id = useId();

	return (
		<div className="form-element flex items-center w-full">
			<input
				type="checkbox"
				id={id}
				{...props}
				{...props.input}
			/>

			{props.label != null ?
				<label className="ml-2 break-words overflow-hidden text-md" htmlFor={id}>
					{props.label}
				</label>
			: null}
		</div>
	);
};

Checkbox.defaultProps = {
	className: '',
};

export default Checkbox;