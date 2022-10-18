import MathCountService from '../MathCountService'
import AppError from '../../../../middlewares/errors/AppError'

describe('MathCountService', () => {

    let math: any

    beforeEach(() => {

        math = new MathCountService()
    })

    it('should return 409 for no equation sent', async () => {

        try {
            await math.execute({ isSum: false, isRadius: false, isBaskara: false })
        } catch (error: any) {

            expect(error.message).toBe('Tipo de equação não enviada!')
            expect(error).toBeInstanceOf(AppError)
            expect(error.statusCode).toBe(409)
        }
    })

    it('should return 409 for more than one equation', async () => {

        try {
            await math.execute({ isSum: true, isRadius: true })
        } catch (error: any) {

            expect(error.message).toBe('Mais de uma equação enviada!')
            expect(error).toBeInstanceOf(AppError)
            expect(error.statusCode).toBe(409)
        }
    })

    it('should calculate radius', async () => {

        const result = await math.execute({ isRadius: true, n1: 12, n2: 14, n3: 16 })
        expect(result.r1).toBe(37.68)
        expect(result.r2).toBe(43.96)
        expect(result.r3).toBe(50.24)

    })

    it('should return 400 for radius equation without params', async () => {

        try {
            await math.execute({ isRadius: true })
        } catch (error: any) {

            expect(error.message).toBe('Parametros não foi enviado!')
            expect(error).toBeInstanceOf(AppError)
            expect(error.statusCode).toBe(400)
        }
    })

    it('should calculate sum of two numbers', async () => {

        const result = await math.execute({ isSum: true, n1: 5, n2: 7 })
        expect(result.r1).toBe(12)

    })

    it('should calculate sum of three numbers', async () => {

        const result = await math.execute({ isSum: true, isSumThree: true, n1: 5, n2: 7, n3: 10 })
        expect(result.r1).toBe(22)

    })

    it('should return 400 for sum equation without params', async () => {

        try {
            await math.execute({ isSum: true, n1: 5 })
        } catch (error: any) {

            expect(error.message).toBe('Parametros n1 ou n2 não foram enviados!')
            expect(error).toBeInstanceOf(AppError)
            expect(error.statusCode).toBe(400)
        }
    })

    it('should return 400 for sum equation isSumThree without n3 param', async () => {

        try {
            await math.execute({ isSum: true, isSumThree: true, n1: 5, n2: 7 })
        } catch (error: any) {

            expect(error.message).toBe('Parametros n3 não foram enviados!')
            expect(error).toBeInstanceOf(AppError)
            expect(error.statusCode).toBe(400)
        }
    })

    it('should calculate Baskara equation', async () => {

        const result = await math.execute({ isBaskara: true, n1: 1, n2: 2, n3: -3 })
        expect(result.x1).toBe(1)
        expect(result.x2).toBe(-3)

    })

    it('should return 400 for Baskara equation to delta < then 0', async () => {

        try {
            await math.execute({ isBaskara: true, n1: 2, n2: 2, n3: 2 })
        } catch (error: any) {

            expect(error.message).toBe('Sem raízes reais!')
            expect(error).toBeInstanceOf(AppError)
            expect(error.statusCode).toBe(400)
        }
    })

    it('should return 400 for Baskara equation without params n1, n2 and n3', async () => {

        try {
            await math.execute({ isBaskara: true, n1: 2, n2: 2 })
        } catch (error: any) {

            expect(error.message).toBe('Insira os valores de n1, n2 e n3!')
            expect(error).toBeInstanceOf(AppError)
            expect(error.statusCode).toBe(400)
        }
    })
})
