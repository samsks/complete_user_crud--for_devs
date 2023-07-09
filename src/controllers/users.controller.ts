import { Handler } from "express";
import {
  createUserService,
  retrieveUserByIdService,
  retrieveUsersService,
  updateUserService,
} from "../services/users";

const createUserController: Handler = async (req, res) => {
  const newUser = await createUserService(req.body);
  return res.status(201).send(newUser);
};

const retrieveUsersController: Handler = async (req, res) => {
  const usersData = await retrieveUsersService();
  return res.status(200).send(usersData);
};

const retrieveUserByIdController: Handler = async (req, res) => {
  const userData = await retrieveUserByIdService(req.params.userId);
  return res.status(200).send(userData);
};

const updateUserController: Handler = async (req, res) => {
  const userData = await updateUserService(req.params.userId, req.body);
  return res.status(200).send(userData);
};

export {
  createUserController,
  retrieveUsersController,
  retrieveUserByIdController,
  updateUserController,
};
