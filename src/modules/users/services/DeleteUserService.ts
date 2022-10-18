import AppError from '../../../middlewares/errors/AppError';
import UserRepositoy from '../repositories/sequelize/UserRepository';

interface IRequest {
    id: string;
}

class DeleteUserService {
    public async execute({ id }: IRequest): Promise<void> {

        const userRepositoy = new UserRepositoy()

        const user = await userRepositoy.findById(id)

        if (!user) {
            throw new AppError("User not found!", 404);
        }

        await userRepositoy.delete(id)

        return
    }
}

export default DeleteUserService;
