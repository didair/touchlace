import { useState } from 'react';
import { Entity as EntityInterface, EntitySettings as EntitySettingsInterface } from 'types';
import { capitalize } from 'lib/text';
import useEntityIcon from 'lib/useEntityIcon';
import cx from 'classnames';

import { useUpdateEntityStateMutation } from 'services/states/api';

import Card from 'components/Card';
import Modal from 'components/Modal';
import Icon from 'components/Icon';
import EntitySettings from 'components/Forms/EntitySettingsForm';

const EntitySwitch = ({
	entity,
	settings,
}: {
	entity: EntityInterface,
	settings: EntitySettingsInterface,
}) => {
	const [updateState] = useUpdateEntityStateMutation();
	const [open, setOpen] = useState(false);
	const [showSettings, setShowSettings] = useState(false);
	const icon_name = useEntityIcon(entity);

	const toggleOnOff = () => {
		updateState({
			entity_id: entity.entity_id,
			domain: 'switch',
			state: entity.state == 'on' ? 'off' : 'on',
		});
	};

	return (
		<>
			<Modal open={open} onClose={() => { setOpen(false); setShowSettings(false)}}>
				<div className="mb-8">
					<h3 className="text-2xl">
						{settings != null && settings.name != null && settings.name != '' ?
							settings.name
						: entity.attributes.friendly_name}
					</h3>
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
					<EntitySettings entity={entity} />
				: null}
			</Modal>

			<Card
				onLongPress={() => setOpen(true)}
				onClick={toggleOnOff}
				state={entity.state == 'on' ? 'light' : 'dark'}
				type="switch"
			>
				<div className="text-sm">
					{settings != null && settings.note != '' ?
						<div>
							{settings.note}
						</div>
					: null}

					<div className="font-semibold text-base truncate text-ellipsis">
						{settings != null && settings.name != null && settings.name != '' ?
							settings.name
						: entity.attributes.friendly_name}
					</div>

					<div>
						{capitalize(entity.state)}
					</div>
				</div>

				<div className="flex justify-between">
					<div className={cx(
						"flex",
						"items-center",
						"text-2xl",
						{ 'text-gray': entity.state != 'on' }
					)}>
						<Icon name={icon_name} />
					</div>
				</div>
			</Card>
		</>
	);

};

export default EntitySwitch;