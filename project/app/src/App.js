import './App.css';
import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import { Flex, Heading } from '@chakra-ui/react'
import DisplayForm from './components/displayForm';
import DisplayItem from './components/displayItem';

function App() {
  const [displays, setDisplays] = useState([]);

  const fetchDisplaysJSON = () => {
    fetch('config_displays.json')
      .then((res) => res.json())
      .then((data) => { setDisplays(data); });
  };

  const writeDisplaysJSON = (displays) => {
    fetch('http://localhost:3001/write-json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(displays)
    });
  };

  useEffect(() => {
    fetchDisplaysJSON();
  }, []);

  const handleAddDisplay = async (newDisplay) => {
    let newDisplays = { displays: [...displays.displays, newDisplay] };
    setDisplays(newDisplays);
    writeDisplaysJSON(newDisplays);
  };

  const handleMoveUp = (index) => {
    if (index > 0) {
      let newDisplays = { displays: displays.displays.map((display, i) => i === index - 1 ? displays.displays[index] : i === index ? displays.displays[index - 1] : display) };
      setDisplays(newDisplays);
      writeDisplaysJSON(newDisplays);
    }
  };

  const handleMoveDown = (index) => {
    if (index < displays.displays.length - 1) {
      let newDisplays = { displays: displays.displays.map((display, i) => i === index ? displays.displays[index + 1] : i === index + 1 ? displays.displays[index] : display) };
      setDisplays(newDisplays);
      writeDisplaysJSON(newDisplays);
    }
  };

  const handleDelete = (index) => {
    let newDisplays = { displays: displays.displays.filter((display, i) => i !== index) };
    setDisplays(newDisplays);
    writeDisplaysJSON(newDisplays);
  };

  return (
    <ChakraProvider>
      <Flex
        flexDirection="column"
        alignItems="center"
        height="100vh"
        mb={5}
      >
        <Heading as="h1" my={4}>
          CryptoTickerLed
        </Heading>
        <DisplayForm onAddDisplay={handleAddDisplay} />
        <Heading as="h4" fontSize={24} my={4}>
          Displays
        </Heading>
        {displays.displays && (
          displays.displays.map((display, index) => (
            <DisplayItem
              key={index}
              data={display}
              index={index}
              length={displays.displays.length}
              onMoveUp={handleMoveUp}
              onMoveDown={handleMoveDown}
              onDelete={handleDelete}
            />
          ))
        )}
      </Flex>
    </ChakraProvider>
  )
}

export default App;
