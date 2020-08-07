const proffys = [
    {
        name:"Diego Fernades",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsaap: "5588988094970",
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        subject: "Química",
        cost:"20",
        weekday:[0],
        time_form:[720],
        tim_to:[1220]
    },
    {
        name:"Mark Brito",
        avatar: "https://avatars2.githubusercontent.com/u/6643122?s=460&u=1e9e1f04b76fb5374e6a041f5e41dce83f3b5d92&v=4",
        whatsaap: "8998958954",
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        subject: "Profamação",
        cost:"80",
        weekday:[2],
        time_form:[520],
        tim_to:[1220]
    }
]

const subjects =[
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química"
]

const weekdays =[
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
]


function getSubject(subjectNumer){
    const arrayPosition = +subjectNumer -1
    return subjects[arrayPosition]
}

function pageIndex(req, resp){
    return resp.render("index.html");
}

function pageStudy(req, resp){
    const filters = req.query
    return resp.render("study.html", {proffys,filters,subjects,weekdays});
}

function pageGiveclasses(req, resp){
    const data = req.query

    const isNotEmpty = Object.keys(data).length != 0
    if(isNotEmpty){

        data.subject = getSubject(data.subject)

        proffys.push(data)

        return resp.redirect("/study")
    }
    proffys.push(data)
    return resp.render("give-classes.html",{subjects,weekdays});
}

const express =require('express')
const serve = express()
const nunjucks = require('nunjucks')

nunjucks.configure('src/views',{
    express: serve,
    noCache: true,
})

serve
.use(express.static("public"))

.get("/", pageIndex)
.get("/study", pageStudy)
.get("/give-classes", pageGiveclasses)

.listen(5500)