import { hash } from "bcrypt";
import { createConnection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

async function create() {
  console.log("---> Trying to connect to database...");
  const connection = await createConnection();
  console.log("---> Connected, creating user...");

  const id = uuidV4();

  const password = await hash("admin", 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, drivers_license )
      values('${id}','admin', 'admin@rentalx.com.br', '${password}', 'true', 'now()', 'XXXXXX')
    `
  );
  await connection.close;
}

create().then(() => {
  console.log("---> Admin user created successfully!");
  console.log("---> Connection closed!");
});
