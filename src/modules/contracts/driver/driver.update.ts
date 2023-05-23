import { ObjectId } from "mongodb"

interface IDriverUpdate {
    id: ObjectId
    identification: string
    name: string
    lastName: string
    birthdate: Date
    email: string
    cellPhone: string
}

interface IDriverUpdateProfilePhoto {
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

interface IDriverUpdatePassword {
    id: ObjectId
    currentPassword: string
    newPassword: string
}

export {
    IDriverUpdate,
    IDriverUpdateProfilePhoto,
    IDriverUpdateLicencePhoto,
    IDriverUpdatePoliceRecord,
    IDriverUpdatePassword
}
