import { RowDataPacket, ResultSetHeader } from "mysql2";

export type Roles = "USER" | "ADMIN";

export type TokenPayload_T = {
  email: string;
  user_id: string;
  role: Roles;
};

export interface User_T extends RowDataPacket {
  id: number;
  created_at: number;
  name: string;
  fullname: string;
  email: string;
  password: string;
  sex: "male" | "female";
  image_name: string;
  role: Roles;
}

export interface UserCreation_T {
  name: string;
  email: string;
  password: string;
  role?: Roles;
}

export interface AllowedKeys_T {
  name?: string;
  fullname?: string;
  email?: string;
  sex?: "male" | "female";
}

export interface UserUpdate_T extends AllowedKeys_T {
  image_name?: string;
}
