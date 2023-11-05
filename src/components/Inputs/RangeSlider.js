import { useEffect, useId, useState, useRef } from 'react';
import ReactSlider from 'react-slider';
import './rangeSlider.css';

const RangeSlider = ({
	value = 0,
	onChange = () => null,
	min = 0,
	max = 100,
	showLabel = true,
}) => {
	const [internalValue, setInternalValue] = useState(parseInt(value));
	const percentage = (internalValue / parseInt(max)) * 100;
	const id = useId();
	const sliderRef = useRef(null)

	useEffect(() => {
		if (sliderRef.current != null) {
			sliderRef.current.resize()
		}

		setTimeout(() => {
			if (sliderRef.current != null) {
				sliderRef.current.resize()
			}
		}, 100);
	}, [sliderRef.current])

	useEffect(() => {
		if (value != internalValue) {
			setInternalValue(value);
		}
	}, [value]);

	const onSliderAfterChange = (value) => {
		onChange(value);
	};

	const onSliderChange = (value) => {
		setInternalValue(value);
	};

	return (
		<div className="h-full flex flex-col items-center">
			{showLabel ?
				<label htmlFor={id} className="block mb-4">
					{Math.round(percentage) + '%'}
				</label>
			: null}

			<ReactSlider
				ref={sliderRef}
				orientation="vertical"
				invert={true}
				className="range-slider"
				thumbClassName="slider-thumb"
				trackClassName="slider-track"
				value={internalValue}
				onAfterChange={onSliderAfterChange}
				onChange={onSliderChange}
				min={parseInt(min)}
				max={parseInt(max)}
				id={id}
			/>
		</div>
	);

};

export default RangeSlider;
