import { useId } from 'react';
import './checkbox.css';

const Checkbox = (props) => {
	const id = useId();

	const cleanProps = {...props};
	delete cleanProps.className;
	delete cleanProps.input;
	delete cleanProps.type;

	return (
		<div class={`form-element ${props.className}`}>
			<label htmlFor={id} className="flex items-center">
				<input
					type="checkbox"
					id={id}
					name={props.label}
					className="checkbox hidden opacity-0 absolute h-8 w-8"
					{...cleanProps}
					{...props.input}
				/>

				<div className="transition-all bg-white border-2 rounded-md border-gray/40 bg-gray/10 w-8 h-8 flex flex-shrink-0 justify-center items-center">
					<svg className="transition-all duration-300 ease-in-out fill-current opacity-0 scale-50 w-3 h-3 text-bright-green" version="1.1" viewBox="0 0 17 12" xmlns="http://www.w3.org/2000/svg">
						<g fill="none" fillRule="evenodd">
							<g transform="translate(-9 -11)" fill="currentColor" fillRule="nonzero">
								<path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z" />
							</g>
						</g>
					</svg>
				</div>

				{props.label != null ?
					<div className="ml-2 break-words overflow-hidden text-md" htmlFor={id}>
						{props.label}
					</div>
					: null}
			</label>
		</div>
	);
};

Checkbox.defaultProps = {
	className: '',
};

export default Checkbox;