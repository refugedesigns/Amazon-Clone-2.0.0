const bcrypt = require("bcrypt")


export const encryptPassword = async(password) => {
    const hashedPassword = await bcrypt.hash(password, 12)
    return hashedPassword
}

export const verifyPassword = async (password, hashedPassword) => {
    const isValid = await bcrypt.compare(password, hashedPassword)
    return isValid
}