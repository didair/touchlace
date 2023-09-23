import Badge from "./Badge";

const Footer = () => {

	return (
		<div className="w-full h-16 border-t bg-gray/20 border-gray flex items-center px-8 backdrop-blur-sm">
			<Badge to="/settings" icon="gear">
				Settings
			</Badge>
		</div>
	);

}

export default Footer;
