import express from "express";

import { categoryRoutes } from "./routes/category.routes";
import { specificationsRoutes } from "./routes/specifications.routes";

const app = express();

app.use(express.json());

app.use("/categories", categoryRoutes);
app.use("/specifications", specificationsRoutes);

app.listen(3333, () => console.log("Server is up and running!"));
