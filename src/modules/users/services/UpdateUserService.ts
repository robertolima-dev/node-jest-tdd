import AppError from "../../../middlewares/errors/AppError";
import { User } from "../model/User";
import UserRepositoy from "../repositories/sequelize/UserRepository";

interface IRequest {
    id: string
    name: string
}

class UpdateUserService {
    public async execute({ id, name }: IRequest): Promise<User> {

        const userRepositoy = new UserRepositoy()

        const user = await userRepositoy.findById(id)

        if (!user) {
            throw new AppError("User not found!", 404);
        }

        const data = {
            name
        }

        await userRepositoy.update(id, data)

        const userResponse = await userRepositoy.findById(id)
        return userResponse;
    }
}

export default UpdateUserService;
