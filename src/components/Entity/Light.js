import { useState } from 'react';
import cx from 'classnames';
import { lerp } from 'lib/numbers';
import { capitalize } from 'lib/text';
import useEntityIcon from 'lib/useEntityIcon';

import Card from 'components/Card';
import Modal from 'components/Modal';
import RangeSlider from 'components/Inputs/RangeSlider';
import Icon from 'components/Icon';
import EntitySettings from 'components/Forms/EntitySettingsForm';

const EntityLight = ({ entity, settings, updateState }) => {
	const [open, setOpen] = useState(false);
	const [showSettings, setShowSettings] = useState(false);
	const icon_name = useEntityIcon(entity);

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

	return (
		<>
			<Modal open={open} onClose={() => { setOpen(false); setShowSettings(false)}}>
				<div className="flex items-center justify-center flex-col">
					<h3 className="text-2xl">{entity.attributes.friendly_name}</h3>

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
			>
				<div className="flex justify-between">
					<div className={cx(
						"h-11",
						"flex",
						"items-center",
						"text-3xl",
						{ 'text-gray': entity.state != 'on' }
					)}>
						<Icon name={icon_name} />
					</div>

					<div className={cx(
						'transition-opacity',
						'duration-300',
						'ease-in-out',
						'flex',
						'items-center',
						'justify-center',
						'w-11 h-11',
						'relative',
						{
							'opacity-0': entity.attributes.brightness == null,
							'opacity-100': entity.attributes.brightness != null,
						}
					)}>
						<svg viewBox="0 0 100 100" className="absolute">
							<path
								className={cx({
									'stroke-light/20': entity.attributes.brightness == null,
									'stroke-light-gray': entity.attributes.brightness != null,
								})}
								d="M 50,50 m 0,-47 a 47,47 0 1 1 0,94 a 47,47 0 1 1 0,-94"
								strokeWidth="6"
								fillOpacity="0"
							/>
							<path
								className="transition-all duration-200 ease-in-out stroke-blue"
								d="M 50,50 m 0,-47 a 47,47 0 1 1 0,94 a 47,47 0 1 1 0,-94"
								strokeWidth="6"
								fillOpacity="0"
								style={{
									strokeDasharray: "295.416, 295.416",
									strokeDashoffset: entity.attributes.brightness != null ?
										295 - lerp(0, 295, (entity.attributes.brightness / 255)) : 295,
								}}
							/>
						</svg>

						<span className="font-bold text-xs opacity-40">
							{entity.attributes.brightness != null ?
								Math.round((entity.attributes.brightness / 255) * 100) + '%'
								: null}
						</span>
					</div>
				</div>

				<div>
					{settings != null && settings.note != '' ?
						<div className="font-semibold text-sm">
							{settings.note}
						</div>
					: null}

					<div className="font-semibold truncate text-ellipsis h-6">
						{entity.attributes.friendly_name}
					</div>

					<div className="font-semibold">
						{capitalize(entity.state)}
					</div>
				</div>
			</Card>
		</>
	);

};

export default EntityLight;