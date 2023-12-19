import Button from 'components/Inputs/Button';
import Input from 'components/Inputs/Input';
import { Form, Field } from 'react-final-form';

const VacuumForm = ({
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
						label="Name"
						placeholder="Downstairs Vacuum"
					/>

					<Button type="submit">
						Save
					</Button>
				</form>
			)}
		/>
	);

};

export default VacuumForm;