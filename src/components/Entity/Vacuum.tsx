import { IVacuum } from 'types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IEntity, IEntitySettings } from 'types';
import { capitalize } from 'lib/text';
import useEntityIcon from 'lib/useEntityIcon';
import cx from 'classnames';

import { useUpdateEntityStateMutation } from 'services/states/api';
import { favoriteEntity } from 'services/settings/slice';

import Card from 'components/Card';
import Modal from 'components/Modal';
import Icon from 'components/Icon';

const EntityVacuum = ({
	entity,
	settings,
}: {
	entity: IEntity,
	settings: IEntitySettings,
}) => {
	const dispatch = useDispatch();
	const [updateState] = useUpdateEntityStateMutation();
	const [open, setOpen] = useState(false);
	const [showSettings, setShowSettings] = useState(false);
	const icon_name = useEntityIcon(entity);
	const isFavorited = useSelector((state) => state.settings.favorites?.includes(entity.entity_id));
	const vacuum: IVacuum = useSelector((state) => state.settings.vacuums.find((vac) => vac.id == entity.entity_id));

	console.log('entity, vac', entity, vacuum);

	const toggleOnOff = () => {
		updateState({
			entity_id: entity.entity_id,
			domain: 'switch',
			state: entity.state == 'on' ? 'off' : 'on',
		});
	};

	const toggleFavorite = () => {
		dispatch(favoriteEntity(entity.entity_id));
	};

	return (
		<>
			<Modal open={open} onClose={() => { setOpen(false); setShowSettings(false)}} type="big">
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
				null
				: null}
			</Modal>

			<Card
				onClick={() => setOpen(true)}
				state={entity.state != 'docked' ? 'light' : 'dark'}
				type="vacuum"
			>
				<div className="text-sm">
					{settings != null && settings.note != '' ?
						<div>
							{settings.note}
						</div>
					: null}

					<div className="font-semibold text-base truncate text-ellipsis">
						{vacuum.name != null && vacuum.name != '' ?
							vacuum.name
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
						{ 'text-light': entity.state == 'docked' }
					)}>
						<Icon name={icon_name} />
					</div>
				</div>
			</Card>
		</>
	);

};

export default EntityVacuum;