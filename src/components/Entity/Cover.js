import { useState } from 'react';
import cx from 'classnames';
import { lerp } from 'lib/numbers';
import { capitalize } from 'lib/text';

import Card from 'components/Card';
import Modal from 'components/Modal';
import RangeSlider from 'components/Inputs/RangeSlider';
import Icon from 'components/Icon';

const EntityCover = ({ entity, callService }) => {
	const [open, setOpen] = useState(false);

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

	return (
		<>
			<Modal open={open} onClose={() => setOpen(false)}>
				<div className="flex items-center justify-center flex-col">
					<h3 className="text-2xl">{entity.attributes.friendly_name}</h3>

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

					<code className="p-2 ml-4 border border-gray/40 bg-gray/10 rounded-md">
						{entity.entity_id}
					</code>
				</div>
			</Modal>

			<Card
				onLongPress={() => setOpen(true)}
				onClick={toggleUpDown}
				state={entity.state == 'closed' ? 'light' : 'dark'}
				type="light"
			>
				<div className="flex justify-between">
					<div className={cx(
						"h-11",
						"flex",
						"items-center",
						"text-3xl",
						{ 'text-gray': entity.state == 'open' }
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

					<div className={cx(
						'transition-opacity',
						'duration-300',
						'ease-in-out',
						'flex',
						'items-center',
						'justify-center',
						'w-11 h-11',
						'relative',
					)}>
						<svg viewBox="0 0 100 100" className="absolute">
							<path
								className={cx({
									'stroke-light/20': entity.state == 'open',
									'stroke-light-gray': entity.state != 'open',
								})}
								d="M 50,50 m 0,-47 a 47,47 0 1 1 0,94 a 47,47 0 1 1 0,-94"
								strokeWidth="6"
								fillOpacity="0"
							/>
							<path
								className="transition-all duration-200 ease-in-out stroke-light-gray/20"
								d="M 50,50 m 0,-47 a 47,47 0 1 1 0,94 a 47,47 0 1 1 0,-94"
								strokeWidth="6"
								fillOpacity="0"
								style={{
									strokeDasharray: "295.416, 295.416",
									strokeDashoffset: entity.attributes.current_position != null ?
										295 - lerp(0, 295, (entity.attributes.current_position / 100)) : 295,
								}}
							/>
						</svg>

						<span className={cx("font-bold text-xs opacity-40",
						{
							'text-light-gray': entity.state == 'open',
							'text-dark': entity.state != 'open',
						}
						)}>
							{entity.attributes.current_position != null ?
								entity.attributes.current_position + '%'
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

export default EntityCover;