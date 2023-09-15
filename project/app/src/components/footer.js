import { Box, Link, Text } from "@chakra-ui/react";

const Footer = () => {
	const githubProfileLink = "https://github.com/ronanren";

	return (
		<Box
			as="footer"
			py={4}
			textAlign="center"
		>
			<Text>
				Made with ❤️ by{" "}
				<Link href={githubProfileLink} isExternal color="teal.500">
					Ronanren
				</Link>
			</Text>
		</Box>
	);
};

export default Footer;
