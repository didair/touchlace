import Button from 'components/Inputs/Button';
import Input from 'components/Inputs/Input';
import Select from 'components/Inputs/Select';
import { useSelector } from 'react-redux';
import { getEntityType } from 'lib/entity';
import { Form, Field } from 'react-final-form';
import { useGetStatesQuery } from 'services/states/api';

const VacuumForm = ({
	onSubmit = () => new Promise((r) => r(1)),
	initialValues = null,
}) => {
	const { data: entities } = useGetStatesQuery();
	const rooms = useSelector((state) => state.rooms.list);

	return (
		<Form
			onSubmit={onSubmit}
			initialValues={initialValues}
			render={({handleSubmit}) => (
				<form onSubmit={handleSubmit}>
					<Field
						name="name"
						component={Input}
						label="Name"
						placeholder="Downstairs Vacuum"
					/>
					
					<Field
						name="room"
						component={Select}
						label="Room"
					>
						{rooms.map((room) => {
							return <option key={room.id} value={room.id}>
								{room.name}
							</option>
						})}
					</Field>

					<Button type="submit">
						Save
					</Button>
				</form>
			)}
		/>
	);

};

export default VacuumForm;