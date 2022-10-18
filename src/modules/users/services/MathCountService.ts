import AppError from '../../../middlewares/errors/AppError';

interface IRequest {
    n1: number
    n2: number
    n3: number
    isRadius: boolean
    isSum: boolean
    isSumThree: boolean
    isBaskara: boolean
}

class MathCountService {
    public async execute({ n1, n2, n3, isRadius, isSum, isSumThree, isBaskara }: IRequest): Promise<any> {

        if (!isRadius && !isSum && !isBaskara) {

            throw new AppError("Tipo de equação não enviada!", 409)

        }

        if ((isRadius && isSum) || (isRadius && isBaskara) || (isSum && isBaskara)) {

            throw new AppError("Mais de uma equação enviada!", 409)

        }

        if (isRadius) {

            const PI = 3.14

            if (n1 || n2 || n3) {

                return calculateRadius(PI, n1, n2, n3)

            } else {

                throw new AppError("Parametros não foi enviado!", 400)

            }
        }


        if (isSum) {

            if (isSumThree) {

                if (n1 && n2 && n3) {

                    return sumThreeNumbers(n1, n2, n3)

                } else {

                    throw new AppError("Parametros n3 não foram enviados!", 400)

                }

            } else {

                if (n1 && n2) {

                    return sumTwoNumbers(n1, n2)

                } else {

                    throw new AppError("Parametros n1 ou n2 não foram enviados!", 400)

                }
            }
        }


        if (isBaskara) {

            const a = n1
            const b = n2
            const c = n3

            const delta = b * b - 4 * a * c

            if (!a || !b || !c) {

                throw new AppError("Insira os valores de n1, n2 e n3!", 400)

            } else if (delta < 0) {

                throw new AppError("Sem raízes reais!", 400)

            } else {

                const result = calculateBaskara(delta, a, b, c,)

                return result

            }
        }

        function calculateRadius(PI: any, n1: any, n2: any, n3: any) {
            const r1 = n1 * PI
            const r2 = n2 * PI
            const r3 = n3 * PI
            return { r1, r2, r3 }
        }

        function sumTwoNumbers(n1: any, n2: any) {
            return { r1: n1 + n2 }
        }

        function sumThreeNumbers(n1: any, n2: any, n3: any) {
            return { r1: n1 + n2 + n3 }
        }

        function calculateBaskara(delta: any, a: any, b: any, c: any) {
            const x1 = (-b + Math.sqrt(delta)) / (2 * a)
            const x2 = (-b - Math.sqrt(delta)) / (2 * a)

            return { x1, x2 }
        }

    }
}

export default MathCountService;
