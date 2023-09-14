import './App.css';
import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import { Flex, Heading } from '@chakra-ui/react'
import DisplayForm from './displayForm';

function App() {
  const [displays, setDisplays] = useState([]);

  const handleAddDisplay = async (newDisplay) => {
    setDisplays(displays.displays.push(newDisplay));

    fetch('http://localhost:3001/write-json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(displays)
    });
  };

  const fetchDisplaysJSON = () => {
    fetch('config_displays.json')
      .then((res) => res.json())
      .then((data) => { setDisplays(data); });
  };

  useEffect(() => {
    fetchDisplaysJSON();
  }, []);

  return (
    <ChakraProvider>
      <Flex
        flexDirection="column"
        alignItems="center"
        height="100vh"
      >
        <Heading as="h1" my={4}>
          CryptoTickerLed
        </Heading>
        <DisplayForm onAddDisplay={handleAddDisplay} />
        <Heading as="h4" fontSize={24} my={4}>
          Displays
        </Heading>
        <pre>{JSON.stringify(displays, null, 2)}</pre>
      </Flex>
    </ChakraProvider>
  )
}

export default App;
