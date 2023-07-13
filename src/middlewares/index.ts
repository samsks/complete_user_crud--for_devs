import ensureIsValidDataMiddleware from "./formHandling/ensureValidDataReq.middleware";
import ensureEmailExistsMiddleware from "./validation/users/ensureEmailExists.middleware";
import ensureUsernameExistsMiddleware from "./validation/users/ensureUsernameExists.middleware";
import ensureIsSuperuserMiddleware from "./authorization/ensureIsSuperuser.middleware";
import ensureAuthMiddleware from "./authentication/ensureAuth.middleware";
import ensureIsOwnerOrSuperuserMiddleware from "./authorization/ensureIsOwnerOrSuperuser.middleware";

// AUTHENTICATION
export { ensureAuthMiddleware };

// AUTHORIZATION
export { ensureIsSuperuserMiddleware, ensureIsOwnerOrSuperuserMiddleware };

// FORM HANDLING
export { ensureIsValidDataMiddleware };

// VALIDATION USER
export { ensureEmailExistsMiddleware, ensureUsernameExistsMiddleware };
