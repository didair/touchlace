import cx from 'classnames';
import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  flip?: boolean;
}

const Slider = React.forwardRef<
	React.ElementRef<typeof SliderPrimitive.Root>,
	SliderProps
>(({ className, flip, ...props }, ref) => (
	<SliderPrimitive.Root
		ref={ref}
		className={cx(
			"relative flex w-full h-full touch-none select-none items-center overflow-hidden",
			className,
		)}
		orientation="vertical"
		{...props}
	>
		<SliderPrimitive.Track
			className={cx("relative h-full w-full grow overflow-hidden", {
				"bg-gray": !flip,
				"bg-light-gray": flip
			})}
		>
			<SliderPrimitive.Range
				className={cx("absolute w-full", {
					"bg-gray": flip,
					"bg-light-gray": !flip
				})}
			/>
		</SliderPrimitive.Track>

		<SliderPrimitive.Thumb className="flex w-full max-w-full disabled:pointer-events-none outline-none disabled:opacity-50">
			<span
				className={cx("h-1 bg-light shadow-md transition-colors")}
				style={{ width: 999 }}
			/>
		</SliderPrimitive.Thumb>
	</SliderPrimitive.Root>
))

Slider.displayName = SliderPrimitive.Root.displayName

export default Slider;
