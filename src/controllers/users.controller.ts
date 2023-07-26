import { Handler, Response } from "express";
import services from "../services/users";
import { iUserRes, iUserUpdateRes } from "../interfaces/users.interface";

const createUser: Handler = async (req, res): Promise<Response> => {
  const newUser: iUserRes = await services.createUser(req.body, req.file);
  return res.status(201).send(newUser);
};

const enableUser: Handler = async (req, res): Promise<Response> => {
  const user: iUserRes = await services.enableUser(req.params.userId);
  return res.status(200).json(user);
};

const deleteUser: Handler = async (req, res): Promise<Response> => {
  await services.deleteUser(req.locals!.userRepository!, req.locals!.user!);
  return res.status(204).json();
};

const disableUser: Handler = async (req, res): Promise<Response> => {
  await services.disableUser(req.locals!.userRepository!, req.locals!.user!);
  return res.status(204).json();
};

const retrieveUserById: Handler = async (req, res): Promise<Response> => {
  const userData: iUserRes = await services.retrieveUserById(req.locals!.user!);
  return res.status(200).json(userData);
};

const retrieveUsers: Handler = async (req, res): Promise<Response> => {
  const usersData: iUserRes[] = await services.retrieveUsers();
  return res.status(200).json(usersData);
};

const updateUser: Handler = async (req, res): Promise<Response> => {
  const userData: iUserUpdateRes = await services.updateUser(
    req.locals!.userRepository!,
    req.locals!.user!,
    req.body
  );
  return res.status(200).json(userData);
};

export default {
  createUser,
  enableUser,
  deleteUser,
  disableUser,
  retrieveUsers,
  retrieveUserById,
  updateUser,
};
