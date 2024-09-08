import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import cx from 'classnames';
import { useEffect, useState } from 'react';

interface HorizontalSliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
	value: number;
	onChange: (value: number) => null,
};

const HorizontalSlider = React.forwardRef<
	React.ElementRef<typeof SliderPrimitive.Root>,
	HorizontalSliderProps
>(({ className, value, ...props }, ref) => {
	const [internalValue, setInternalValue] = useState(value);

	useEffect(() => {
		console.log('### value onChange', value);
		if (value != internalValue) {
			setInternalValue(value);
		}
	}, [value]);

	const onSliderCommit = ([value]) => {
		props.onChange(value);
	};

	const onSliderChange = ([value]) => {
		setInternalValue(value);
	};

	return (
		<SliderPrimitive.Root
			ref={ref}
			className={cx(
				"relative flex w-full touch-none select-none items-center",
				className
			)}
			value={[internalValue]}
			onValueCommit={onSliderCommit}
			onValueChange={onSliderChange}
			{...props}
		>
			<SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray/60">
				<SliderPrimitive.Range className="absolute h-full bg-light" />
			</SliderPrimitive.Track>
			<SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-blue bg-light ring-offset-blue transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
		</SliderPrimitive.Root>
	);
});

HorizontalSlider.displayName = SliderPrimitive.Root.displayName

export default HorizontalSlider;
