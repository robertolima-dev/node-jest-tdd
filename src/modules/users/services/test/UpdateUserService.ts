import CreateUserService from '../CreateUserService'
import UpdateUserService from '../UpdateUserService'
import AppError from '../../../../middlewares/errors/AppError'
import { User } from '../../model/User'

describe('UpdateUserService', () => {

    let name: any
    let email: any
    let password: any

    let createUser: any
    let updateUser: any

    beforeEach(() => {

        name = 'Roberto Lima'
        email = 'robertolima+update01@gmail.com'
        password = '123456'

        createUser = new CreateUserService()
        updateUser = new UpdateUserService()
    })

    it('should update a user by id', async () => {
        const newUser: User = await createUser.execute({ name, email, password })
        const id = newUser.id
        const newName = 'Roberto Lima 02'
        const user: User = await updateUser.execute({ id, name: newName })

        // testes
        expect(user.id).not.toBeNull()
        expect(typeof user).toBe('object')
        expect(user.name).toEqual(newName)
    })

    it('should return 404 for user not found', async () => {
        const id = jest.mock('uuid')

        try {
            await updateUser.execute({ id })
        } catch (error: any) {

            // testes
            expect(error.message).toBe('User not found!')
            expect(error).toBeInstanceOf(AppError)
            expect(error.statusCode).toBe(404)
        }
    })
})
