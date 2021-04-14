import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (host = "database"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  const connection = createConnection(
    Object.assign(defaultOptions, {
      host,
    })
  );
  console.log("---> Connected to database!");
  return connection;
};
