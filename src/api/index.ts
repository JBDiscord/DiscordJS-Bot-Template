import express, { Router } from 'express'


export const app: express.Application = express()
const router = express.Router()

app.use(router)
app.use(express.json())

router.get('/test', (req, res) => {
    res.json({
        "hello": "world!"
    })
})
