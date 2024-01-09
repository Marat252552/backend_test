import dotenv from "dotenv";
import http from "http";
import { app } from "./app";
import mysql from "mysql2";
import { addUser, getUserById, getUsers } from "./database/queries";
dotenv.config();

const server = http.createServer(app);

let Start = () => {
  let PORT = process.env.PORT || 3000;
  try {
    server.listen(PORT, () => {
      console.log("balvlasfaw");
      console.log("server is running on port " + PORT);
    });
  } catch (e) {
    console.log(e);
  }
};

Start();
