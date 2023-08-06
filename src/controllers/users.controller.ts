import { Handler, Response } from "express";
import userServices from "../services/users";
import avatarServices from "../services/avatars";
import {
  iSuperuserPagRes,
  iUserRes,
  iUserUpdateRes,
} from "../interfaces/users.interface";

const services = {
  user: userServices,
  avatar: avatarServices,
};

const createUser: Handler = async (req, res): Promise<Response> => {
  const newUser: iUserRes = await services.user.createUser(req.body, req.file);
  return res.status(201).send(newUser);
};

const enableUser: Handler = async (req, res): Promise<Response> => {
  const user: iUserRes = await services.user.enableUser(req.params.userId);
  return res.status(200).json(user);
};

const deleteUser: Handler = async (req, res): Promise<Response> => {
  await services.user.deleteUser(
    req.locals!.userRepository!,
    req.locals!.user!
  );
  return res.status(204).json();
};

const disableUser: Handler = async (req, res): Promise<Response> => {
  await services.user.disableUser(
    req.locals!.userRepository!,
    req.locals!.user!
  );
  return res.status(204).json();
};

const retrieveUserById: Handler = async (req, res): Promise<Response> => {
  const userData: iUserRes = await services.user.retrieveUserById(
    req.locals!.user!
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
    req.locals!.userRepository!,
    req.locals!.user!,
    req.body
  );
  return res.status(200).json(userData);
};

const changeAvatar: Handler = async (req, res): Promise<Response> => {
  const avatar = await services.avatar.changeAvatar(
    req.file!,
    req.locals!.user!
  );
  return res.status(201).json(avatar);
};

const deleteAvatar: Handler = async (req, res): Promise<Response> => {
  await services.avatar.deleteAvatar(req.locals?.user!);
  return res.status(204).json();
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
};
