"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserById = exports.doesUserExist = exports.addUser = exports.getUsers = exports.getUserByEmail = exports.getUserById = void 0;
const pool_1 = __importDefault(require("./pool"));
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield pool_1.default.query(`
        SELECT *
        FROM users
        WHERE id = ?
    `, [id]);
    return rows[0];
});
exports.getUserById = getUserById;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield pool_1.default.query(`
          SELECT *
          FROM users
          WHERE email = ?
      `, [email]);
    return rows[0];
});
exports.getUserByEmail = getUserByEmail;
const getUsers = ({ limit = 10, offset, }) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
    SELECT *
    FROM users
    ORDER BY created_at DESC
    ${limit ? `LIMIT ${limit}` : ""}
    ${offset ? `OFFSET ${offset}` : ""}
  `;
    const [rows] = yield pool_1.default.query(query);
    return rows;
});
exports.getUsers = getUsers;
const addUser = ({ name, email, password, role, }) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
    INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)
  `;
    const result = yield pool_1.default.query(query, [
        name,
        email,
        password,
        role,
    ]);
    return (0, exports.getUserById)(result[0].insertId);
});
exports.addUser = addUser;
const doesUserExist = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield pool_1.default.query(`
      SELECT EXISTS(SELECT * FROM users WHERE email = ?);
    `, [email]);
    return !!Object.values(result[0][0])[0];
});
exports.doesUserExist = doesUserExist;
const addProperty = (key) => {
    return `${key} = ?`;
};
const updateUserById = (user_id, options) => __awaiter(void 0, void 0, void 0, function* () {
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
    yield pool_1.default.query(query, [...values, user_id]);
    return yield (0, exports.getUserById)(+user_id);
});
exports.updateUserById = updateUserById;
