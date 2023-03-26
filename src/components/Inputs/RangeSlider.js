import { useId, useState, useMemo, useEffect } from 'react';
import debounce from 'lib/debounce';
import './rangeSlider.css';

const RangeSlider = (props) => {
	const [value, setValue] = useState(parseInt(props.value));
	const percentage = (parseInt(value) / parseInt(props.max)) * 100;
	const id = useId();

	useEffect(() => {
		if (props.value !== value) {
			setValue(props.value);
		}
	}, [props.value]);

	const updateParent = useMemo(() => debounce((event) => {
		props.onChange(event);
	}, 250), []);

	const onChange = (event) => {
		setValue(parseInt(event.target.value));
		updateParent(event);
	};

	return (
		<div className="text-center">
			<label htmlFor={id} className="block mb-4">
				{Math.round(percentage) + '%'}
			</label>

			<div style={{ height: 225 }}>
				<input
					id={id}
					min={props.min}
					max={props.max}
					value={value}
					onChange={onChange}
					type="range"
					className="slider"
					style={{
						backgroundImage: `linear-gradient(90deg, var(--bg-value-color) 0%, var(--bg-value-color) ${percentage}%, var(--bg-range-color) ${percentage}%, var(--bg-range-color) 100%)`
					}}
				/>
			</div>
		</div>
	);

};

RangeSlider.defaultProps = {
	onChange: () => null,
	value: '0',
	min: '0',
	max: '100',
};

export default RangeSlider;