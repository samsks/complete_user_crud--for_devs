import ensureIsValidData from "./formHandling/ensureValidDataReq.middleware";
import ensureIsSuperuser from "./authorization/ensureIsSuperuser.middleware";
import ensureAuth from "./authentication/ensureAuth.middleware";
import ensureIsOwnerOrSuperuser from "./authorization/ensureIsOwnerOrSuperuser.middleware";
import uniqueUserFieldValidator from "./validation/uniqueUserFieldValidator.middleware";

export default {
  ensureAuth,
  ensureIsSuperuser,
  ensureIsOwnerOrSuperuser,
  ensureIsValidData,
  uniqueUserFieldValidator,
};
