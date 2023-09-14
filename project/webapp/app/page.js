"use client";
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Select, Flex, Heading, Stack, Box, Text } from '@chakra-ui/react'

const socket = io('http://localhost:3001');

const Index = () => {

  const sendAction = (action) => {
    socket.emit('action', action);
  };

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      height="100vh"
    >
      <Heading as="h1" my={4}>
        CryptoTickerLed
      </Heading>
      <Box mb={4}>
        <Text mb={2} fontWeight="bold">
          Select a Ticker:
        </Text>
        <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
          <Select
            placeholder="Select option"
            onChange={(e) => sendAction(e.target.value)}
            flex={1}
          >
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </Stack>
      </Box>
    </Flex>
  );
};

export default Index;