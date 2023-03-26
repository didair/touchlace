import { useState } from 'react';
import { capitalize } from 'lib/text';
import cx from 'classnames';
import Card from 'components/Card';
import Modal from 'components/Modal';
import Icon from 'components/Icon';
import Input from 'components/Inputs/Input';

const EntitySwitch = ({ entity, settings, updateState, setSettings }) => {
	const [open, setOpen] = useState(false);
	const [showSettings, setShowSettings] = useState(false);

	const toggleOnOff = () => {
		updateState({
			entity_id: entity.entity_id,
			domain: 'switch',
			state: entity.state == 'on' ? 'off' : 'on',
		});
	};

	const updateNote = (event) => {
		setSettings({
			...settings,
			entity_id: entity.entity_id,
			note: event.target.value,
		});
	};

	return (
		<>
			<Modal open={open} onClose={() => setOpen(false)}>
				<div className="mb-8">
					<h3 className="text-2xl">{entity.attributes.friendly_name}</h3>
				</div>

				<div className="flex items-center justify-center">
					<input
						id="onOff"
						type="checkbox"
						checked={entity.state == 'on'}
						onChange={toggleOnOff}
					/>

					<label htmlFor="onOff" className="ml-2">{capitalize(entity.state)}</label>

					<span
						className={cx("ml-4 text-xl", { 'text-blue/90': showSettings })}
						onClick={() => setShowSettings(!showSettings)}
					>
						<Icon name="gear" />
					</span>
				</div>

				{showSettings ?
					<div className="mt-4">
						<label htmlFor="note" className="block mb-2">Entity note</label>

						<Input
							id="note"
							value={settings?.note ?? ''}
							placeholder="Hallway"
							onChange={updateNote}
						/>

						<label className="block mt-4 mb-2">Entity ID</label>
						<code className="block p-2 border border-gray/40 bg-gray/10 rounded-md">
							{entity.entity_id}
						</code>
					</div>
				: null}
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
					{settings != null && settings.note != '' ?
						<div className="font-semibold text-sm">
							{settings.note}
						</div>
					: null}

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