import { Handler, Response } from "express";
import userServices from "../services/users";
import avatarServices from "../services/avatars";
import emailServices from "../services/emails";
import {
  iSuperuserPagRes,
  iUserRes,
  iUserResWithAvatar,
  iUserUpdateRes,
} from "../interfaces/users.interface";
import { iAvatarResPath } from "../interfaces/photos.interface";

const services = {
  user: userServices,
  avatar: avatarServices,
  email: emailServices,
};

const createUser: Handler = async (req, res): Promise<Response> => {
  const newUser: iUserResWithAvatar = await services.user.createUser(
    req.body,
    req.file
  );
  return res.status(201).send(newUser);
};

const enableUser: Handler = async (req, res): Promise<Response> => {
  const user: iUserRes = await services.user.enableUser(req.params.userId);
  return res.status(200).json(user);
};

const deleteUser: Handler = async (req, res): Promise<Response> => {
  await services.user.deleteUser(res.locals.paramsUser);
  return res.status(204).json();
};

const disableUser: Handler = async (req, res): Promise<Response> => {
  await services.user.disableUser(res.locals.paramsUser);
  return res.status(204).json();
};

const retrieveUserById: Handler = async (req, res): Promise<Response> => {
  const userData: iUserResWithAvatar = await services.user.retrieveUserById(
    res.locals.paramsUser
  );
  return res.status(200).json(userData);
};

const retrieveUsers: Handler = async (req, res): Promise<Response> => {
  const usersData: iSuperuserPagRes = await services.user.retrieveUsers(
    res.locals.pagination
  );
  return res.status(200).json(usersData);
};

const updateUser: Handler = async (req, res): Promise<Response> => {
  const userData: iUserUpdateRes = await services.user.updateUser(
    res.locals.paramsUser,
    req.body
  );
  return res.status(200).json(userData);
};

const changeAvatar: Handler = async (req, res): Promise<Response> => {
  const avatar: iAvatarResPath = await services.avatar.changeAvatar(
    req.file!,
    res.locals.paramsUser
  );
  return res.status(201).json(avatar);
};

const deleteAvatar: Handler = async (req, res): Promise<Response> => {
  await services.avatar.deleteAvatar(res.locals.paramsUser);
  return res.status(204).json();
};

const resetPasswordSendMail: Handler = async (req, res): Promise<Response> => {
  await services.email.resetPasswordSendEmail(
    req.body.email,
    req.protocol,
    req.get("host")!
  );
  return res.status(200).json({ message: "Email successfully sent" });
};

const resetPassword: Handler = async (req, res): Promise<Response> => {
  await services.email.resetPassword(req.body.password, req.params.resetToken);

  return res.json({ message: "Successfully updated password" });
};

export default {
  createUser,
  enableUser,
  deleteUser,
  disableUser,
  retrieveUsers,
  retrieveUserById,
  updateUser,
  changeAvatar,
  deleteAvatar,
  resetPasswordSendMail,
  resetPassword,
};
