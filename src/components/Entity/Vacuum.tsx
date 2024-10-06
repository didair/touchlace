import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IEntity, IEntitySettings } from 'types';
import { capitalize } from 'lib/text';
import cx from 'classnames';

import { useCallEntityServiceMutation } from 'services/states/api';
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
	const [callService] = useCallEntityServiceMutation();
	const [open, setOpen] = useState(false);
	const [delay, setDelay] = useState(null);
	const [mapPicture, setMapPicture] = useState(null);
	const [showSettings, setShowSettings] = useState(false);
	const isFavorited = useSelector((state) => state.settings.favorites?.includes(entity.entity_id));

	const startVacuum = () => {
		callService({
			entity_id: entity.entity_id,
			domain: 'vacuum',
			service: 'start',
		});
	};

	const returnVacuum = () => {
		callService({
			entity_id: entity.entity_id,
			domain: 'vacuum',
			service: 'return_to_base',
		});
	};

	const startRoomCleaning = (roomId) => {
		callService({
			entity_id: entity.entity_id,
			domain: 'vacuum',
			service: 'vacuum.send_command',
			fields: {
				command: 'app_segment_clean',
				segments: [roomId],
				repeat: 1,
			},
		});
	};

	const toggleFavorite = () => {
		dispatch(favoriteEntity(entity.entity_id));
	};

	// useInterval(() => {
	// 	if (mapEntity == null) {
	// 		setMapPicture(null);
	// 		return;
	// 	}

	// 	setMapPicture(getBaseURI() + mapEntity.attributes.entity_picture + '&_=' + Date.now());
	// }, delay);

	// const mapEntity: IEntity = useMemo(() => {
	// 	if (vacuum == null || vacuum.map == '') {
	// 		return null;
	// 	}

	// 	return entities.find((entity) => entity.entity_id == vacuum.map);
	// }, [vacuum]);

	const rooms = useMemo(() => {
		const map = entity.attributes.selected_map;
		return entity.attributes?.rooms?.[map] ?? null;
	}, [entity]);

	// useEffect(() => {
	// 	if (open) {
	// 		setMapPicture(getBaseURI() + mapEntity.attributes.entity_picture + '&_=' + Date.now());
	// 		setDelay(3000);
	// 	} else {
	// 		setDelay(null);
	// 	}
	// }, [open]);

	console.log('### vacuum entity', entity);

	return (
		<>
			<Modal open={open} onClose={() => { setOpen(false); setShowSettings(false)}} type="small">
				<div className="mb-8">
					<h3 className="text-2xl">
						{settings != null && settings.name != null && settings.name != '' ?
							settings.name
						: entity.attributes.friendly_name}
					</h3>
				</div>

				<div className="flex my-8 gap-x-6">
					{/* <div className="w-9/12">
						<div className="h-[60vh]">
							{mapPicture != null ?
								<img src={mapPicture} alt={vacuum.name + ' real time map'} className="h-full" />
							: null}
						</div>
					</div> */}

					<div className="w-full flex justify-start items-center flex-col">
						<div className={cx("bottom-3 w-1/2 flex items-center justify-center transition-all",
							{
								'text-light': entity.state == 'docked',
								'animate-vacuum-running': entity.state == 'cleaning' || entity.state == 'paused',
								'paused': entity.state == 'paused',
								'animate-vacuum-returning': entity.state == 'returning'
							}
						)}>
							<Icon name="vacuum" className="!w-full !h-32" />
						</div>

						<div className="my-4">
							{capitalize(entity.state + '')}
						</div>

						<div className="w-full flex gap-2">
							<div className="flex bg-green text-dark flex-col items-center flex-1 p-2 rounded-md cursor-pointer" onClick={startVacuum}>
								<div>
									<Icon name="broom" />
								</div>

								<div>
									Start cleaning
								</div>
							</div>

							<div className="flex bg-off-white text-dark flex-col items-center flex-1 p-2 rounded-md cursor-pointer" onClick={returnVacuum}>
								<div>
									<Icon name="RoutinesComingHome" />
								</div>

								<div>
									Return to dock
								</div>
							</div>
						</div>

						<div className="w-full mt-4">
							<strong>
								Clean room
							</strong>

							<div className="flex flex-col gap-1">
								{rooms?.map((room) => {
									return <div className="flex bg-off-white text-dark flex-col flex-1 p-2 rounded-md cursor-pointer" onClick={() => startRoomCleaning(room.id)}>
										{room.name}
									</div>
								})}
							</div>
						</div>
					</div>
				</div>

				<div className="flex items-center justify-center">
					{/* <span
						className={cx("ml-4 text-xl", { 'text-blue/90': showSettings })}
						onClick={() => setShowSettings(!showSettings)}
					>
						<Icon name="gear" />
					</span> */}

					<span
						className={cx("relative ml-4 text-xl", { 'text-bright-green': isFavorited })}
						onClick={toggleFavorite}
						style={{ top: '-2px' }}
					>
						<Icon name="star" />
					</span>
				</div>
			</Modal>

			<Card
				onClick={() => setOpen(true)}
				state={entity.state != 'docked' && entity.state != 'unavailable' ? 'light' : 'dark'}
				type="vacuum"
			>
				<div className={cx("absolute left-0 bottom-3 w-full h-1/2 flex items-center justify-center transition-all",
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
						{settings != null && settings.name != null && settings.name != '' ?
							settings.name
						: entity.attributes.friendly_name}
					</div>

					<div>
						{capitalize(entity.state + '')}
					</div>
				</div>
			</Card>
		</>
	);

};

export default EntityVacuum;