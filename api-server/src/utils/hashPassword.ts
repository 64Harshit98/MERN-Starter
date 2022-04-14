
import bcrypt from "bcryptjs"

const hashPassword = (password: string): Promise<any> => {
    var promise = new Promise((resolve, reject) => {
        // Encryption of the string password
        bcrypt.genSalt(10, function (err: Error, Salt: string) {

            // The bcrypt is used for encrypting password.
            bcrypt.hash(password, Salt, function (err: Error, hash: string) {

                if (err) {
                    reject('Cannot encrypt')
                }
                resolve(hash)
            })
        })
    })
    return promise
}

const compareHashedPassword = (plainPassword: string, hashedPassword: string): Promise<any> => {
    var promise = new Promise((resolve, reject) => {
        bcrypt.compare(plainPassword, hashedPassword, function (err, result) {
            if (result) resolve(result)
            reject(err)
        });
    })
    return promise
}
export { hashPassword, compareHashedPassword }
