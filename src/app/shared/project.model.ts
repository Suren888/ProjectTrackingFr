import { Contact } from "./contact.model";
import { Status } from "./status.model";

export class Project {
    id:number;
    title:string;
    status:Status;
    contacts:Contact[]
}
