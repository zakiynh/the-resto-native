const { connection, getDB } = require("../config/dbConfig");
const { ObjectId } = require("mongodb");
const bcrypt = require("../helpers/bcrypt");

async function run() {
    try {
        const db = getDB();
        await db.collection("users").insertMany([
            {
                
                username: "Rodger",
                email: "rsimo0@bandcamp.com",
                password: bcrypt.hash("password"),
                role: "admin",
                phoneNumber: "829-194-8553",
                address: "64281 Summerview Pass"
            },
            {
                
                username: "Pammie",
                email: "phuglin1@constantcontact.com",
                password: bcrypt.hash("password"),
                role: "admin",
                phoneNumber: "626-482-3343",
                address: "73 Oakridge Lane"
            }
        ]);
    } catch (error) {
        throw error;
    }
}

connection()
    .then(() => {
        run()
            .then(() => {
                console.log("seeding done");
                process.exit();
            })
    })