import Button from 'components/Inputs/Button';
import Input from 'components/Inputs/Input';
import EntitiesSelect from 'components/Inputs/EntitiesSelect';
import { Form, Field } from 'react-final-form';

const GroupForm = ({
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
						label="Group name"
						placeholder="Ceiling Lights"
					/>

					<Field
						name="entities"
						component={EntitiesSelect}
						label="Entities"
						allowedTypes={['light', 'switch']}
					/>

					<Button type="submit">
						Save
					</Button>
				</form>
			)}
		/>
	);
};

export default GroupForm;