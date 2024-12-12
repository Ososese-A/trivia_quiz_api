const express = require('express')
const path = require('path')
const fs = require('fs').promises
const art_cultureRoute = require('./art_culture')
const entertainmentRoute = require('./entertainment')
const food_drinkRoute = require('./food_drink')
const geographyRoute = require('./geography')
const historyRoute = require('./history')
const literatureRoute = require('./literature')
const musicRoute = require('./music')
const scienceRoute = require('./science')
const sportsRoute = require('./sports')
const technologyRoute = require('./technology')


const app = express()
app.use(logger)
app.use(express.json())
app.use("/art-culture", art_cultureRoute)
app.use("/entertainment", entertainmentRoute)
app.use("/food-drink", food_drinkRoute)
app.use("/geography", geographyRoute)
app.use("/history", historyRoute)
app.use("/literature", literatureRoute)
app.use("/music", musicRoute)
app.use("/science", scienceRoute)
app.use("/sports", sportsRoute)
app.use("/technology", technologyRoute)


fetchData = async () => {
    try {
        filePath = path.join(__dirname, 'trivia.json')
        fileContent = await fs.readFile(filePath)
        data = JSON.parse(fileContent)
        return data
    } catch (error) {
        console.log(error)
    }
}

prevIndexes = []

function generateUniqueIndex (triviaArray) {
    let newIndex;

    do {
        newIndex = Math.floor(Math.random() * triviaArray.length)
    } while (prevIndexes.includes(newIndex))

    prevIndexes.push(newIndex)

    if (prevIndexes.length > 3) {
        prevIndexes.shift()
    }

    return newIndex
}

app.get("/", async (req, res) => {
    trivia_questions = await  fetchData()
    res.status(200).json(trivia_questions)
})

app.get("/random-question", async (req, res) => {
    trivia_questions = await fetchData()
    trivia_category_list = Object.keys(trivia_questions)
    category_index = generateUniqueIndex(trivia_category_list)
    selected_category = trivia_category_list[category_index]
    question_list = trivia_questions[selected_category]
    question_index = generateUniqueIndex(question_list)
    random_question = question_list[question_index]
    res.status(200).json(random_question)
})

function logger (req, res, next) {
    console.log(req.path, req.method)
    next()
}

app.listen(2000)