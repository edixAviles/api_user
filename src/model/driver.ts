import { object, string, date } from "yup";

interface Driver {
    identification: String;
    name: String;
    lastName: String;
    email: String;
    phone: String;
    createdOn: Date;
    modifiedOn: Date;
}


export default object({
    identification: string().max(64).required(),
    name: string().max(128).required(),
    lastName: string().max(128).required(),
    email: string().email().required(),
    phone: string().max(64).required(),
    createdOn: date(),
    modifiedOn: date(),
})
