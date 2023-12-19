import { useGetStatesQuery } from "services/states/api";
import { IEntity } from "types";
import { getBaseURI } from "lib/config";
import FolderContainer from "components/FolderContainer";
import FoldersContainer from "components/FoldersContainer";

const Cleaning = () => {
	const { data: entities }: { data: [IEntity] } = useGetStatesQuery();

	const test = entities?.filter((entity) => {
		return entity.entity_id.indexOf('goran_') > -1;
	});

	console.log('test', test);

	const camera = entities?.find((entity) => {
		return entity.entity_id == 'camera.goran_map'
	});

	return (
		<FoldersContainer>
			<FolderContainer title="Göran">
				{camera != null ?
					<img
						style={{ height: '100%' }}
						src={getBaseURI() + camera.attributes.entity_picture} />
				: null}
			</FolderContainer>
		</FoldersContainer>
	);

};

export default Cleaning;