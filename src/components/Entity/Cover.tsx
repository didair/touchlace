import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IEntity, IEntitySettings } from 'types';
import cx from 'classnames';
import { capitalize } from 'lib/text';

import { useCallEntityServiceMutation } from 'services/states/api';
import { favoriteEntity } from 'services/settings/slice';

import Card from 'components/Card';
import Modal from 'components/Modal';
import RangeSlider from 'components/Inputs/RangeSlider';
import Icon from 'components/Icon';
import EntitySettings from 'components/Forms/EntitySettingsForm';

const EntityCover = ({
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
	const isFavorited = useSelector((state) => state.settings.favorites?.includes(entity.entity_id));

	const updatePosition = (event) => {
		callService({
			entity_id: entity.entity_id,
			domain: 'cover',
			service: 'set_cover_position',
			fields: {
				position: event.target.value,
			},
		});
	};

	const toggleUpDown = () => {
		callService({
			entity_id: entity.entity_id,
			domain: 'cover',
			service: 'set_cover_position',
			fields: {
				position: entity.attributes.current_position > 0 ? 0 : 100,
			},
		});
	};

	const toggleFavorite = () => {
		dispatch(favoriteEntity(entity.entity_id));
	};

	return (
		<>
			<Modal open={open} onClose={() => { setOpen(false); setShowSettings(false)}}>
				<div className="flex items-center justify-center flex-col">
					<h3 className="text-2xl">
						{settings != null && settings.name != null && settings.name != '' ?
							settings.name
						: entity.attributes.friendly_name}
					</h3>

					<div className="my-8">
						<RangeSlider
							min="1"
							max="100"
							onChange={updatePosition}
							value={entity.attributes.current_position}
						/>
					</div>
				</div>

				<div className="flex items-center justify-center">
					<input
						id="onOff"
						type="checkbox"
						checked={entity.state == 'closed'}
						onChange={toggleUpDown}
					/>

					<label htmlFor="onOff" className="ml-2">{capitalize(entity.state)}</label>

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
				onClick={toggleUpDown}
				state={entity.state == 'closed' ? 'light' : 'dark'}
				type="light"
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

					<div>
						{capitalize(entity.state)}
						{entity.attributes.current_position != null ?
							' • ' + entity.attributes.current_position + '%'
							: null}
					</div>
				</div>

				<div className="flex justify-between">
					<div className={cx(
						"flex",
						"items-center",
						"text-2xl",
						{ 'text-light': entity.state == 'open' }
					)}>
						<Icon
							name={'arrow-up'}
							className={cx(
								'duration-500',
								'transition-transform',
								{
									'rotate-180': entity.state != 'open',
								}
							)}
						/>
					</div>
				</div>
			</Card>
		</>
	);

};

export default EntityCover;