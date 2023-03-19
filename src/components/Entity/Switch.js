import { useState } from 'react';
import { capitalize } from 'lib/text';
import cx from 'classnames';
import Card from 'components/Card';
import Modal from 'components/Modal';
import Icon from 'components/Icon';

const EntitySwitch = ({ entity, updateState }) => {
	const [open, setOpen] = useState(false);

	const toggleOnOff = () => {
		updateState({
			entity_id: entity.entity_id,
			domain: 'switch',
			state: entity.state == 'on' ? 'off' : 'on',
		});
	};

	return (
		<>
			<Modal open={open} onClose={() => setOpen(false)}>
				<div className="mb-4">
					<h3 className="text-2xl mb-2">{entity.attributes.friendly_name}</h3>
					<code className="block p-2 border border-gray/40 bg-gray/10 rounded-md">
						{entity.entity_id}
					</code>
				</div>

				<div className="mb-4">
					<input
						id="onOff"
						type="checkbox"
						checked={entity.state == 'on'}
						onChange={toggleOnOff}
					/>
					<label htmlFor="onOff" className="ml-2">{capitalize(entity.state)}</label>
				</div>
			</Modal>

			<Card
				onLongPress={() => setOpen(true)}
				onClick={toggleOnOff}
				state={entity.state == 'on' ? 'light' : 'dark'}
				type="switch"
			>
				<div className="flex justify-between">
					<div className={cx(
						"h-11",
						"flex",
						"items-center",
						"text-3xl",
						{ 'text-gray': entity.state != 'on' }
					)}>
						<Icon name={entity.state == 'on' ? 'toggle-on' : 'toggle-off'} />
					</div>
				</div>

				<div>
					<div className="font-semibold truncate text-ellipsis h-6">
						{entity.attributes.friendly_name}
					</div>

					<div className="font-semibold">
						{capitalize(entity.state)}
					</div>
				</div>
			</Card>
		</>
	);

};

export default EntitySwitch;