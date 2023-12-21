import { IVacuum } from 'types';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IEntity, IEntitySettings } from 'types';
import { capitalize } from 'lib/text';
import { getBaseURI } from 'lib/config';
import useInterval from 'lib/useInterval';
import cx from 'classnames';

import { useGetStatesQuery, useUpdateEntityStateMutation } from 'services/states/api';
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
	const { data: entities } = useGetStatesQuery();
	const [updateState] = useUpdateEntityStateMutation();
	const [open, setOpen] = useState(false);
	const [delay, setDelay] = useState(null);
	const [mapPicture, setMapPicture] = useState(null);
	const [showSettings, setShowSettings] = useState(false);
	const isFavorited = useSelector((state) => state.settings.favorites?.includes(entity.entity_id));
	const vacuum: IVacuum = useSelector((state) => state.settings.vacuums.find((vac) => vac.id == entity.entity_id));

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

	useInterval(() => {
		if (mapEntity == null) {
			setMapPicture(null);
			return;
		}

		setMapPicture(getBaseURI() + mapEntity.attributes.entity_picture + '&_=' + Date.now());
	}, delay);

	const mapEntity: IEntity = useMemo(() => {
		if (vacuum == null || vacuum.map == '') {
			return null;
		}

		return entities.find((entity) => entity.entity_id == vacuum.map);
	}, [vacuum]);

	useEffect(() => {
		if (open) {
			setMapPicture(getBaseURI() + mapEntity.attributes.entity_picture + '&_=' + Date.now());
			setDelay(3000);
		} else {
			setDelay(null);
		}
	}, [open]);

	return (
		<>
			<Modal open={open} onClose={() => { setOpen(false); setShowSettings(false)}} type="big">
				<div className="mb-8">
					<h3 className="text-2xl">
						{vacuum != null && vacuum.name != null && vacuum.name != '' ?
							vacuum.name
						: entity.attributes.friendly_name}
					</h3>
				</div>

				<div>
					{mapPicture != null ?
						<img src={mapPicture} alt={vacuum.name + ' real time map'} />
					: null}
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
				<div className={cx("absolute left-0 bottom-3 w-full h-28 flex items-center justify-center",
					{
						'text-light': entity.state == 'docked',
						'animate-vacuum-running': entity.state == 'cleaning' || entity.state == 'paused',
						'paused': entity.state == 'paused',
						'animate-vacuum-returning': entity.state == 'returning'
					}
				)}>
					<Icon name="vacuum" className="!w-full !h-full" />
				</div>

				<div className="text-sm z-10">
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
			</Card>
		</>
	);

};

export default EntityVacuum;