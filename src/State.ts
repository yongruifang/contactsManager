import { StringOrNull } from './Types';

/**
 * 提供要绑定的状态
 * 状态可以是一个接口，描述我们想要使用的属性
 */
export interface IPersonState {
    FirstName: string,
    LastName: string,
    Address1: string,
    Address2: StringOrNull,
    Town: string,
    County: string,
    PhoneNumber: string;
    Postcode: string,
    DateOfBirth: StringOrNull,
    PersonId: string
}

export class PersonState implements IPersonState {
    public FirstName: string;
    public LastName: string;
    public Address1: string;
    public Address2: StringOrNull;
    public Town: string;
    public County: string;
    public PersonId: string;
    public PhoneNumber: string;
    public Postcode: string;
    public DateOfBirth: StringOrNull;
    constructor() {
        this.FirstName = "";
        this.LastName = "";
        this.Address1 = "";
        this.Address2 = null;
        this.Town = "";
        this.County = "";
        this.PersonId = "";
        this.PhoneNumber = "";
        this.Postcode = "";
        this.DateOfBirth = new Date().toISOString().substring(0, 10);
    }
}