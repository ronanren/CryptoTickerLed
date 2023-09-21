import React, { useState } from "react";
import {
	Button,
	FormControl,
	FormLabel,
	Flex,
	Select,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
} from "@chakra-ui/react";
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

const DisplayForm = ({ onAddDisplay, coins }) => {
	const displayNull = { type: "crypto", id: "", symbol: "", name: "", interval: 10, granularity: "1h" };
	const [display, setDisplay] = useState(displayNull);

	const handleAddDisplay = () => {
		onAddDisplay(display);
	};

	const formatResult = (item) => {
		return (
			<span style={{ display: 'block', textAlign: 'left' }}>{item.name} (<span style={{ textTransform: "uppercase" }}>{item.symbol}</span>)</span>
		)
	}

	const handleOnSelect = (item) => {
		setDisplay({ ...display, id: item.id, symbol: item.symbol.toUpperCase(), name: item.name });
	}

	const handleOnClear = () => {
		setDisplay({ ...display, id: "", symbol: "", name: "" });
	}

	return (
		<Flex flexDirection="column" alignItems="center" justifyContent="center">
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
				<>
					<FormControl>
						<FormLabel>Crypto</FormLabel>
						<div style={{ width: "90vw", maxWidth: "400px" }}>
							<ReactSearchAutocomplete
								items={coins}
								autoFocus
								formatResult={formatResult}
								placeholder="Search Crypto"
								maxResults={10}
								onSelect={handleOnSelect}
								onClear={handleOnClear}
								styling={{
									zIndex: 1,
									border: '1px solid #E2E8F0',
									borderRadius: '0.375rem',
									boxShadow: 'none',
								}}
							/>
						</div>
					</FormControl>
					<FormControl>
						<FormLabel>Granularity</FormLabel>
						<Select
							value={display.granularity}
							onChange={(e) => setDisplay({ ...display, granularity: e.target.value })}
						>
							<option value="5m">5 minutes</option>
							<option value="1h">1 hour</option>
						</Select>
					</FormControl>
					<FormControl>
						<FormLabel>Interval</FormLabel>
						<NumberInput
							defaultValue={display.interval}
							value={display.interval}
							min={10}
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
			<Button colorScheme='blue' onClick={handleAddDisplay} mt={5} isDisabled={display.id === "" || display.interval < 10 || isNaN(display.interval)}>
				Add Display
			</Button>
		</Flex>
	);
};

export default DisplayForm;
