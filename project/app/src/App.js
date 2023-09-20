import './App.css';
import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import { Flex, Heading, Center, Tabs, Tab, TabPanels, TabPanel, TabList } from '@chakra-ui/react'
import DisplayForm from './components/displayForm';
import DisplayItem from './components/displayItem';
import Footer from './components/footer';
import { fetchDisplaysJSON, writeDisplaysJSON, fetchCoinsList } from './api/api';
import SettingsForm from './components/settingsForm';

function App() {
  const [displays, setDisplays] = useState([]);
  const [settings, setSettings] = useState([]);
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    fetchDisplaysJSON(setDisplays, setSettings);
    fetchCoinsList(setCoins);
  }, []);

  const handleUpdateSettings = (newSettings) => {
    setSettings(newSettings);
    writeDisplaysJSON(displays, newSettings);
  }

  const handleAddDisplay = async (newDisplay) => {
    let newDisplays = [...displays, newDisplay];
    setDisplays(newDisplays);
    writeDisplaysJSON(newDisplays, settings);
  };

  const handleMoveUp = (index) => {
    if (index > 0) {
      let newDisplays = displays.map((display, i) => i === index - 1 ? displays[index] : i === index ? displays[index - 1] : display);
      setDisplays(newDisplays);
      writeDisplaysJSON(newDisplays, settings);
    }
  };

  const handleMoveDown = (index) => {
    if (index < displays.length - 1) {
      let newDisplays = displays.map((display, i) => i === index ? displays[index + 1] : i === index + 1 ? displays[index] : display);
      setDisplays(newDisplays);
      writeDisplaysJSON(newDisplays, settings);
    }
  };

  const handleDelete = (index) => {
    let newDisplays = displays.filter((display, i) => i !== index);
    setDisplays(newDisplays);
    writeDisplaysJSON(newDisplays, settings);
  };

  return (
    <ChakraProvider>
      <Flex
        flexDirection="column"
        alignItems="center"
      >
        <Heading as="h1" my={4}>
          CryptoTickerLed
        </Heading>
        <Tabs variant='soft-rounded' isLazy>
          <Center>
            <TabList>
              <Tab>Add display</Tab>
              <Tab>Settings</Tab>
            </TabList>
          </Center>
          <TabPanels>
            <TabPanel>
              <DisplayForm onAddDisplay={handleAddDisplay} coins={coins} />
            </TabPanel>
            <TabPanel>
              <SettingsForm onUpdateSettings={handleUpdateSettings} settingsData={settings} />
            </TabPanel>
          </TabPanels>
        </Tabs>

        <Heading as="h4" fontSize={24} my={4}>
          Displays
        </Heading>
        {displays && (
          displays.map((display, index) => (
            <DisplayItem
              key={index}
              data={display}
              index={index}
              length={displays.length}
              onMoveUp={handleMoveUp}
              onMoveDown={handleMoveDown}
              onDelete={handleDelete}
            />
          ))
        )}
        <Footer />
      </Flex>
    </ChakraProvider>
  )
}

export default App;
