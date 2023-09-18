import React from 'react';
import { Button, Flex, Text } from '@chakra-ui/react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const DisplayItem = ({ data, index, length, onMoveUp, onMoveDown, onDelete }) => {
	const { type, symbol, name, interval } = data;

	return (
		<Flex
			justifyContent="space-between"
			alignItems="center"
			p={3}
			border="1px solid #ccc"
			borderRadius="md"
			mb={3}
			width={380}
		>
			<Flex flexDirection="column" alignItems="flex-start" mx={8}>
				<Flex flexDirection="row">
					<Text fontWeight="bold">
						Type:&nbsp;
					</Text>
					<Text>{type}</Text>
				</Flex>

				<Flex flexDirection="row">
					<Text fontWeight="bold">
						Name:&nbsp;
					</Text>
					<Text>{name}</Text>
				</Flex>

				<Flex flexDirection="row">
					<Text fontWeight="bold">
						Symbol:&nbsp;
					</Text>
					<Text>{symbol}</Text>
				</Flex>

				<Flex flexDirection="row">
					<Text fontWeight="bold">
						Interval:&nbsp;
					</Text>
					<Text>{interval}s</Text>
				</Flex>
			</Flex>

			<Flex flexDirection="column" mx={4}>
				<Button
					onClick={() => onMoveUp(index)}
					isDisabled={index === 0}
					leftIcon={<FaArrowUp />}
					variant="outline"
					size="sm"
					my={1}
				>
					Move Up
				</Button>
				<Button
					onClick={() => onMoveDown(index)}
					isDisabled={index === length - 1}
					leftIcon={<FaArrowDown />}
					variant="outline"
					size="sm"
					my={1}
				>
					Move Down
				</Button>
				<Button
					onClick={() => onDelete(index)}
					colorScheme="red"
					variant="outline"
					size="sm"
					my={1}
				>
					Delete
				</Button>
			</Flex>
		</Flex>
	);
};

export default DisplayItem;
