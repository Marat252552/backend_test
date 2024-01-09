import { ResultSetHeader, RowDataPacket } from "mysql2";
import { UserCreation_T, UserUpdate_T, User_T } from "../shared/types";
import pool from "./pool";

export const getUserById = async (id: number) => {
  const [rows] = await pool.query<User_T[]>(
    `
        SELECT *
        FROM users
        WHERE id = ?
    `,
    [id]
  );
  return rows[0];
};

export const getUserByEmail = async (email: string) => {
  const [rows] = await pool.query<User_T[]>(
    `
          SELECT *
          FROM users
          WHERE email = ?
      `,
    [email]
  );
  return rows[0];
};

export const getUsers = async ({
  limit = 10,
  offset,
}: {
  limit?: number;
  offset?: number;
}) => {
  const query = `
    SELECT *
    FROM users
    ORDER BY created_at DESC
    ${limit ? `LIMIT ${limit}` : ""}
    ${offset ? `OFFSET ${offset}` : ""}
  `;
  const [rows] = await pool.query<User_T[]>(query);

  return rows;
};

export const addUser = async ({
  name,
  email,
  password,
  role,
}: UserCreation_T): Promise<User_T> => {
  const query = `
    INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)
  `;
  const result = await pool.query<ResultSetHeader>(query, [
    name,
    email,
    password,
    role,
  ]);

  return getUserById(result[0].insertId);
};

export const doesUserExist = async (email: string) => {
  const result = await pool.query<RowDataPacket[][]>(
    `
      SELECT EXISTS(SELECT * FROM users WHERE email = ?);
    `,
    [email]
  );
  return !!Object.values(result[0][0])[0];
};

const addProperty = (key: string) => {
  return `${key} = ?`;
};

export const updateUserById = async (
  user_id: number | string,
  options: UserUpdate_T
): Promise<User_T> => {
  const keys = Object.keys(options);
  const values = Object.values(options);

  const query = `
    UPDATE users 
    SET
      ${keys.map((key) => {
        return addProperty(key);
      })}
    WHERE id = ?
  `;
  await pool.query<ResultSetHeader>(query, [...values, user_id]);
  return await getUserById(+user_id);
};
