import { Pool, PoolConfig } from "pg";

const localConfig: PoolConfig = {
  host: "127.0.0.1",
  user: "aws",
  password: "aws",
  database: "aws",
  port: 5432,
};

const prodConfig: PoolConfig = {
  host: "",
  user: "",
  password: "",
  database: "",
  port: 5432,
};

export const connectDatabase = () => {
  const pool = new Pool((global as any).isProd ? prodConfig : localConfig);
  return pool.connect();
};

export const createTable = () => {};
