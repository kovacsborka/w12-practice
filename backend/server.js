//lekérjük a következőket
const { json, response } = require("express");
const express = require("express");
const fs = require("fs");
const path = require("path");

const port = 9000

const app = express();
//az appnak adunk egy GET requestet ( get(url, callback function) )
//paraméterek: request, response, next
app.get('/', (req, res, next) => {
    
    /*
    //terminálban jelenik meg
    console.log("Request recieved");

    //res.send megjelenik az oldalon
    res.send("Thank you for your request! This is our response")
    */


    //frontenden jeleníti meg
    res.sendFile(path.join(`${__dirname}/../frontend/index.html`));
} )



//bármilyen fájlt ki tudunk szolgálni
app.get('/kismacska', (req, res, next) => {
    res.sendFile(path.join(`${__dirname}/../frontend/somefile.json`));
} )



//bármilyen megadott endpointon működik
app.get('/something', (req, res, next) => {
    //terminálban jelenik meg
    console.log("Request recieved on something endpoint");

    //res.send megjelenik az oldalon
    res.send("Thank you for your request! This is our response for something endpoint")
} )


const userFile = path.join(`${__dirname}/../frontend/users.json`)


app.get('/api/v1/users', (req, res, next) => {
    console.log("Request recieved on users endpoint");
    /*
    const users = [
        {
            name: 'John',
            surname: 'Doe',
            status: 'active',
            age: 22,

        },
        {
            name: 'Béla',
            surname: 'Kiss',
            status: 'passive',
            age: 50,

        }
    ]
    res.send(JSON.stringify(users))
    */
    res.sendFile(userFile);
} )



//passzív aktív userek
app.get('/api/v1/users/active', (req, res, next) => {
    //fs module, readfile (elérési útvonal, callback func)
    fs.readFile(userFile, (err, data) => {
        if (err) {
            res.send("Something went wrong")
        }
        else {
            //parse => js objectummá alakítja a json stringet
            const users = JSON.parse(data)
            //const activeUsers = users.filter(user => user.status === "active")
            res.send(users.filter(user => user.status === "active"))

        }
    })
} )

app.get('/api/v1/users/passive', (req, res, next) => {
    fs.readFile(userFile, (err, data) => {
        if (err) {
            res.send("Something went wrong")
        }
        else {
            //parse => js objectummá alakítja a json stringet
            const users = JSON.parse(data)
            //const passiveUsers = users.filter(user => user.status === "passive")
            res.send(users.filter(user => user.status === "passive"))

        }
    })
} )





app.use('/public', express.static(`${__dirname}/../frontend/public`));

//lefuttatás
app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`);
})
