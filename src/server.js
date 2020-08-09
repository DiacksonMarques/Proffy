// Servidor
const express =require('express')
const serve = express()

const {
    pageIndex,
    pageStudy,
    pageGiveclasses,
    saveClasses
}= require('./pags')

const nunjucks = require('nunjucks')

nunjucks.configure('src/views',{
    express: serve,
    noCache: true,
})

serve

//Post
.use(express.urlencoded({extended: true}))
.use(express.static("public"))

.get("/", pageIndex)
.get("/study", pageStudy)
.get("/give-classes", pageGiveclasses)
.post("/give-classes", saveClasses)

.listen(5500)