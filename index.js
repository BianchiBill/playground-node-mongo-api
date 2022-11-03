//initial config
import express from "express";
import mongoose from "mongoose";
import router from './routes/personRoutes.js'
import config from './config.js'
const app = express();

console.log(config)

//  read JSON / create middleware

app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())

app.use('/person', router)


//initial route / endpoint
app.get('/', (req, res) => {
    // mostrar req

    res.json({ message: "Hello World 2" })
})

mongoose.connect(config.MONGOCONNECT).then(() => {
    console.log('Conectado ao MongoDB!')
    app.listen(3000)
}).catch((error) => console.log(error))


// delivery port  sem mongo
// app.listen(3000)