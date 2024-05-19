// write a function to create users table in  your database

import { Client } from "pg";

// if running locally then fill this manually u will see it in termina
// const client = new Client({
//   host: "",
//   port: 1234,
//   database: "",
//   user: "",
//   password: "",
// });

/// if using neondb then just do this
const client = new Client({
  connectionString:
    "postgresql://jyotipal:ckNY3wDiupP1@ep-nameless-waterfall-a1rdag1p.ap-southeast-1.aws.neon.tech/test?sslmode=require",
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

async function inserData(username: string, email: string, password: string) {
  try {
    await client.connect();

    const insertQuery =
      "INSERT INTO users (username,email,password) VALUES ($1,$2,$3)";
    const values = [username, email, password];
    const res = await client.query(insertQuery, values);
    console.log(res, "result");
  } catch (er) {
    console.log(er, "error");
  }
}

// inserData("jyotipal", "jyoti@gmail.com", "jyoti0129");

// how to query data

async function findData(email: string) {
  try {
    await client.connect();
    const query = "SELECT * FROM users WHERE email = $1";
    const values = [email];
    const result = await client.query(query, values);

    if (result.rows.length > 0) {
      console.log("USER FOUND:", result.rows[0]);
      return result.rows[0];
    } else {
      console.log("USER NOT FOUND");
      return null;
    }
  } catch (error) {
    console.log(error);
  }
}

findData("jyoti@gmail.com");
