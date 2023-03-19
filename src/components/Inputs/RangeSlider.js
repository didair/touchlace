import cx from 'classnames';

const RangeSlider = (props) => {

	return (
		<input
			type="range"
			{...props}
			className={cx(
				'slider',
			)}
		/>
	);

};

RangeSlider.defaultProps = {
	min: '0',
	max: '100',
};

export default RangeSlider;