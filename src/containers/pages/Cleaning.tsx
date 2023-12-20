import { useGetStatesQuery } from "services/states/api";
import { useSelector } from "react-redux";
import { IEntity } from "types";
import { getBaseURI } from "lib/config";
import FolderContainer from "components/FolderContainer";
import FoldersContainer from "components/FoldersContainer";

const Cleaning = () => {
	const { data: entities }: { data: [IEntity] } = useGetStatesQuery();
	const vacuums: [IVacuum] = useSelector((state) => state.settings.vacuums);

	console.log('vacuums', vacuums);

	const test = entities?.filter((entity) => {
		return entity.entity_id.indexOf('goran') > -1;
	});

	const camera = entities?.find((entity) => {
		return entity.entity_id == 'camera.goran_map'
	});

	return (
		<FoldersContainer>
			{vacuums?.map((vacuum) => {
				return (
					<FolderContainer title={vacuum.title}>
					</FolderContainer>
				);
			})}
		</FoldersContainer>
	);

};

export default Cleaning;