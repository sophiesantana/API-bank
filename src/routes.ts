import { Router } from "express";
import { PeopleController } from "./controllers/PeopleController";

const routes = Router();

routes.post("/people", new PeopleController().handle);

export default routes;