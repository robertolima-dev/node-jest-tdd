import { User } from "../model/User";
import UserRepositoy from "../repositories/sequelize/UserRepository";

class ListUserService {
    public async execute(): Promise<User[] | null> {

        const userRepositoy = new UserRepositoy()

        let users = await userRepositoy.findAll()

        return users;
    }
}

export default ListUserService;
