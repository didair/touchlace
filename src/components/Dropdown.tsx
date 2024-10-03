import * as React from "react";
import cx from 'classnames';
import {
	useFloating,
	autoUpdate,
	offset,
	flip,
	shift,
	useClick,
	useDismiss,
	useRole,
	useInteractions,
	Placement,
	FloatingPortal,
	FloatingFocusManager,
	arrow,
	FloatingArrow
} from "@floating-ui/react";
import { IconNames } from "constants/icons";
import Icon from "./Icon";

export interface IDropdownItem {
	label: string,
	icon?: IconNames,
	onClick: Function,
};

interface PopoverOptions {
	initialOpen?: boolean;
	placement?: Placement;
	modal?: boolean;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
};

function usePopover({
	initialOpen = false,
	placement = "bottom",
	modal,
	open: controlledOpen,
	onOpenChange: setControlledOpen
}: PopoverOptions = {}) {
	const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen);
	const [labelId, setLabelId] = React.useState<string | undefined>();
	const arrowRef = React.useRef(null);
	const [descriptionId, setDescriptionId] = React.useState<
		string | undefined
	>();

	const open = controlledOpen ?? uncontrolledOpen;
	const setOpen = setControlledOpen ?? setUncontrolledOpen;

	const data = useFloating({
		placement,
		open,
		onOpenChange: setOpen,
		whileElementsMounted: autoUpdate,
		middleware: [
			offset(12),
			flip({
				crossAxis: placement.includes("-"),
				fallbackAxisSideDirection: "end",
				padding: 5
			}),
			shift({ padding: 5 }),
			arrow({
				element: arrowRef,
			}),
		]
	});

	const context = data.context;

	const click = useClick(context, {
		enabled: controlledOpen == null
	});
	const dismiss = useDismiss(context);
	const role = useRole(context);

	const interactions = useInteractions([click, dismiss, role]);

	return React.useMemo(() => ({
		open,
		setOpen,
		...interactions,
		...data,
		labelId,
		descriptionId,
		setLabelId,
		setDescriptionId,
		arrowRef,
	}),
	[open, setOpen, interactions, data, labelId, descriptionId, arrowRef]);
};

export function Dropdown({
	children,
	items = [],
}: {
	children: React.ReactNode;
	items: IDropdownItem[];
} & PopoverOptions) {
	// This can accept any props as options, e.g. `placement`,
	// or other positioning options.
	const popover = usePopover();

	const onChildClick = (item: IDropdownItem) => {
		if (typeof item.onClick === 'function') {
			item.onClick();
			popover.setOpen(false);
		}
	};

	return (
		<>
			<div>
				<div
					ref={popover.refs.setReference}
					onClick={() => popover.setOpen(!popover.open)}
				>
					{children}
				</div>

				{popover.open ?
					<FloatingPortal>
						<FloatingFocusManager context={popover.context}>
							<div
								ref={popover.refs.setFloating}
								style={{ ...popover.floatingStyles }}
								aria-labelledby={popover.labelId}
								aria-describedby={popover.descriptionId}
								{...popover.getFloatingProps()}
								className={cx(
									'outline-none bg-gray/40 rounded-md text-off-white'
								)}
							>
								{items.map((item, index) => {
									return (
										<div
											key={index}
											onClick={() => onChildClick(item)}
											className={cx(
												'flex items-center',
												'cursor-pointer',
												'py-2 px-4',
												'border-b border-b-gray last-of-type:border-b-0',
												'hover:bg-gray/50',
												'first-of-type:rounded-t-md last-of-type:rounded-b-md',
											)}
										>
											{item.icon != null ?
												<Icon name={item.icon} className="mr-2" />
											: null}

											{item.label}
										</div>
									);
								})}

								<FloatingArrow ref={popover.arrowRef} context={popover.context} className="fill-gray/40" />
							</div>
						</FloatingFocusManager>
					</FloatingPortal>
				: null}
			</div>
		</>
	);
}

export default Dropdown;