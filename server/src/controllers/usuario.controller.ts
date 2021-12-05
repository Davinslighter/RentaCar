import { service, inject } from '@loopback/core';
import { authenticate, TokenService, UserService } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';
import { SecurityBindings, securityId, UserProfile } from '@loopback/security';
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
  patch,
  put,
  del,
  requestBody,
  response,
  HttpErrors,
} from '@loopback/rest';
import { Llaves } from '../config/llaves';
import {CredencialesUsuario, Usuario, ResetPassword} from '../models';
import {UsuarioRepository} from '../repositories';
import { basicAuthorization, JwtService, UserManagementService } from '../services';
const fetch = require('node-fetch');

export class UsuarioController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository : UsuarioRepository,
    @service(UserManagementService)
    public usuarioManagement :  UserManagementService,
    @service(JwtService)
    public jwtService : JwtService,
  ) {}

  @post('/login')
  @response(200, {
    description: 'Login',
  })
  async login(
    @requestBody() credenciales : CredencialesUsuario
  ) {
    let u = await this.usuarioManagement.verificarUsuario(credenciales.usuario, credenciales.password);
    if (u) {
      let token = this.jwtService.generarToken(u);
      return {
        datos: {
          nombre: u.nombre,
          correo: u.email,
          id: u.id,
        },
        tk: token
      }
    } else {
      throw new HttpErrors[401]("Datos invalidos!");
    }
  }

  @post('/clave-olvidada')
  @response(200, {
    description: 'Recuperar Clave'
  })
  async claveOlvidada(
    @requestBody() resetPassword : ResetPassword,
  ) {
    let u = await this.usuarioManagement.passwordReset(resetPassword.email);
    if (u) {
      let destino = u.email;
      let asunto = 'Recuperar clave!';
      let contenido = `Hola ${u.nombre}, le recordamos que su contraseña es ${u.password}`;
      fetch(`${Llaves.urlNotificaciones}/envio-correo?correo_destino=${destino}&asunto=${asunto}&contenido=${contenido}`)
        .then((data:any) => {
          console.log(data);
        })
        return u;
    } else {
      throw new HttpErrors[401]("Datos no válidos!");
    }
  }

  @post('/usuarios')
  @response(200, {
    description: 'Usuario model instance',
    content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuario',
            exclude: ['id'],
          }),
        },
      },
    })
    usuario: Omit<Usuario, 'id'>,
  ): Promise<Usuario> {
    usuario.roles = ['cliente'];
    let password = this.usuarioManagement.generarClave();
    let crypt = this.usuarioManagement.cifrarClave(password);
    usuario.password = crypt;
    let u = await this.usuarioRepository.create(usuario);

    let destino = usuario.email;
    let asunto = 'Ingreso a Rentacar';
    let contenido = `Hola ${usuario.nombre}, su nombre de usuario es: ${usuario.email} y su contraseña es: ${password}`;
    fetch(`${Llaves.urlNotificaciones}/envio-correo?correo_destino=${destino}&asunto=${asunto}&contenido=${contenido}`)
      .then((data: any) => {
        console.log(data);
      })
    return u;
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
    allowedRoles: ['admin', 'cliente', 'asesor'],
    voters: [basicAuthorization]
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
    voters: [basicAuthorization]
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
      if (!usuarioActual.roles.includes('admin')) {
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
}
