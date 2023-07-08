import { Handler } from "express";
import createUserService from "../../services/users/createUser.service";

const createUserController: Handler = async (req, res) => {
  const newUser = await createUserService(req.body);
  return res.status(201).send(newUser);
};

export default createUserController;
