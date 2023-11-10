import cx from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { favoriteEntity } from 'services/settings/slice';
import { Form, Field } from 'react-final-form';

import Icon from 'components/Icon';
import Button from 'components/Inputs/Button';
import Input from 'components/Inputs/Input';
import EntitiesSelect from 'components/Inputs/EntitiesSelect';

const GroupForm = ({
	onSubmit = () => new Promise((r) => r(1)),
	initialValues = null,
}) => {
	const dispatch = useDispatch();
	const isFavorited = useSelector((state) => state.settings.favorites?.includes(initialValues?.id));

	const toggleFavorite = () => {
		if (initialValues != null) {
			dispatch(favoriteEntity(initialValues.id));
		}
	};

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

					<div className="flex justify-between items-center">
						<Button type="submit">
							Save
						</Button>

						{initialValues != null && initialValues.id != null ?
							<span
								className={cx("text-xl", { 'text-bright-green': isFavorited })}
								onClick={toggleFavorite}
							>
								<Icon name="star" />
							</span>
						: null}
					</div>
				</form>
			)}
		/>
	);
};

export default GroupForm;