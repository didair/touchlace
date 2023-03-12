import { useEffect, useState } from 'react';
import cx from 'classnames';
import { lerp } from 'lib/numbers';
import { capitalize } from 'lib/text';
import debounce from 'lib/debounce';

import Card from 'components/Card';
import Modal from 'components/Modal';

const EntityLight = ({ entity, updateState }) => {
	const [open, setOpen] = useState(false);
	const [brightness, setBrightness] = useState(0);

	const updateBrightness = debounce((event) => {
		updateState({
			entity_id: entity.entity_id,
			domain: 'light',
			state: 'on',
			fields: {
				brightness: event.target.value,
			}
		})
	}, 500);

	const toggleOnOff = () => {
		updateState({
			entity_id: entity.entity_id,
			domain: 'light',
			state: entity.state == 'on' ? 'off' : 'on',
		});
	};

	useEffect(() => {
		if (entity.attributes.brightness != null) {
			setBrightness(entity.attributes.brightness);
		} else {
			setBrightness(0);
		}
	}, [entity.attributes.brightness]);

	return (
		<>
			<Modal open={open} onClose={() => setOpen(false)} title={entity.attributes.friendly_name}>
				<div className="mb-4">
					<h3 className="text-2xl mb-2">{entity.attributes.friendly_name}</h3>
					<code className="block p-2 border border-gray/40 bg-gray/10 rounded-md">
						{entity.entity_id}
					</code>
				</div>

				<div className="mb-4">
					<input
						id="onOff"
						type="checkbox"
						checked={entity.state == 'on'}
						onChange={toggleOnOff}
					/>
					<label htmlFor="onOff" className="ml-2">{capitalize(entity.state)}</label>
				</div>

				<div>
					<input
						id="brightness"
						type="range"
						min="1"
						max="255"
						onChange={(e) => { updateBrightness(e); setBrightness(e.target.value) }}
						value={brightness}
						className="slider"
					/>

					<label htmlFor="brightness" className="ml-2">
						Brightness - {Math.round((brightness / 255) * 100) + '%'}
					</label>
				</div>
			</Modal>

			<Card
				onLongPress={() => setOpen(true)}
				onClick={toggleOnOff}
				state={entity.state == 'on' ? 'light' : 'dark'}
				type="light"
			>
				<div className="flex justify-between">
					<div className="flex items-center">
						Light
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
						<svg viewBox="0 0 100 100" className="absolute ">
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