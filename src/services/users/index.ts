import createUser from "./createUser.service";
import retrieveUsers from "./retrieveUsers.service";
import retrieveUserById from "./retrieveUserById.service";
import updateUser from "./updateUser.service";
import deleteUser from "./deleteUser.service";
import disableUser from "./disableUser.service";
import enableUser from "./enableUser.service";

export default {
  createUser,
  enableUser,
  deleteUser,
  disableUser,
  retrieveUsers,
  retrieveUserById,
  updateUser,
};
