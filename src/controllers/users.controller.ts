import { Handler, Response } from "express";
import {
  createUserService,
  deleteUserService,
  disableUserService,
  enableUserService,
  retrieveUserByIdService,
  retrieveUsersService,
  updateUserService,
} from "../services/users";

const createUserController: Handler = async (req, res): Promise<Response> => {
  const newUser = await createUserService(req.body, req.file);
  return res.status(201).send(newUser);
};

const enableUserController: Handler = async (req, res): Promise<Response> => {
  const user = await enableUserService(req.params.userId);
  return res.status(200).json(user);
};

const deleteUserController: Handler = async (req, res): Promise<Response> => {
  await deleteUserService(req.locals!.userRepository!, req.locals!.user!);
  return res.status(204).json();
};

const disableUserController: Handler = async (req, res): Promise<Response> => {
  await disableUserService(req.locals!.userRepository!, req.locals!.user!.id);
  return res.status(204).json();
};

const retrieveUserByIdController: Handler = async (
  req,
  res
): Promise<Response> => {
  const userData = await retrieveUserByIdService(req.locals!.user!);
  return res.status(200).json(userData);
};

const retrieveUsersController: Handler = async (
  req,
  res
): Promise<Response> => {
  const usersData = await retrieveUsersService();
  return res.status(200).json(usersData);
};

const updateUserController: Handler = async (req, res): Promise<Response> => {
  const userData = await updateUserService(
    req.locals!.userRepository!,
    req.locals!.user!,
    req.body
  );
  return res.status(200).json(userData);
};

export {
  createUserController,
  enableUserController,
  deleteUserController,
  disableUserController,
  retrieveUsersController,
  retrieveUserByIdController,
  updateUserController,
};
