import { JwtService } from "../services/jwtService";
import { JwtPayload } from "jsonwebtoken";
import { UserService } from "../services/userService";
import { FastifyRequest } from "fastify/types/request";
import { FastifyReply } from "fastify/types/reply";
import { HookHandlerDoneFunction } from "fastify";

type UserType = {
  id?: number;
  name?: string;
  username?: string;
  password?: string;
  permission?: string[];
};

export interface AuthRequest extends FastifyRequest {
  user?: UserType;
}

export abstract class AuthMiddleware {
  static checkAuth(req: AuthRequest, res: FastifyReply, done: HookHandlerDoneFunction) {
    const header = req.headers.authorization;
    if (!header) {
      return res.status(401).send({ error: "Não autorizado: token inválido" });
    }

    const token = header.split("Bearer ")[1];

    JwtService.verifyToken(token, async (err, decoded) => {
      if (err || !decoded)
        return res.status(401).send({
          message: "Não autorizado: token inválido",
        });

      const user = await UserService.getByUsername(
        (decoded as JwtPayload).username
      );

      req.user = user!;

      done()
    });
  }
}
