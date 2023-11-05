import Button from 'components/Inputs/Button';
import Input from 'components/Inputs/Input';
import { Form, Field } from 'react-final-form';

const RoomForm = ({
	onSubmit = () => new Promise((r) => r(1)),
	initialValues = null,
}) => {
	return (
		<Form
			onSubmit={onSubmit}
			initialValues={initialValues}
			render={({handleSubmit}) => (
				<form onSubmit={handleSubmit}>
					<Field
						name="name"
						component={Input}
						label="Room name"
						placeholder="Living room"
					/>

					<Button type="submit">
						Save
					</Button>
				</form>
			)}
		/>
	);
};

export default RoomForm;
