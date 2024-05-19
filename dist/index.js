"use strict";
// write a function to create users table in  your database
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
// if running locally then fill this manually u will see it in termina
// const client = new Client({
//   host: "",
//   port: 1234,
//   database: "",
//   user: "",
//   password: "",
// });
/// if using neondb then just do this
const client = new pg_1.Client({
    connectionString: "postgresql://jyotipal:ckNY3wDiupP1@ep-nameless-waterfall-a1rdag1p.ap-southeast-1.aws.neon.tech/test?sslmode=require",
});
// create table
// async function createUsersTable() {
//   try {
//     await client.connect();
//     const result = await client.query(`
//       CREATE TABLE users(
//           id SERIAL PRIMARY KEY,
//           username VARCHAR(50) UNIQUE NOT NULL,
//           email VARCHAR(255) UNIQUE NOT NULL,
//           password VARCHAR(255) NOT NULL,
//           created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
//       )`);
//     console.log(result);
//   } catch (error) {
//     console.error("Error creating table:", error);
//   } finally {
//     await client.end();
//   }
// }
// createUsersTable();
// async function to insert data into a table
function inserData(username, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const insertQuery = "INSERT INTO users (username,email,password) VALUES ($1,$2,$3)";
            const values = [username, email, password];
            const res = yield client.query(insertQuery, values);
            console.log(res, "result");
        }
        catch (er) {
            console.log(er, "error");
        }
    });
}
// inserData("jyotipal", "jyoti@gmail.com", "jyoti0129");
// how to query data
function findData(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const query = "SELECT * FROM users WHERE email = $1";
            const values = [email];
            const result = yield client.query(query, values);
            if (result.rows.length > 0) {
                console.log("USER FOUND:", result.rows[0]);
                return result.rows[0];
            }
            else {
                console.log("USER NOT FOUND");
                return null;
            }
        }
        catch (error) {
            console.log(error);
        }
    });
}
findData("jyoti@gmail.com");
