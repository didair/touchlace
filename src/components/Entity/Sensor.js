import { useState } from 'react';
import useEntityIcon from 'lib/useEntityIcon';
import cx from 'classnames';

import Badge from "components/Badge";
import Modal from 'components/Modal';
import Icon from 'components/Icon';
import EntitySettings from 'components/Forms/EntitySettingsForm';

const EntitySensor = ({ entity, settings }) => {
	const [open, setOpen] = useState(false);
	const [showSettings, setShowSettings] = useState(false);
	const icon_name = useEntityIcon(entity);
	const name = settings != null && settings.name != null && settings.name != '' ?
		settings.name
	: entity.attributes.friendly_name;
	let unit = null;
	let value = entity.state;
	if (entity.attributes.unit_of_measurement != null) {
		unit = entity.attributes.unit_of_measurement == '%' ?
			entity.attributes.unit_of_measurement
		: ' ' + entity.attributes.unit_of_measurement;
	}

	if (entity.attributes.device_class === 'timestamp') {
		value = new Date(entity.state).toLocaleTimeString({
			hour: '2-digit',
			minute:'2-digit'
		});
	}

	return (
		<>
			<Modal open={open} onClose={() => { setOpen(false); setShowSettings(false)}}>
				<div className="flex items-center justify-center flex-col">
					<h3 className="text-2xl">
						{name}{' • ' + value}{unit}
					</h3>
				</div>

				<div className="flex items-center justify-center mt-8">
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

			<Badge
				meta={name}
				onLongPress={() => setOpen(true)}
				icon={icon_name}
			>
				{value}{unit}
			</Badge>
		</>
	);
};

export default EntitySensor;