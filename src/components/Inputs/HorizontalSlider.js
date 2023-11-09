import { useEffect, useId, useState, useRef } from 'react';
import ReactSlider from 'react-slider';

import './_horizontalSlider.css';

const HorizontalSlider = ({
	value = 0,
	onChange = () => null,
	min = 0,
	max = 100,
}) => {
	const [internalValue, setInternalValue] = useState(parseInt(value));
	const id = useId();
	const sliderRef = useRef(null)

	useEffect(() => {
		const handleSliderResize = () => {
			if (sliderRef.current == null) {
				return;
			}

			sliderRef.current.handleResize();
			sliderRef.current.resize();
		};

		setTimeout(handleSliderResize, 100);
		setTimeout(handleSliderResize, 250);
		setTimeout(handleSliderResize, 350);
		handleSliderResize();
	}, [sliderRef.current]);

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
		<ReactSlider
			ref={sliderRef}
			value={internalValue}
			className="horizontal-slider"
			thumbClassName="slider-thumb"
			trackClassName="slider-track"
			onAfterChange={onSliderAfterChange}
			onChange={onSliderChange}
			min={parseInt(min)}
			max={parseInt(max)}
			id={id}
		/>
	);

};

export default HorizontalSlider;
