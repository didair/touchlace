import { useSelector, useDispatch } from "react-redux";
import { setEntitySettings } from "services/entities/slice";
import Input from 'components/Inputs/Input';
import IconSelect from "components/Inputs/IconSelect";

const EntitySettings = ({ entity }) => {
	const dispatch = useDispatch();
	const setSettings = (value) => dispatch(setEntitySettings(value));
	const entitySettings = useSelector((state) => {
		return state.entities.entities.find((_ent) => _ent.entity_id == entity.entity_id)
	});

	const updateName = (event) => {
		setSettings({
			...entitySettings,
			entity_id: entity.entity_id,
			name: event.target.value,
		});
	};

	const updateNote = (event) => {
		setSettings({
			...entitySettings,
			entity_id: entity.entity_id,
			note: event.target.value,
		});
	};

	const updateIcon = (icon) => {
		setSettings({
			...entitySettings,
			entity_id: entity.entity_id,
			icon,
		});
	};

	return (
		<div className="mt-4">
			<label htmlFor="name" className="block mb-2">Entity name</label>

			<Input
				id="name"
				value={entitySettings?.name ?? ''}
				placeholder="Light"
				onChange={updateName}
			/>

			<label htmlFor="note" className="block mb-2">Entity note</label>

			<Input
				id="note"
				value={entitySettings?.note ?? ''}
				placeholder="Hallway"
				onChange={updateNote}
			/>

			<IconSelect
				onSelect={updateIcon}
				entity={entity}
				value={entitySettings?.icon ?? null}
			/>

			<label className="block mt-4 mb-2">Entity ID</label>
			<code className="block p-2 border border-gray/40 bg-gray/10 rounded-md">
				{entity.entity_id}
			</code>
		</div>
	);
};

export default EntitySettings;