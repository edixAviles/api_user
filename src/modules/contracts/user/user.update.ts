import { ObjectId } from "mongodb"

interface IUserUpdate {
    id: ObjectId
    name: string
    lastName: string
    birthdate: Date
    email: string
    cellPhone: string
}

interface IUserUpdateProfilePhoto {
    id: ObjectId
    profilePhoto: string
}

interface IUserUpdatePassword {
    id: ObjectId
    currentPassword: string
    newPassword: string
}

export {
    IUserUpdate,
    IUserUpdateProfilePhoto,
    IUserUpdatePassword
}
