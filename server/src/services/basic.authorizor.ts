import { 
  AuthorizationContext, 
  AuthorizationDecision, 
  AuthorizationMetadata 
} from "@loopback/authorization";
import { securityId, UserProfile } from "@loopback/security";
import _ from 'lodash';

export async function basicAuthorization(
  context: AuthorizationContext,
  metadata: AuthorizationMetadata
): Promise<AuthorizationDecision> {
  let usuarioActual: UserProfile;
  if (context.principals.length > 0) {
    const usuario = _.pick(context.principals[0], [
      'id',
      'nombre',
      'roles',
    ]);
    usuarioActual = {[securityId]: usuario.id, nombre: usuario.nombre, roles: usuario.roles};
  } else {
    return AuthorizationDecision.DENY;
  }

  if (!usuarioActual.roles) {
    return AuthorizationDecision.DENY;
  }

  if (!metadata.allowedRoles) {
    return AuthorizationDecision.ALLOW;
  }

  let rolPermitido = false;
  for(const rol of usuarioActual.roles) {
    if (metadata.allowedRoles!.includes(rol)) {
      rolPermitido = true;
      break;
    }
  }

  if(!rolPermitido) {
    return AuthorizationDecision.DENY;
  }

  if (usuarioActual.roles.includes('admin') || usuarioActual.roles.includes('asesor')) {
    return AuthorizationDecision.ALLOW;
  }

  if (usuarioActual[securityId] === context.invocationContext.args[0]) {
    return AuthorizationDecision.ALLOW;
  }

  return AuthorizationDecision.DENY;
}
