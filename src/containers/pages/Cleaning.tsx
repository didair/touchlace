import { useGetStatesQuery } from "services/states/api";
import { useSelector } from "react-redux";
import { IVacuum, IEntity } from "types";

import FoldersContainer from "components/FoldersContainer";
import FolderContainer from "components/FolderContainer";

const Cleaning = () => {
	const { data: entities }: { data: [IEntity] } = useGetStatesQuery();
	const vacuums: [IVacuum] = useSelector((state) => state.settings.vacuums);

	console.log('vacuums', vacuums);

	return (
		<FoldersContainer>
			{vacuums?.map((vacuum) => {
				console.log('vacuum', vacuum);
				return (
					<FolderContainer title={vacuum.name} key={vacuum.id}>
					</FolderContainer>
				);
			})}
		</FoldersContainer>
	);

};

export default Cleaning;