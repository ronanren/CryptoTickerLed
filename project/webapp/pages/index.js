import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Select } from '@chakra-ui/react'
import { keyframes } from '@chakra-ui/react';

const socket = io('http://localhost:3001');

const Index = () => {
	const [newAction, setNewAction] = useState('');

	// useEffect(() => {
	// 	socket.on('action', (action) => {
	// 		setActions((prevActions) => [...prevActions, action]);
	// 	});
	// }, []);

	const sendAction = () => {
		socket.emit('action', newAction);
		setNewAction('');
	};

	return (
		<div>
			<h1>CryptoTickerLed</h1>
			<Select placeholder='Select option'>
				<option value='option1'>Option 1</option>
				<option value='option2'>Option 2</option>
				<option value='option3'>Option 3</option>
			</Select>
			<input
				type="text"
				value={newAction}
				onChange={(e) => setNewAction(e.target.value)}
			/>
			<button onClick={sendAction}>Send action</button>
		</div>
	);
};

export default Index;