const express = require('express')
const app = express()
const fetch = require('node-fetch')
const PORT = process.env.PORT || 4500

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/:key', async (req, res, next) => {
    try {
        const apiReq = await fetch(`http://data.fixer.io/api/latest?access_key=${req.params.key}&symbols=USD,UAH,EUR`)
        const apiRes = await apiReq.json()
        res.send(apiRes)
    } catch (error) {
        res.send({ error })
    }
})

app.use((err, req, res, next) => {
    console.error(err)
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))