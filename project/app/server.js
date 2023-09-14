const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/write-json', (req, res) => {
	try {
		const jsonData = req.body;

		const jsonString = JSON.stringify(jsonData, null, 2);

		const filePath = path.join(__dirname, 'public', 'config_displays.json');

		fs.writeFileSync(filePath, jsonString);

		res.json({ message: 'JSON file written successfully' });
	} catch (error) {
		console.error('Error writing JSON file:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

app.listen(3001, () => {
	console.log('Server is running on port 3001');
});
