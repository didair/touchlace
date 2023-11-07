import { useState } from 'react';
import { IEntity, IEntitySettings } from 'types';
import { useDispatch, useSelector } from 'react-redux';
import { favoriteEntity } from 'services/settings/slice';
import useEntityIcon from 'lib/useEntityIcon';
import cx from 'classnames';

import Card from 'components/Card';
import Modal from 'components/Modal';
import Icon from 'components/Icon';
import EntitySettings from 'components/Forms/EntitySettingsForm';

const EntityBinarySensor = ({
	entity,
	settings
}: {
	entity: IEntity,
	settings: IEntitySettings,
}) => {
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const [showSettings, setShowSettings] = useState(false);
	const isFavorited = useSelector((state) => state.settings.favorites?.includes(entity.entity_id));
	const icon_name = useEntityIcon(entity);
	const name = settings != null && settings.name != null && settings.name != '' ?
		settings.name
	: entity.attributes.friendly_name;
	let value = entity.state === 'on' ? 'Open' : 'Closed';

	const toggleFavorite = () => {
		dispatch(favoriteEntity(entity.entity_id));
	};

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

					<span
						className={cx("ml-4 text-xl", { 'text-bright-green': isFavorited })}
						onClick={toggleFavorite}
					>
						<Icon name="star" />
					</span>
				</div>

				{showSettings ?
					<EntitySettings entity={entity} />
				: null}
			</Modal>

			<Card
				onLongPress={() => setOpen(true)}
				state={entity.state === 'on' ? 'light' : 'dark'}
				type="sensor"
				backgroundImage={settings?.backgroundUrl}
			>
				<div className="text-sm">
					{settings != null && settings.note != '' ?
						<div>
							{settings.note}
						</div>
					: null}

					<div className="font-semibold text-base truncate text-ellipsis">
						{name}
					</div>

					<div>
						{value}
					</div>
				</div>

				<div className="flex justify-between">
					<div className={cx(
						"flex",
						"items-center",
						"text-2xl text-light",
					)}>
						<Icon name={icon_name} />
					</div>
				</div>
			</Card>
		</>
	);
};

export default EntityBinarySensor;