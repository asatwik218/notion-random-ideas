#!/usr/bin/env node
/** @format */

// Required parameters:
// @raycast.schemaVersion 1
// @raycast.title Add Random Idea
// @raycast.mode compact

// Optional parameters:
// @raycast.icon 💡
// @raycast.argument1 { "type": "text", "placeholder": "What's the idea?", "optional": false}
// @raycast.argument2 { "type": "text", "placeholder": "Explain it!", "optional": true}
// @raycast.argument3 { "type": "text", "placeholder": "mood", "optional": true}

// Documentation:
// @raycast.description assume i get an idea or something i want to quick note down, I can just use this command on raycast and the idea gets added on my notion page with just few key presses
// @raycast.author satwik_agarwal
// @raycast.authorURL https://raycast.com/satwik_agarwal

const axios = require("axios");

let [ideaTitle, ideaDesc, emotion] = process.argv.slice(2);
const pgName = "random ideas";
// const uri = "https://raycast-notion-random-ideas.onrender.com";
const uri = "http://localhost:8000";

// console.log(ideaTitle, ideaDesc, emotion);

// axios.get(`${uri}/allIdeas`).then((res)=>{
//     console.log(res.data);
// })

async function addIdea() {
	const payload = { pgName, ideaTitle, ideaDesc, emotion };
	try {
		await axios.post(`${uri}/addIdea`, payload);
		console.log("\t\tidea added!\n");
        showAllIdeas();
	} catch (e) {
		console.log(e);
	}
}
addIdea();

async function showAllIdeas() {
	try {
		const res = await axios.get(`${uri}/allIdeas`);
        res.data.reverse().forEach((idea)=>{
            console.log(`💡 ${idea}\n`);
        })
	} catch (e) {
		console.log(e);
	}
}



