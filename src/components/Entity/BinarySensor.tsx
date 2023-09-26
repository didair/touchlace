import { useState } from 'react';
import { Entity as EntityInterface, EntitySettings as EntitySettingsInterface } from 'types';
import useEntityIcon from 'lib/useEntityIcon';
import cx from 'classnames';

import Badge from "components/Badge";
import Modal from 'components/Modal';
import Icon from 'components/Icon';
import EntitySettings from 'components/Forms/EntitySettingsForm';

const EntityBinarySensor = ({
	entity,
	settings
}: {
	entity: EntityInterface,
	settings: EntitySettingsInterface,
}) => {
	const [open, setOpen] = useState(false);
	const [showSettings, setShowSettings] = useState(false);
	const icon_name = useEntityIcon(entity);
	const name = settings != null && settings.name != null && settings.name != '' ?
		settings.name
	: entity.attributes.friendly_name;
	let value = entity.state === 'on' ? 'Open' : 'Closed';

	return (
		<>
			<Modal open={open} onClose={() => { setOpen(false); setShowSettings(false)}}>
				<div className="flex items-center justify-center flex-col">
					<h3 className="text-2xl">
						{name}
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
				{value}
			</Badge>
		</>
	);
};

export default EntityBinarySensor;