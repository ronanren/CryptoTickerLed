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
	SliderThumb,
	Tooltip,
} from "@chakra-ui/react";

const SettingsForm = ({ onUpdateSettings, settingsData }) => {
	const settingsNull = { brightness: 0 };
	const [settings, setSettings] = useState(settingsNull);
	const [brightness, setBrightness] = useState(settingsData.brightness);
	const [showTooltipBrightness, setShowTooltipBrightness] = React.useState(false)

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
					<FormLabel>Brightness</FormLabel>
					<Slider
						id='slider'
						defaultValue={brightness}
						min={20}
						max={100}
						step={5}
						onChange={(v) => handleBrightnessChange(v)}
						onMouseEnter={() => setShowTooltipBrightness(true)}
						onMouseLeave={() => setShowTooltipBrightness(false)}
					>
						<SliderTrack>
							<SliderFilledTrack bg="#3182ce" />
						</SliderTrack>
						<Tooltip
							hasArrow
							bg='#3182ce'
							color='white'
							placement='top'
							isOpen={showTooltipBrightness}
							label={`${brightness}%`}
						>
							<SliderThumb />
						</Tooltip>
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
