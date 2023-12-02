import { Router } from "express";
import { CreatePeopleController } from "./controllers/CreatePeopleController";
import { LoginController } from "./controllers/LoginController";
import { CreateAccountController } from "./controllers/CreateAccountController";
import { GetAccountsController } from "./controllers/GetAccountsController";
import { CreateCardController } from "./controllers/CreateCardController";
import { GetCardsController } from "./controllers/GetCardsController";
import { GetCardsByPersonController } from "./controllers/GetCardsByPersonController";
import { CreateTransactionController } from "./controllers/CreateTransactionController";
import { GetTransactionController } from "./controllers/GetTransactionController";
import { GetBalanceController } from "./controllers/GetBalanceController";
const validateJWT = require("./Auth/ValidateJWT");

const routes = Router();

routes.post("/people", new CreatePeopleController().handle);
routes.post("/login", new LoginController().handle);
routes.post("/accounts", validateJWT, new CreateAccountController().handle);
routes.get("/accounts", validateJWT, new GetAccountsController().handle);
routes.post("/accounts/:account_id/cards", validateJWT, new CreateCardController().handle);
routes.get("/accounts/:account_id/cards", validateJWT, new GetCardsController().handle);
routes.get("/accounts/cards", validateJWT, new GetCardsByPersonController().handle);
routes.post("/accounts/:account_id/transactions", validateJWT, new CreateTransactionController().handle);
routes.get("/accounts/:account_id/transactions", validateJWT, new GetTransactionController().handle);
routes.get("/accounts/:account_id/balance", validateJWT, new GetBalanceController().handle);


export default routes;