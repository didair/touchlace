import { useState } from 'react';
import { useGetStatesQuery } from "services/states/api";
import Checkbox from 'components/Inputs/Checkbox';
import Modal from 'components/Modal';
import Icon from 'components/Icon';
import Input from './Input';

const EntitiesSelect = (props) => {
	const { data: entities } = useGetStatesQuery();
	const [open, setOpen] = useState(false);
	const [filter, setFilter] = useState('');
	const currentValue = typeof props.input.value == 'string' ? [] : props.input.value;
	const onToggleEntity = (entity) => {
		if (currentValue.indexOf(entity.entity_id) == -1) {
			props.input.onChange([...currentValue, entity.entity_id]);
		} else {
			props.input.onChange([
				...currentValue.filter((id) => id != entity.entity_id),
			]);
		}
	};

	return (
		<div className="form-element mb-4 last-of-type:mb-0">
			{entities != null ?
				<Modal open={open} onClose={() => setOpen(false)}>
					<Input
						value={filter}
						onChange={(e) => setFilter(e.target.value.toLowerCase())}
						placeholder="light.bulb"
						label="Filter"
					/>

					{entities.map((entity) => {
						const entity_type = entity.entity_id.split('.')[0];
						if (filter != '') {
							if (entity.entity_id.indexOf(filter) == -1) {
								return null;
							}
						}

						return (
							<div key={entity.entity_id} className="block p-2 mb-2 last-of-type:mb-0 border border-gray/40 bg-gray/10 rounded-md">
								<Checkbox
									checked={currentValue.indexOf(entity.entity_id) > -1}
									onChange={() => onToggleEntity(entity)}
									label={(
										<div>
											<div className="text-sm">
												{entity_type + ' • '}
												{entity.attributes.friendly_name}
											</div>
											{entity.entity_id}
										</div>
									)}
								/>
							</div>
						);
					})}
				</Modal>
				: null}

			{props.label != null ?
				<label className="font-bold mb-2 flex items-center">
					{props.label}

					{entities != null ?
						<span className="ml-2 cursor-pointer" onClick={() => setOpen(true)}>
							<Icon name="pen" />
						</span>
						: null}
				</label>
				: null}

			<div>
				{currentValue.map((entity_id) => {
					return (
						<div key={entity_id} className="block p-2 mb-2 last-of-type:mb-0 border border-gray/40 bg-gray/10 rounded-md">
							{entity_id}
						</div>
					);
				})}
			</div>
		</div>
	);

};

export default EntitiesSelect;