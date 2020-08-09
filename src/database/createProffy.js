module.exports = async function (db, { proffyValue, classValue, classScheduleValues }) {
    //Inserir dados da tabela
    const insertProffy = await db.run(`
       INSERT INTO proffys (
          name,
          avatar,
          whatsapp,
          bio
       ) VALUES (
          "${proffyValue.name}",
          "${proffyValue.avatar}",
          "${proffyValue.whatsapp}",
          "${proffyValue.bio}"
       );
    `)

    const proffy_id = insertProffy.lastID;

    const insertClass = await db.run(`
      INSERT INTO classes (
         subject,
         cost,
         proffy_id
      ) VALUES (
         "${classValue.subject}",
         "${classValue.cost}",
         "${proffy_id}"
      );
    `)

    const class_id = insertClass.lastID;

    const insertAllClassSheduleValue = classScheduleValues.map((i) => {
        return db.run(`
          INSERT INTO class_schedule (
            class_id,
            weekday,
            time_from,
            time_to
          ) VALUES (
           "${class_id}",
           "${i.weekday}",
           "${i.time_form}",
           "${i.tim_to}"
          );
    `)
    })

    await Promise.all(insertAllClassSheduleValue);
}