const db = require('./db');

const createProffy = require('./createProffy');

db.then(async (db) => {
    //Inserir dados
    proffyValue = {
        name:"Mark Brito",
        avatar: "https://avatars2.githubusercontent.com/u/6643122?s=460&u=1e9e1f04b76fb5374e6a041f5e41dce83f3b5d92&v=4",
        whatsaap: "8998958954",
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões."
    }

    classValue = {
        subject: 2,
        cost:"80",
        
    }

    classScheduleValues =[
        {
            weekday: 2,
            time_form: 520,
            tim_to: 1220
        },
        {
            weekday: 5,
            time_form: 820,
            tim_to: 720
        }
    ]

    //await createProffy(db, {proffyValue,classValue,classScheduleValues})
    //Consultar dados

    const selectProffys = await db.all("SELECT * FROM proffys, classes,class_schedule")
    //console.log(selectProffys)

    const selectProffy = await db.all(`
       SELECT classes.*, proffys.*
       FROM proffys
       JOIN classes ON (classes.proffy_id = proffys.id) 
       WHERE classes.proffy_id =1;
    `)
    //console.log(selectProffy)

    const selectShedules = await db.all(`
       SELECT class_schedule.*
       FROM class_schedule
       WHERE class_schedule.class_id = 1
       AND class_schedule.weekday = 2
       AND class_schedule.time_from <= 520
       AND class_schedule.time_to > 520
    `)
    console.log(selectShedules)

   //Add espaço fake const data = req.query

    //const isNotEmpty = Object.keys(data).length >0
   // if(isNotEmpty){

       // data.subject = getSubject(data.subject)

       // proffys.push(data)

        //return resp.redirect("/study")
    
})