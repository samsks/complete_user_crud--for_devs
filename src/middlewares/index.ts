import ensureIsValidData from "./formHandling/ensureValidDataReq.middleware";
import ensureEmailExists from "./validation/users/ensureEmailExists.middleware";
import ensureUsernameExists from "./validation/users/ensureUsernameExists.middleware";
import ensureIsSuperuser from "./authorization/ensureIsSuperuser.middleware";
import ensureAuth from "./authentication/ensureAuth.middleware";
import ensureIsOwnerOrSuperuser from "./authorization/ensureIsOwnerOrSuperuser.middleware";

export default {
  ensureAuth,
  ensureIsSuperuser,
  ensureIsOwnerOrSuperuser,
  ensureIsValidData,
  ensureEmailExists,
  ensureUsernameExists,
};
