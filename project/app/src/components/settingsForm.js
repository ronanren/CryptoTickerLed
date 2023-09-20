import React, { useState } from "react";
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	VStack,
	Slider,
	SliderTrack,
	SliderFilledTrack,
	SliderThumb
} from "@chakra-ui/react";

const SettingsForm = ({ onUpdateSettings, settingsData }) => {
	const settingsNull = { brightness: 0 };
	const [settings, setSettings] = useState(settingsNull);
	const [brightness, setBrightness] = useState(settingsData.brightness);

	const handleUpdateSettings = () => {
		onUpdateSettings(settings);
	};

	const handleBrightnessChange = (val) => {
		setBrightness(val);
		setSettings({ ...settings, brightness: val });
	}

	return (
		<Box>
			<VStack spacing={1}>
				<FormControl>
					<FormLabel>Brightness {brightness}%</FormLabel>
					<Slider defaultValue={brightness} min={0} max={100} step={5} onChange={(val) => handleBrightnessChange(val)}>
						<SliderTrack bg='red.100'>
							<Box position='relative' right={10} />
							<SliderFilledTrack bg='#3182ce' />
						</SliderTrack>
						<SliderThumb boxSize={6} />
					</Slider>
				</FormControl>
				<Button colorScheme='blue' onClick={handleUpdateSettings} mt={2}>
					Update settings
				</Button>
			</VStack>
		</Box>
	);
};

export default SettingsForm;
