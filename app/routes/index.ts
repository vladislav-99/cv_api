import { Express } from "express";
import userRouter from "./user.routes";
import technologyRouter from "./technology.routes";
import projectRouter from "./project.routes";

export default function connectRouter(app: Express) {
  app.use("/api", userRouter);
  app.use("/api", technologyRouter);
  app.use("/api", projectRouter);
}
