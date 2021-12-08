import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { TokenService } from '@loopback/authentication';
import { inject } from '@loopback/core';
import { TokenServiceBindings } from '@loopback/authentication-jwt';
import { HttpErrors } from '@loopback/rest';
import { securityId, UserProfile } from '@loopback/security';
import { promisify } from 'util';

const jwt = require('jsonwebtoken');
const signAsync = promisify(jwt.sign);
const verifyAsync = promisify(jwt.verify);

export class JwtService implements TokenService {
  constructor(
   @inject (TokenServiceBindings.TOKEN_SECRET)  
   private jwtSecret: string,
   @inject (TokenServiceBindings.TOKEN_EXPIRES_IN)
   private jwtExpiresIn: string,
    ) {}

  /*
   * Add service methods here
   */

    async verifyToken(token: string) : Promise<UserProfile> {
      if (!token) {
        throw new HttpErrors.Unauthorized("Error verificando el token: el token es nulo");
      }

      let perfilUsuario : UserProfile;

      try {
        const decodedToken = await verifyAsync(token, this.jwtSecret);
        perfilUsuario = Object.assign(
          {[securityId]: '', nombre: ''},
          {
            [securityId]: decodedToken.id,
            nombre: decodedToken.nombre,
            roles: decodedToken.roles,
          },
        );
      } catch (error) {
        throw new HttpErrors.Unauthorized(`Error verifying token : ${error.message}`,)
      };
    return perfilUsuario;
    }
 

  async generateToken (perfilUsuario: UserProfile): Promise<string> {
    if (!perfilUsuario) {
      throw new HttpErrors.Unauthorized( 'Error generating token : userProfile is null',);
    }
    const usuarioInfoToken = {
      id: perfilUsuario[securityId],
      nombre: perfilUsuario.nombre,
      roles: perfilUsuario.roles,
    };

    let token: string;
    try {
      token = await signAsync(usuarioInfoToken, this.jwtSecret, {
        expiresIn: Number(this.jwtExpiresIn),
      });
    } catch (error) {
      throw new HttpErrors.Unauthorized(`Error encoding token : ${error}`);
    }
    return token;
  }
}
