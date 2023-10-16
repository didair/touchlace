import { useEffect, useState } from 'react';
import { Entity as EntityInterface, EntitySettings as EntitySettingsInterface } from 'types';
import useEntityIcon from 'lib/useEntityIcon';
import cx from 'classnames';

import { useGetEntityStatisticsQuery } from 'services/states/api';

import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import Card from 'components/Card';
import Badge from "components/Badge";
import Modal from 'components/Modal';
import Icon from 'components/Icon';
import EntitySettings from 'components/Forms/EntitySettingsForm';

const EntitySensor = ({
	entity,
	settings
}: {
	entity: EntityInterface,
	settings: EntitySettingsInterface,
}) => {
	const [fetchStatistics, setFetchStatistics] = useState(false);
	const { data: statistics } = useGetEntityStatisticsQuery({
		entity_id: entity.entity_id,
	}, { skip: !fetchStatistics });

	const locale = window.navigator.userLanguage || window.navigator.language;
	const [open, setOpen] = useState(false);
	const [showSettings, setShowSettings] = useState(false);
	const icon_name = useEntityIcon(entity);
	const name = settings != null && settings.name != null && settings.name != '' ?
		settings.name
	: entity.attributes.friendly_name;
	let unit = null;
	let value = entity.state;
	if (entity.attributes.unit_of_measurement != null) {
		unit = entity.attributes.unit_of_measurement == '%' ?
			entity.attributes.unit_of_measurement
		: ' ' + entity.attributes.unit_of_measurement;
	}

	if (entity.attributes.device_class === 'timestamp') {
		value = new Date(entity.state).toLocaleTimeString(locale, {
			hour: '2-digit',
			minute:'2-digit',
		});
	}

	useEffect(() => {
		if (settings?.sensorType == 'temperature') {
			setFetchStatistics(true);
		}
	}, [entity, settings]);

	if (statistics != null) {
		console.log('done!', statistics);
	}

	return (
		<>
			<Modal open={open} onClose={() => { setOpen(false); setShowSettings(false)}}>
				<div className="flex items-center justify-center flex-col">
					<h3 className="text-2xl">
						{name}{' • ' + value}{unit}
					</h3>
				</div>

				<div className="flex items-center justify-center mt-8">
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
				state="dark"
				type="sensor"
				backgroundImage={settings?.backgroundUrl}
			>
				<div className="text-sm">
					{settings != null && settings.note != '' ?
						<div>
							{settings.note}
						</div>
					: null}

					<div className="text-sm truncate text-ellipsis flex items-center">
						<div className="text-base mr-1">
							<Icon name={icon_name} />
						</div>

						{name}
					</div>

					<div className="text-3xl font-semibold">
						{value}{unit}
					</div>
				</div>

				{statistics != null ?
					<div className="w-full h-1/2 absolute left-0 bottom-0 -z-10">
						<ResponsiveContainer>
							<AreaChart
								data={statistics.map((stat) => ({
									time: stat.start,
									uv: stat.mean,
								}))}
								margin={0}
							>
								<defs>
									<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
										<stop offset="5%" stopColor="#2e8ae6" stopOpacity={1}/>
										<stop offset="95%" stopColor="#2e8ae6" stopOpacity={0.3}/>
									</linearGradient>
								</defs>

								<Area type="monotone" dataKey="uv" stroke="#95c5f5" fill="url(#colorUv)" />
							</AreaChart>
						</ResponsiveContainer>
					</div>
				: null}
			</Card>
		</>
	);
};

export default EntitySensor;