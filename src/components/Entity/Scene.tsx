import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCallEntityServiceMutation } from "services/states/api";
import { IEntity, IEntitySettings } from 'types';
import useEntityIcon from 'lib/useEntityIcon';
import cx from 'classnames';

import { favoriteEntity } from 'services/settings/slice';

import Card from 'components/Card';
import Modal from 'components/Modal';
import Icon from 'components/Icon';
import EntitySettings from 'components/Forms/EntitySettingsForm';

const EntityScene = ({
	entity,
	settings,
}: {
	entity: IEntity,
	settings: IEntitySettings,
}) => {
	const dispatch = useDispatch();
	const [callService] = useCallEntityServiceMutation();
	const [open, setOpen] = useState(false);
	const [showSettings, setShowSettings] = useState(false);
	const icon_name = useEntityIcon(entity);
	const isFavorited = useSelector((state) => state.settings.favorites?.includes(entity.entity_id));
	// Activated in the past 60 seconds?
	const state = (new Date() - new Date(entity.state)) < 60 * 1000;

	const activateScene = () => {
		callService({
			entity_id: entity.entity_id,
			domain: 'scene',
			service: 'turn_on',
		});
	};

	const toggleFavorite = () => {
		dispatch(favoriteEntity(entity.entity_id));
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
				onClick={activateScene}
				state={state ? 'light' : 'dark'}
				type="switch"
				backgroundImage={settings?.backgroundUrl}
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
				</div>

				<div className="flex justify-between">
					<div className={cx(
						"flex",
						"items-center",
						"text-2xl",
						{ 'text-light': !state }
					)}>
						<Icon name={icon_name} />
					</div>
				</div>
			</Card>
		</>
	);

};

export default EntityScene;