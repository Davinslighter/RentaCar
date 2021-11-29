import { 
  authenticate, 
  TokenService,
  UserService,
} from '@loopback/authentication';
import { TokenServiceBindings, UserServiceBindings } from '@loopback/authentication-jwt';
import { authorize } from '@loopback/authorization';
import { inject } from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  model,
  property,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  HttpErrors,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import { SecurityBindings, securityId, UserProfile } from '@loopback/security';
import _ from 'lodash';
import {LlaveClave, ResetPasswordInit, Usuario} from '../models';
import {Credenciales, UsuarioRepository} from '../repositories';
import { basicAuthorization } from '../services/basic.authorizor';
import { UserManagementService, validarCredenciales, validarLlaveClave } from '../services';

import { OPERATION_SECURITY_SPEC } from '@loopback/authentication-jwt';

import IsEmail from 'isemail';

@model()
export class NuevoUsuarioRequest extends Usuario {
  @property({
    type: 'string',
    required: true,
  })
  password: string;
}


export class UsuarioController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository : UsuarioRepository,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: UserService<Usuario, Credenciales>,
    @inject(UserServiceBindings.USER_SERVICE)
    public userManagementService: UserManagementService,
  ) {}

  @post('/usuarios')
  @response(200, {
    description: 'Usuario model instance',
    content: {'application/json': {schema: {'x-ts-type': Usuario,}}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NuevoUsuarioRequest, {
            title: 'NewUsuario',
            exclude: ['id'],
          }),
        },
      },
    })
    nuevoUsuarioRequest: Omit<NuevoUsuarioRequest, 'id'>,
  ): Promise<Usuario> {
    // rol "cliente" por defecto
    nuevoUsuarioRequest.roles = ["cliente"];
    // verificar credenciales
    validarCredenciales(_.pick(nuevoUsuarioRequest, ['email', 'password']));
    try {
      return await this.usuarioRepository.create(nuevoUsuarioRequest);
    } catch (error) {
      if (error.code === 11000 && error.errmsg.includes('index: uniqueEmail')) {
        throw new HttpErrors.Conflict('Email duplicado');
      } else {
        throw error;
      }
    }
  }

  @get('/usuarios/count')
  @response(200, {
    description: 'Usuario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.count(where);
  }

  @get('/usuarios')
  @response(200, {
    description: 'Array of Usuario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Usuario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Usuario) filter?: Filter<Usuario>,
  ): Promise<Usuario[]> {
    return this.usuarioRepository.find(filter);
  }

  @patch('/usuarios')
  @response(200, {
    description: 'Usuario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.updateAll(usuario, where);
  }

  @get('/usuarios/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'asesor', 'cliente'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Usuario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Usuario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Usuario, {exclude: 'where'}) filter?: FilterExcludingWhere<Usuario>
  ): Promise<Usuario> {
    return this.usuarioRepository.findById(id, filter);
  }

  @patch('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.updateById(id, usuario);
  }

  @put('/usuarios/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'cliente'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Usuario PUT success',
  })
  async replaceById(
    @inject(SecurityBindings.USER)
    usuarioActual: UserProfile,
    @param.path.string('id') id: string,
    @requestBody() usuario: Usuario,
  ): Promise<void> {
    try {
      if(!usuarioActual.roles.includes('admin')) {
        delete usuario.roles;
      }
      return await this.usuarioRepository.replaceById(id, usuario);
    } catch (e) {
      return e;
    }
  }

  @del('/usuarios/{id}')
  @response(204, {
    description: 'Usuario DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.usuarioRepository.deleteById(id);
  }
 
  @post('/usuarios/login')
  @response(200, {
    description: 'Token',
    }
  )
  async login(
    @requestBody() credenciales: Credenciales): Promise<{token: string}> {
      const usuario = await this.userManagementService.verificarCredenciales(credenciales);

      const perfilUsuario = this.userManagementService.convertirPerfilUsuario(usuario);

      const token = await this.jwtService.generateToken(perfilUsuario);

      return {token};
    }
}
/*
 *  En trabajo!
 *
  @put ('/usuarios/clave-olvidada')
  @authenticate('jwt')
  @response(200, {
    description: "Perfil de usuario actualizado",
  })
  async claveOlvidada(
    @inject(SecurityBindings.USER)
    usuarioActual: UserProfile,
    @requestBody() credenciales: Credenciales,
  ): Promise<{token: string}> {
    const {email, password} = credenciales;
    const {id} = usuarioActual;

    const usuario = await this.usuarioRepository.findById(id);

    if (!usuario) {
      throw new HttpErrors.NotFound('Cuenta no encontrada');
    }

    if (email !== usuario?.email) {
      throw new HttpErrors.Forbidden('correo invalido');
    }

    validarCredenciales(_.pick(credenciales, ['email', 'password']));

    await this.usuarioRepository.

    const perfilUsuario = this.userManagementService.convertirPerfilUsuario(usuario);

    const token = await this.jwtService.generateToken(perfilUsuario);

    return {token};
  }
*
*
*/
