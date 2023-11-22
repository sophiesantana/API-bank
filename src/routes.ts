import { Router } from "express";
import { CreatePeopleController } from "./controllers/CreatePeopleController";

const routes = Router();

routes.post("/people", new CreatePeopleController().handle);

export default routes;