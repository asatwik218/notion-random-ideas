#!/usr/bin/env node
/** @format */

// Required parameters:
// @raycast.schemaVersion 1
// @raycast.title add random idea
// @raycast.mode fullOutput

// Optional parameters:
// @raycast.icon 💡
// @raycast.argument1 { "type": "text", "placeholder": "what's the idea?", "optional": false}
// @raycast.argument2 { "type": "text", "placeholder": "mood", "optional": true}

// Documentation:
// @raycast.author satwik_agarwal
// @raycast.authorURL https://raycast.com/satwik_agarwal

const axios = require("axios");

let [content, emotion] = process.argv.slice(2);
const pgName = "random ideas";
const uri = "https://raycast-notion-random-ideas.onrender.com";

console.log(content, emotion);

// axios.get(`${uri}/allIdeas`).then((res)=>{
//     console.log(res.data);
// })

async function addIdea() {
	const payload = { pgName, content, emotion };
	try {
		const res = await axios.post(`${uri}/addIdea`, payload);
		console.log(res);
	} catch (e) {
		console.log(e);
	}
}
addIdea();
