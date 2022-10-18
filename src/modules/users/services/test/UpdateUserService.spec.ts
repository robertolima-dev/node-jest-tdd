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

    // it('test description', () => {
    //     expect(1).toBe(1)
    // })

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

    it('should return 409 for repeated email', async () => {

        await createUser.execute({ name, email: 'email-teste@gmail.com', password })
        const newUser: User = await createUser.execute({ name, email: 'robertolima+update02@gmail.com', password })

        try {
            await updateUser.execute({ id: newUser.id, email: 'email-teste@gmail.com' })
        } catch (error: any) {

            // testes
            expect(error.message).toBe('Email is already in use!')
            expect(error).toBeInstanceOf(AppError)
            expect(error.statusCode).toBe(409)
        }
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
