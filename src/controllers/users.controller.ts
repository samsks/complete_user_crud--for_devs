import { Handler } from "express";
import {
  createUserService,
  deleteUserService,
  disableUserService,
  enableUserService,
  retrieveUserByIdService,
  retrieveUsersService,
  updateUserService,
} from "../services/users";

const createUserController: Handler = async (req, res) => {
  const newUser = await createUserService(req.body);
  return res.status(201).send(newUser);
};

const enableUserController: Handler = async (req, res) => {
  const user = await enableUserService(req.params.userId);
  return res.status(200).send(user);
};

const deleteUserController: Handler = async (req, res) => {
  await deleteUserService(req.locals!.userRepository!, req.locals!.user!);
  return res.status(204).send();
};

const disableUserController: Handler = async (req, res) => {
  await disableUserService(req.locals!.userRepository!, req.locals!.user!.id);
  return res.status(204).send();
};

const retrieveUserByIdController: Handler = async (req, res) => {
  const userData = await retrieveUserByIdService(req.locals!.user!);
  return res.status(200).send(userData);
};

const retrieveUsersController: Handler = async (req, res) => {
  const usersData = await retrieveUsersService();
  return res.status(200).send(usersData);
};

const updateUserController: Handler = async (req, res) => {
  const userData = await updateUserService(req.params.userId, req.body);
  return res.status(200).send(userData);
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
