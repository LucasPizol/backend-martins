import { FastifyInstance } from "fastify";
import { AuthMiddleware } from "./middleware/auth";
import { UserController } from "./controllers/userController";
import { PermissionController } from "./controllers/permissionController";
import { PaymentMethodController } from "./controllers/paymentMethodController";
import { CompanyController } from "./controllers/companyController";
import { RoleController } from "./controllers/roleController";
import { FinanceController } from "./controllers/financeController";
import { SumController } from "./controllers/sumController";

export const privateRoutes = async (app: FastifyInstance) => {
  app.addHook("preHandler", AuthMiddleware.checkAuth)
  app.get("/company", CompanyController.get);
  app.get("/user", UserController.getByUsername);
  app.get("/role", RoleController.get);
  app.get("/paymentMethod", PaymentMethodController.get);
  app.post("/permission", PermissionController.addPermission);
  app.put("/company/:id", CompanyController.update);
  app.post("/finance", FinanceController.create);
  app.get("/finance", FinanceController.get);
  app.get("/sum", SumController.get);
};

export const publicRoutes = async (app: FastifyInstance) => {
  app.post("/login", UserController.login);
};
