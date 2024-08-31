import cx from 'classnames';
import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

const Slider = React.forwardRef<
	React.ElementRef<typeof SliderPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
	<SliderPrimitive.Root
		ref={ref}
		className={cx(
			"relative flex w-full h-full touch-none select-none items-center",
			className
		)}
		orientation="vertical"
		{...props}
	>
		<SliderPrimitive.Track className="relative h-full w-full grow overflow-hidden bg-light/5">
			<SliderPrimitive.Range className="absolute w-full bg-light/60" />
		</SliderPrimitive.Track>

		<SliderPrimitive.Thumb className="flex w-full justify-center ml-12 disabled:pointer-events-none outline-none disabled:opacity-50">
			<span
				className={cx("h-1 w-12 bg-light shadow-md rounded-full transition-colors", {
					"mt-2": !props.inverted,
					"mb-2": props.inverted,
				})}
			/>
		</SliderPrimitive.Thumb>
	</SliderPrimitive.Root>
))

Slider.displayName = SliderPrimitive.Root.displayName

export default Slider;
