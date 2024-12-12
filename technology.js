const express = require("express")
const path = require("path")
const fs = require("fs").promises

const fetchTriviaData = async () => {
    try {
        const filePath = path.join(__dirname, "trivia.json")
        const fileContent = await fs.readFile(filePath)
        const data = JSON.parse(fileContent)
        return data["Technology"]
    } catch (error) {
        console.log(error)
    }
}

prevIndex = []

function generateUniqueIndex (array_list) {
    let newIndex
    do {
        newIndex = Math.floor(Math.random() * array_list.length)
    } while (prevIndex.includes(newIndex))

    prevIndex.push(newIndex)
    if (prevIndex > 3) {
        prevIndex.shift()
    }

    return newIndex
}

const router = express.Router()

router.get("/", async (req, res) => {
    const questions = await fetchTriviaData()
    res.status(200).json(questions)
})

router.get("/random-question", async (req, res) => {
    const questions = await fetchTriviaData()
    const random_index = generateUniqueIndex(questions)
    const random_question = questions[random_index]
    res.status(200).json(random_question)
})

module.exports = router