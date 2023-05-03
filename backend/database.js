var sqlite3 = require('sqlite3').verbose();

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      console.error(err.message)
      throw err
    } else {
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE main (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            email text 
        )`,
        (err) => {
            if (err) {
                console.log(err.message)
            } else {
                var insert = 'INSERT INTO main (name, email) VALUES (?,?)'
                db.run(insert, ["user","user@gmail.com"])
            }
        }
        );  
    }
});


module.exports = db