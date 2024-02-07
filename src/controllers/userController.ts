import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { JwtService } from "../services/jwtService";
import { FastifyReply } from "fastify/types/reply";
import { FastifyRequest } from "fastify/types/request";
import { AuthRequest } from "../middleware/auth";

export abstract class UserController {
  static async getByUsername(req: AuthRequest, res: FastifyReply) {
    const { username } = req.query as any;

    try {
      const users = await UserService.getByUsername(String(username));
      return res.status(200).send(users);
    } catch (error: any) {
      return res.status(400).send({ error: error.message });
    }
  }

  static async login(req: FastifyRequest, res:FastifyReply) {
    const { username, password } = req.body as any;

    try {
      const user = await UserService.getByUsername(username);

      if (!user) {
        return res.status(401).send({ error: "Usuário ou senha incorretos" });
      }

      if (user.password !== password) {
        return res.status(401).send({ error: "Usuário ou senha incorretos" });
      }

      const payload = {
        name: user.name,
        username: user.username,
        permission: user.permission,
      };

      const token = JwtService.signToken(payload, "7d");

      return res.status(200).send({
        ...payload,
        token,
      });
    } catch (error) {
      return res.status(401).send({ error: "Usuário ou senha incorretos" });
    }
  }
}
