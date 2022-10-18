import AppError from "../../../middlewares/errors/AppError";
import { User } from "../model/User";
import UserRepositoy from "../repositories/sequelize/UserRepository";

interface IRequest {
    id: string
    name: string
    email?: string
}

class UpdateUserService {
    public async execute({ id, name, email }: IRequest): Promise<User> {

        const userRepositoy = new UserRepositoy()

        const user = await userRepositoy.findById(id)

        if (!user) {
            throw new AppError("User not found!", 404);
        }

        if (email) {
            const emailExists = await userRepositoy.findByEmail(email)

            if (emailExists && emailExists.id !== id) {
                throw new AppError("Email is already in use!", 409);
            }
        }

        const data = {
            name,
            email
        }

        await userRepositoy.update(id, data)

        const userResponse = await userRepositoy.findById(id)
        return userResponse;
    }
}

export default UpdateUserService;
