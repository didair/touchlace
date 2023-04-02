import cx from 'classnames';
import { useState } from 'react';
import { IconsList } from 'constants/icons';
import useEntityIcon from 'lib/useEntityIcon';
import Modal from 'components/Modal';
import Icon from 'components/Icon';

const IconSelect = (props) => {
	const [open, setOpen] = useState(false);
	const icon_name = useEntityIcon(props.entity);

	const onIconSelect = (icon) => {
		props.onSelect(icon.name);
	};

	return (
		<div className="form-element mb-4 last-of-type:mb-0">
			<Modal open={open} onClose={() => setOpen(false)}>
				<div className="flex flex-wrap gap-2">
					{IconsList.map((icon) => {
						return (
							<div
								key={icon.name}
								title={icon.name}
								onClick={() => onIconSelect(icon)}
								className={cx(
									'inline-flex',
									'items-center',
									'justify-center',
									'w-[12.5%]',
									'aspect-square',
									'border',
									'bg-gray/10',
									'rounded-md',
									'cursor-pointer',
									'text-xl',
									{
										'border-gray/40': icon.name != props.value,
										'border-blue/80': icon.name == props.value,
										'text-blue/90': icon.name == props.value,
									}
								)}
							>
								<Icon name={icon.preview} />
							</div>
						);
					})}
				</div>
			</Modal>

			<label className="font-bold mb-2 flex items-center">
				Entity icon

				<span className="ml-2 cursor-pointer" onClick={() => setOpen(true)}>
					<Icon name="pen" />
				</span>
			</label>

			<div className="inline-flex items-center justify-center w-[12.5%] aspect-square border border-gray/40 bg-gray/10 rounded-md text-xl">
				<Icon name={icon_name} />
			</div>
		</div>
	);

};

IconSelect.defaultProps = {
	onSelect: () => null,
};

export default IconSelect;