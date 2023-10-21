import { IEntity, IEntitySettings } from 'types';

import { useState } from 'react';
import cx from 'classnames';
import { capitalize } from 'lib/text';
import useEntityIcon from 'lib/useEntityIcon';

import { useDispatch, useSelector } from 'react-redux';
import { favoriteEntity } from 'services/settings/slice';
import { useUpdateEntityStateMutation } from 'services/states/api';

import Card from 'components/Card';
import Modal from 'components/Modal';
import RangeSlider from 'components/Inputs/RangeSlider';
import Icon from 'components/Icon';
import EntitySettings from 'components/Forms/EntitySettingsForm';

const EntityLight = ({
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

	const updateBrightness = (event) => {
		updateState({
			entity_id: entity.entity_id,
			domain: 'light',
			state: 'on',
			fields: {
				brightness: event.target.value,
			}
		});
	};

	const toggleOnOff = () => {
		updateState({
			entity_id: entity.entity_id,
			domain: 'light',
			state: entity.state == 'on' ? 'off' : 'on',
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
							max="255"
							onChange={updateBrightness}
							value={entity.attributes.brightness}
						/>
					</div>
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
				onClick={toggleOnOff}
				state={entity.state == 'on' ? 'light' : 'dark'}
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

					<div className="">
						{capitalize(entity.state)}
						{entity.attributes.brightness != null && entity.state == 'on' ?
							' • ' + Math.round((entity.attributes.brightness / 255) * 100) + '%'
						: null}
					</div>
				</div>

				<div className="flex justify-between text-light">
					<div className={cx(
						"flex",
						"items-center",
						"text-2xl",
						{
							'text-dark': entity.state == 'on' && settings?.backgroundUrl == null,
						}
					)}>
						<Icon name={icon_name} />
					</div>
				</div>
			</Card>
		</>
	);

};

export default EntityLight;