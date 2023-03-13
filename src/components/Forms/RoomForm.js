import Button from 'components/Inputs/Button';
import EntitiesSelect from 'components/Inputs/EntitiesSelect';
import Input from 'components/Inputs/Input';
import { Form, Field } from 'react-final-form';

const RoomForm = (props) => {
	return (
		<Form
			onSubmit={props.onSubmit}
			initialValues={props.initialValues}
			render={({handleSubmit}) => (
				<form onSubmit={handleSubmit}>
					<Field
						name="name"
						component={Input}
						label="Room name"
						placeholder="Living room"
					/>

					<Field
						name="entities"
						component={EntitiesSelect}
						label="Entities"
					/>

					<Button type="submit">
						Save
					</Button>
				</form>
			)}
		/>
	);
};

RoomForm.defaultProps = {
	onSubmit: () => new Promise((r) => r(1)),
};

export default RoomForm;