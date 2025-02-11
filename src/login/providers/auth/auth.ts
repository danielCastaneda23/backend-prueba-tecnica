import * as jose from 'jose';

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma-service/prisma.service';
import { userSchemaLogin } from 'src/login/schemas/login.schema';

@Injectable()
export class Auth {
  secretGenerated: jose.JWK;
  constructor(private prismaService: PrismaService) {
    void this.generateSecret().then((secret) => {
      this.secretGenerated = secret;
    });
  }
  public async createToken(payload: { userId: string; role: any }) {
    const secretGenerated = await jose.importJWK(this.secretGenerated);
    const jwtInstanceObject = new jose.SignJWT(payload);
    const token = jwtInstanceObject
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setIssuer('')
      .setAudience('')
      .setExpirationTime('30min')
      .sign(secretGenerated);
    return token;
  }

  private async generateSecret(): Promise<jose.JWK> {
    const secretGenerated: jose.KeyLike | Uint8Array =
      await jose.generateSecret('HS256');
    let privateJwk = await jose.exportJWK(secretGenerated);
    const algorithmOptions = {
      kty: 'oct',
      use: 'sign',
      key_ops: ['sign', 'verify'],
      alg: 'HS256',
      kid: crypto.randomUUID(),
      crv: 'P-256',
    };
    privateJwk = { ...privateJwk, ...algorithmOptions };
    return privateJwk;
  }

  public async validateToken(token: string) {
    const secretGenerated = await jose.importJWK(this.secretGenerated);
    try {
      const res = await jose.jwtVerify(token, secretGenerated);
      return {
        isValid: true,
        role: res.payload['role'],
        userId: res.payload['userId'] as string,
      };
    } catch (error: any) {
      throw new Error('Invalid Token' + error);
    }
  }

  public async validateUser(payload: typeof userSchemaLogin) {
    try {
      console.log(payload['email'], payload['password']);
      const isUser = await this.prismaService.user.findUnique({
        where: {
          email: payload['email'],
        },
        include: {
          roleOwner: true,
        },
      });
      if (isUser) {
        if (payload['password'] === isUser.password) {
          return await this.createToken({
            userId: isUser.id,
            role: isUser.roleName,
          });
        } else {
          throw new Error('Invalid password');
        }
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
