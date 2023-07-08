import { Handler } from "express";
import { createUserService, retrieveUserByIdService } from "../services/users";

const createUserController: Handler = async (req, res) => {
  const newUser = await createUserService(req.body);
  return res.status(201).send(newUser);
};

const retrieveUserByIdController: Handler = async (req, res) => {
  const userData = await retrieveUserByIdService(req.params.userId);
  return res.status(200).send(userData);
};

export { createUserController, retrieveUserByIdController };
