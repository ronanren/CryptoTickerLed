import React, { useState } from "react";
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	VStack,
	Select,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
} from "@chakra-ui/react";
import {
	AutoComplete,
	AutoCompleteInput,
	AutoCompleteItem,
	AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";

const DisplayForm = ({ onAddDisplay }) => {
	const displayNull = { type: "crypto", id: "", symbol: "", interval: 5 };
	const [display, setDisplay] = useState(displayNull);

	const handleAddDisplay = () => {
		onAddDisplay(display);
		setDisplay(displayNull);
	};

	return (
		<Box>
			<VStack spacing={1}>
				<FormControl>
					<FormLabel>Type</FormLabel>
					<Select
						value={display.type}
						onChange={(e) => setDisplay({ ...display, type: e.target.value })}
					>
						<option value="crypto">Crypto</option>
						<option value="weather">Weather</option>
						<option value="troll">Troll</option>
					</Select>
				</FormControl>
				{display.type === "crypto" && (
					<><FormControl>
						<FormLabel>ID</FormLabel>
						<Input
							type="text"
							placeholder="ID"
							value={display.id}
							onChange={(e) => setDisplay({ ...display, id: e.target.value })}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Symbol</FormLabel>
						<Input
							type="text"
							placeholder="Symbol"
							value={display.symbol}
							onChange={(e) => setDisplay({ ...display, symbol: e.target.value })}
						/>
					</FormControl>
					<AutoComplete openOnFocus>
					<AutoCompleteInput variant="filled" />
					<AutoCompleteList>
						{coins.map((coin, cid) => (
						<AutoCompleteItem
							key={`option-${cid}`}
							value={coin}
							textTransform="capitalize"
						>
							{coin}
						</AutoCompleteItem>
						))}
					</AutoCompleteList>
					</AutoComplete>
					<FormControl>
						<FormLabel>Interval</FormLabel>
						<NumberInput
							defaultValue={display.interval}
							value={display.interval}
							min={1}
							clampValueOnBlur={false}
							onChange={(e) => setDisplay({ ...display, interval: parseInt(e) })}
						>
							<NumberInputField />
							<NumberInputStepper >
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
					</FormControl></>)}
				<Button colorScheme="teal" onClick={handleAddDisplay} mt={2}>
					Add Display
				</Button>
			</VStack>
		</Box>
	);
};

export default DisplayForm;
