const Database = require('./database/db')

const { subjects, weekdays, getSubject, convertTimeToMinutes }= require("./utils/format");
const createProffy = require('./database/createProffy');

function pageIndex(req, resp){
    return resp.render("index.html");
}

async function pageStudy(req, resp){
    const filters = req.query

    if( !filters.subject || !filters.weekday ||!filters.time ){
        return resp.render("study.html", {filters,subjects,weekdays});
    }

    // converte horas em minutos
    const timeToMinutes = convertTimeToMinutes(filters.time)

    const query = `
      SELECT classes.*, proffys.*
      FROM proffys
      JOIN classes ON (classes.proffy_id = proffys.id) 
      WHERE EXISTS(
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = classes.id
        AND class_schedule.weekday = ${filters.weekday}
        AND class_schedule.time_from <= ${timeToMinutes}
        AND class_schedule.time_to > ${timeToMinutes}
      )
      AND classes.subject = '${filters.subject}'
    `

    //Erro na consulta
    try {
        const db = await Database
        const proffys = await db.all(query)

        proffys.map((proffy) => {
            proffy.subject = getSubject(proffy.subject)
        })
  
        return resp.render('study.html', {proffys, subjects, filters, weekdays})
      } catch (error) {
          console.log(error)
      }
}

function pageGiveclasses(req, resp){
    return resp.render("give-classes.html",{subjects,weekdays});
}

async function saveClasses(req, resp){
    const creteProffy = require('./database/createProffy')
    const data = req.body

    const proffyValue={
        name: data.name,
        avatar: data.avatar,
        whatsaap: data.whatsaap,
        bio: data.bio
    }

   const classValue = {
        subject: data.subject,
        cost: data.cost
        
    }

    const classScheduleValues = data.weekday.map((weekday, index) => {
        return {
            weekday,
            time_form: convertTimeToMinutes(data.time_form[index]),
            tim_to: convertTimeToMinutes(data.time_to[index])
        }
    })

    try {
        const db = await Database
        await createProffy(db, {proffyValue, classValue, classScheduleValues})

        let queryString = "?subject="+ data.subject
        queryString += "&weekday="+ data.weekday[0]
        queryString += "&time="+ data.time_form[0]

        return resp.redirect("/study" + queryString)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    pageIndex,
    pageStudy,
    pageGiveclasses,
    saveClasses
}