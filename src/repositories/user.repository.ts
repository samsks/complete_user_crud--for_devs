import AppDataSource from "../data-source";
import User from "../entities/user.entity";

export default AppDataSource.getRepository(User);
