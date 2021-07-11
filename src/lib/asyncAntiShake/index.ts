export default function asyncAntiShake (request: any, cxt: any = undefined) {
    const requestBox = {}
    if (
        typeof request === 'function'
    ) {
        const newRequest = async function (...args: any) {
            const key = JSON.stringify(args)
            if (!requestBox[key]) {
                requestBox[key] = request.apply(cxt, args)
            }
            try {
                if (
                    typeof requestBox[key].then === 'function' &&
                    typeof requestBox[key].catch === 'function' &&
                    typeof requestBox[key].finally === 'function'
                ) {
                    const res = await requestBox[key]
                    return res
                } else {
                    return requestBox[key]
                }
            } catch (e) {
                throw new Error(e)
            } finally {
                delete requestBox[key]
            }
        }
        for (var key in request) {
            if (request.hasOwnProperty(key)) {
                newRequest[key] = asyncAntiShake(request[key])
            }
        }
    } else {
        return request
    }

}