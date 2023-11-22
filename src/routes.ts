import { Router } from "express";
import { CreatePeopleController } from "./controllers/CreatePeopleController";
import { LoginController } from "./controllers/LoginController";

const routes = Router();

routes.post("/people", new CreatePeopleController().handle);
routes.post("/login", new LoginController().handle);

export default routes;