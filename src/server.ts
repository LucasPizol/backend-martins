import Fastify from "fastify";
import { CompanyController } from "./controllers/companyController";
import { UserController } from "./controllers/userController";
import { RoleController } from "./controllers/roleController";
import { PaymentMethodController } from "./controllers/paymentMethodController";
import { PermissionController } from "./controllers/permissionController";
import { AuthMiddleware } from "./middleware/auth";
import cors from "cors";
import { FinanceController } from "./controllers/financeController";
import { SumController } from "./controllers/sumController";
import fastifyMiddleware from "@fastify/express";
import { privateRoutes, publicRoutes } from "./routes";
const PORT = 3000;

const app = Fastify({
  logger: true,
});

app.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
});

app.register(privateRoutes);
app.register(publicRoutes);
