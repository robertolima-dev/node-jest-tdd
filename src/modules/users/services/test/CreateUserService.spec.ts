import CreateUserService from '../CreateUserService'
import AppError from '../../../../middlewares/errors/AppError'
import { User } from '../../model/User'

describe('CreateUserService', () => {

    let name: any
    let email: any
    let password: any

    let createUser: any

    beforeEach(() => {

        name = 'Roberto Lima'
        email = 'robertolima+create01@gmail.com'
        password = '123456'

        createUser = new CreateUserService()
    })

    it('should register a new user', async () => {
        const user: User = await createUser.execute({ name, email, password })

        // testes
        expect(user.id).not.toBeNull()
        expect(user.email).toBe(email)
        expect(typeof user).toBe('object')
    })

    it('should return 409 for repeated email', async () => {

        try {
            await createUser.execute({ name, email, password })
        } catch (error: any) {

            // testes
            expect(error.message).toBe('Email is already in use!')
            expect(error).toBeInstanceOf(AppError)
            expect(error.statusCode).toBe(409)
        }
    })
})
