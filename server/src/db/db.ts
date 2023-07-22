import mysql from "mysql2";

import dotenv from "dotenv";
import AppError from "../utils/AppError";
import {
  condition,
  conditionList,
  join,
  on,
  table,
} from "../models/sqldata.modal";

dotenv.config({ path: "../../.env" });

const host = process.env.DBHOST + "";
const user = process.env.USER + "";
const database = process.env.DB + "";
const password = process.env.PASSWORD + "";

const connection = mysql.createConnection({
  host: "psfdb.cg7bxsnxml2w.me-south-1.rds.amazonaws.com",
  database: "psfdb",
  user: "admin",
  password: "digital44#",
  waitForConnections: true,
});

export const insertTableData = (table: table, data: any) => {
  let query = `INSERT INTO ${table} SET `;
  const keys = Object.keys(data);
  const values = Object.values(data);

  keys.map((key: any, i: any) => {
    if (i == 0) {
      query += ` ${key} = ? `;
    } else {
      query += ` , ${key} = ? `;
    }
  });

  return new Promise(async (resolve, reject) => {
    connection.execute(query, values, (err: any) => {
      if (err) {
        reject(new AppError("server_error", err.message, 500));
      } else {
        resolve(data);
      }
    });
  });
};

export const getTableData = (table: table, condition?: conditionList) => {
  let query = `SELECT * FROM ${table} `;

  if (condition) {
    query += ` WHERE `;
    condition.map((cond: condition, i) => {
      if (i > 0) {
        query += ` AND   `;
      }

      if (typeof cond.value == "string") {
        cond.value = ` '${cond.value}' `;
      }

      query += ` ${cond.key} ${cond.condition} ${cond.value} `;
    });
  }

  return new Promise((resolve, reject) => {
    connection.execute(query, (err: any, rows: any) => {
      if (err) {
        reject(new AppError("server_error", err.message, 500));
      } else {
        resolve(rows);
      }
    });
  });
};
export const getTableDataByCondition = (
  table: string,
  condition: conditionList
) => {
  let query = `SELECT * FROM ${table} `;

  if (condition.length > 0) {
    query += ` WHERE `;
    condition.map((cond: condition, i) => {
      if (i > 0) {
        query += ` AND   `;
      }

      query += ` ${cond.key} ${cond.condition} ${cond.value} `;
    });
  }
  return new Promise((resolve, reject) => {
    connection.execute(query, (err: any, rows: any) => {
      if (err) {
        reject(new AppError("server_error", err.message, 500));
      } else {
        resolve(rows);
      }
    });
  });
};

export const updateTableData = (
  table: string,
  data: any,
  condition: conditionList
) => {
  let query = `UPDATE ${table} SET `;
  const keys = Object.keys(data);
  const values = Object.values(data);

  keys.map((key: any, i: any) => {
    if (i == 0) {
      query += ` ${key} = ? `;
    } else {
      query += ` , ${key} = ? `;
    }
  });

  if (condition.length > 0) {
    query += ` WHERE `;
    condition.map((cond: condition, i) => {
      if (i > 0) {
        query += ` AND   `;
      }

      query += ` ${cond.key} ${cond.condition} ${cond.value} `;
    });
  }

  return new Promise((resolve, reject) => {
    connection.execute(query, values, (err: any) => {
      if (err) {
        reject(new AppError("server_error", err.message, 500));
      } else {
        resolve(data);
      }
    });
  });
};

export const deleteTableData = (table: string, condition: conditionList) => {
  let query = `DELETE FROM ${table} `;

  if (condition.length > 0) {
    query += ` WHERE `;
    condition.map((cond: condition, i) => {
      if (i > 0) {
        query += ` AND   `;
      }

      query += ` ${cond.key} ${cond.condition} ${cond.value} `;
    });
  }

  return new Promise((resolve, reject) => {
    connection.execute(query, (err: any, rows: any) => {
      if (err) {
        reject(new AppError("server_error", err.message, 500));
      } else {
        resolve(rows);
      }
    });
  });
};

export const selectJoinTableData = (
  columns: Array<string>,
  table: string,
  join: join,
  condition?: conditionList
) => {
  let cols: string = "*";

  columns.map((col: string, i) => {
    if (i == 0) {
      cols.replace("*", "");
    }

    if (i > 0) {
      cols += ` , `;
    }
    cols += ` ${col} `;
  });

  let query = `SELECT ${cols}  FROM ${table} `;

  join.map((j: on, i) => {
    query += ` JOIN ${j.tableName} ON ${j.condition.key} ${j.condition.condition} ${j.condition.value} `;
  });

  if (condition)
    if (condition.length > 0) {
      query += ` WHERE `;
      condition.map((cond: condition, i) => {
        if (i > 0) {
          query += ` AND   `;
        }

        query += ` ${cond.key} ${cond.condition} ${cond.value} `;
      });
    }

  return new Promise((resolve, reject) => {
    connection.execute(query, (err: any, rows: any) => {
      if (err) {
        reject(new AppError("server_error", err.message, 500));
      } else {
        resolve(rows);
      }
    });
  });
};

export const getLatestInserted = (table: table, key: string) => {
  return new Promise((resolve, reject) => {
    connection.execute(
      `select * from ${table} where DATE(${key}) = (select max(DATE(${key})) as latestDate  from ${table});`,
      (err: any, rows: any) => {
        if (err) {
          reject(new AppError("server_error", err.message, 500));
        } else {
          resolve(rows);
        }
      }
    );
  });
};

export const executeQuery = (query: string) => {
  return new Promise((resolve, reject) => {
    connection.execute(query, (err: any, rows: any) => {
      if (err) {
        reject(new AppError("server_error", err.message, 500));
      } else {
        resolve(rows);
      }
    });
  });
};
export default connection;
