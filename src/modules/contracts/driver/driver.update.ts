import { ObjectId } from "mongodb"

interface IUserUpdate {
    id: ObjectId
    identification: string
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

interface IUserUpdateLicencePhoto {
    id: ObjectId
    licencePhoto: string
}

interface IUserUpdatePoliceRecord {
    id: ObjectId
    policeRecord: string
}

interface IUserUpdatePassword {
    id: ObjectId
    currentPassword: string
    newPassword: string
}

export {
    IUserUpdate,
    IUserUpdateProfilePhoto,
    IUserUpdateLicencePhoto,
    IUserUpdatePoliceRecord,
    IUserUpdatePassword
}
