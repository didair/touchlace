import Button from 'components/Inputs/Button';
import EntitiesSelect from 'components/Inputs/EntitiesSelect';
import { Form, Field } from 'react-final-form';

const TopBarForm = (props) => {
	return (
		<Form
			onSubmit={props.onSubmit}
			initialValues={props.initialValues}
			render={({handleSubmit}) => (
				<form onSubmit={handleSubmit}>
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

TopBarForm.defaultProps = {
	onSubmit: () => new Promise((r) => r(1)),
};

export default TopBarForm;