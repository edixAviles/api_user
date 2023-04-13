abstract class BaseModel {
    id?: Int32Array
    createdTime: Date
    creatorId?: Int32Array
    lastModificationTime: Date
    lastModifierId?: Int32Array
    IsDeleted: Boolean
    deletionTime?: Date
    deleterId?: Int32Array
}

export default BaseModel
