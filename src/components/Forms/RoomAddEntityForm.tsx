import { IEntity } from 'types';

import { useDispatch } from 'react-redux';
import { Fragment, useMemo, useState } from 'react';
import { useGetStatesQuery } from 'services/states/api';
import { getEntityRoom, getEntityType } from 'lib/entity';
import { addVacuum } from 'services/settings/slice';
import { capitalize } from 'lib/text';
import useVacuumEntityMap from 'lib/useVacuumEntityMap';

import Button from 'components/Inputs/Button';
import Icon from 'components/Icon';
import Input from 'components/Inputs/Input';
import EntitySettingsForm from './EntitySettingsForm';
import VacuumForm from './VacuumForm';

const RoomAddEntityForm = (props) => {
	const dispatch = useDispatch();
	const { data: entities } = useGetStatesQuery();
	const [selectedEntity, setSelectedEntity] = useState(null);
	const [filter, setFilter] = useState('');
	const [showSubmit, setShowSubmit] = useState(false);
	const [mapVacuumEntities] = useVacuumEntityMap();

	const types_map = useMemo(() => {
		if (props.type == null) return null;

		if (props.type == 'light') {
			return ['light', 'switch'];
		}

		if (props.type == 'media_player') {
			return ['media_player'];
		}

		if (props.type == 'sensor') {
			return ['sensor', 'binary_sensor'];
		}

		if (props.type == 'cover') {
			return ['cover'];
		}

		if (props.type == 'vacuum') {
			return ['vacuum'];
		}
	}, [props.type]);

	const onSubmit = (values) => {
		if (typeof props.onSubmit == 'function') {
			props.onSubmit({
				entity: selectedEntity,
				...values,
			});
		}
	};

	const selectEntity = (entity) => {
		if (props.type != 'vacuum') {
			setShowSubmit(true);
		}

		setSelectedEntity(entity);
	};

	const onVacuumSubmit = (values) => new Promise((resolve) => {
		dispatch(addVacuum(values));

		if (typeof props.onSubmit == 'function' && values.room != '') {
			props.onSubmit({
				entity: selectedEntity,
				...values,
			});
		}

		resolve(1);
	});

	const step1 = () => {
		return (
			<>
				<Input
					value={filter}
					onChange={(e) => setFilter(e.target.value.toLowerCase())}
					placeholder="light.bulb"
					label="Filter"
				/>

				<div className="bg-gray/10 border border-gray/40 rounded-md px-2">
					{entities.map((entity: IEntity) => {
						const entity_type = getEntityType(entity);
						if (types_map.indexOf(entity_type) == -1) return null;
						const entity_room = getEntityRoom(entity.entity_id);
						if (entity_room != null) return null;

						if (filter != '') {
							if (entity.entity_id.indexOf(filter) == -1) {
								return null;
							}
						}

						return (
							<div
								key={entity.entity_id}
								className="flex items-center justify-between py-2 border-b border-b-gray/40 last-of-type:border-b-0 cursor-pointer"
								onClick={() => selectEntity(entity)}
							>
								<div className="truncate">
									<div className="text-sm">
										{capitalize(entity_type) + ' • '}
										{entity.attributes.friendly_name}
									</div>

									{entity.entity_id}
								</div>

								<div>
									<Icon name="arrow-right" />
								</div>
							</div>
						);
					})}
				</div>
			</>
		);
	};

	const step2 = () => {
		if (props.type == 'vacuum') {
			const entitiesMap = mapVacuumEntities(selectedEntity);

			return (
				<div>
					<VacuumForm initialValues={entitiesMap} onSubmit={onVacuumSubmit} />
				</div>
			);
		}

		return (
			<div>
				<EntitySettingsForm entity={selectedEntity} hideRoomInput />
			</div>
		);
	};

	if (types_map == null || entities == null) {
		return null;
	}

	return (
		<Fragment>
			{selectedEntity == null ?
				step1()
				: null}

			{selectedEntity != null ?
				step2()
				: null}

			{showSubmit ?
				<Button type="submit" className="mt-4">
					Save
				</Button>
				: null}
		</Fragment>
	);

};

export default RoomAddEntityForm;
