import { Router } from "express";
import { CreatePeopleController } from "./controllers/CreatePeopleController";
import { LoginController } from "./controllers/LoginController";
import { CreateAccountController } from "./controllers/CreateAccountController";
import { GetAccountsController } from "./controllers/GetAccountsController";
import { CreateCardController } from "./controllers/CreateCardController";
const validateJWT = require("./Auth/ValidateJWT");

const routes = Router();

routes.post("/people", new CreatePeopleController().handle);
routes.post("/login", new LoginController().handle);
routes.post("/accounts", validateJWT, new CreateAccountController().handle);
routes.get("/accounts", validateJWT, new GetAccountsController().handle);
routes.post("/accounts/:account_id/cards", validateJWT, new CreateCardController().handle);


export default routes;