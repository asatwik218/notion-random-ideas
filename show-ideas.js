#!/usr/bin/env node
/** @format */

// Required parameters:
// @raycast.schemaVersion 1
// @raycast.title Show Random Ideas
// @raycast.mode fullOutput

// Optional parameters:
// @raycast.icon 🧠
// @raycast.packageName My Scripts

// Documentation:
// @raycast.description Shows all my ideas from Notion page
// @raycast.author satwik_agarwal
// @raycast.authorURL https://raycast.com/satwik_agarwal

const axios = require("axios");

const uri = "https://raycast-notion-random-ideas.onrender.com";
// const uri = "http://localhost:8000";

async function showAllIdeas() {
	try {
		const res = await axios.get(`${uri}/allIdeas`);
		res.data.reverse().forEach((idea) => {
			console.log(`\n ➡️ ${idea}`);
		});
	} catch (e) {
		console.log(e);
	}
}
showAllIdeas();
