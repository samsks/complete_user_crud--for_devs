import ensureIsValidData from "./form-handling/ensureValidDataReq.middleware";
import ensureIsSuperuser from "./authorization/ensureIsSuperuser.middleware";
import ensureAuth from "./authentication/ensureAuth.middleware";
import ensureIsOwnerOrSuperuser from "./authorization/ensureIsOwnerOrSuperuser.middleware";
import uniqueUserFieldValidator from "./validation/uniqueUserFieldValidator.middleware";
import pagination from "./request/pagination.middleware";
import handleError from "./error-handling/handleError.middleware";

export default {
  ensureAuth,
  ensureIsSuperuser,
  ensureIsOwnerOrSuperuser,
  ensureIsValidData,
  uniqueUserFieldValidator,
  pagination,
  handleError,
};
