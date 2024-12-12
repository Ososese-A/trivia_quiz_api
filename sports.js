const express = require("express")
const path = require("path")
const fs = require("fs").promises

const router = express.Router()


const fetchTriviaData = async () => {
    try {
        filePath = path.join(__dirname, 'trivia.json')
        fileContent = await fs.readFile(filePath)
        data = JSON.parse(fileContent)
        return data["Sports"]
    } catch (error) {
        console.log(error)
    }
}


prevIndex = []

function generateUniqueIndex (array_list) {
    let newIndex;

    do {
        newIndex = Math.floor(Math.random() * array_list.length)
    } while (prevIndex.includes(newIndex))

    prevIndex.push(newIndex)
    if (prevIndex.length > 3) {
        prevIndex.shift()
    }

    return newIndex
}

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