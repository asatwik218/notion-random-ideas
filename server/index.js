/** @format */

const express = require("express");
const cors = require("cors");
const { Client } = require("@notionhq/client");
require("dotenv").config();

const { colors, colorEmotionMap, pageNameIdMap } = require("./constants");

const app = express();
const PORT = process.env.PORT ?? 8000;

//middleware
app.use(cors());
app.use(express.json());

//notion config
const notion = new Client({
	auth: process.env.NOTION_INTEGRATION_KEY,
});

//return all ideas in a list
const getAllIdeas = async (pgName) => {
	const pageId = pageNameIdMap[pgName];
	try {
		const { results } = await notion.blocks.children.list({
			block_id: pageId,
			page_size: 50,
		});

		let ideas = results.filter((res) => res["type"] == "toggle");
		ideas = ideas.map((idea) =>
			idea["toggle"]["rich_text"][0]["text"]["content"].trim()
		);
		return ideas;
	} catch (e) {
		console.log(e);
		throw new Error("Failed To Fetch Ideas");
	}
};

//idea in form of a toggle list :
//>idea title
//    idea desc
const addIdea = async (pgName, content, emotion) => {
	const blockID = pageNameIdMap[pgName];

	const ideaTitle = content.split(":")[0].trim();
	const ideaDesc = content.split(":")[1].trim();
	let bgColor;
	if (!emotion) {
		bgColor = colors[Math.floor(Math.random() * colors.length())];
	} else {
		bgColor = colorEmotionMap[emotion];
	}

	try {
		const response = await notion.blocks.children.append({
			block_id: blockID,
			children: [
				{
					toggle: {
						rich_text: [
							{
								type: "text",
								text: {
									content: ideaTitle,
									link: null,
								},
								annotations: {
									bold: false,
									italic: false,
									strikethrough: false,
									underline: false,
									code: false,
									color: "default",
								},
								plain_text: ideaTitle,
								href: null,
							},
						],
						color: bgColor,
						children: [
							{
								paragraph: {
									rich_text: [
										{
											type: "text",
											text: {
												content: ideaDesc,
											},
										},
									],
									color: "gray_background",
								},
							},
						],
					},
				},
			],
		});
		return response;
	} catch (error) {
		console.log(error);
		throw new Error("Failed To Add Idea");
	}
};

//content in form :
//idea : idea desc & eg
app.post("/addIdea", async (req, res) => {
	const { pgName, content, emotion } = req.body;
	try {
		const data = await addIdea(pgName, content, emotion);
		res.status(200).json(data);
	} catch (e) {
		console.log(e);
		res.status(500).send("Failed To Add Idea");
	}
});

app.get("/allIdeas", async (req, res) => {
	const pgName = "random ideas";
	try {
		const data = await getAllIdeas(pgName);
		res.status(200).json(data);
	} catch (e) {
		res.status(500).send("Failed To Fetch Ideas");
		console.log(e);
	}
});

app.listen(PORT, () => {
	console.log(`server has started on port ${PORT}`);
});
