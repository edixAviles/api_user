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

interface IDriverUpdateLicencePhoto {
    id: ObjectId
    licencePhoto: string
}

interface IDriverUpdatePoliceRecord {
    id: ObjectId
    policeRecord: string
}

interface IUserUpdatePassword {
    id: ObjectId
    currentPassword: string
    newPassword: string
}

interface IUserUpdateToDriver {
    id: ObjectId
    licencePhoto: string
    policeRecord: string
}

export {
    IUserUpdate,
    IUserUpdateProfilePhoto,
    IDriverUpdateLicencePhoto,
    IDriverUpdatePoliceRecord,
    IUserUpdatePassword,
    IUserUpdateToDriver
}
