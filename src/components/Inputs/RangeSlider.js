import './rangeSlider.css';

const RangeSlider = (props) => {
	const percentage = (parseInt(props.value) / parseInt(props.max)) * 100;

	return (
		<div style={{ height: 160 }}>
			<input
				type="range"
				{...props}
				className="slider"
				style={{
					backgroundImage: `linear-gradient(90deg, var(--bg-value-color) 0%, var(--bg-value-color) ${percentage}%, var(--bg-range-color) ${percentage}%, var(--bg-range-color) 100%)`
				}}
			/>
		</div>
	);

};

RangeSlider.defaultProps = {
	min: '0',
	max: '100',
};

export default RangeSlider;