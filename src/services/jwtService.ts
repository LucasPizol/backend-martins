import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET!;

export abstract class JwtService {
  static signToken(payload: string | object | Buffer, expiration: string) {
    return jwt.sign(payload, secret, {
      expiresIn: expiration,
    });
  }

  static verifyToken(token: string, callbackfn: jwt.VerifyCallback) {
    jwt.verify(token, secret, callbackfn);
  }
}
