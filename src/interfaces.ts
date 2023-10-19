import { Types } from 'mongoose';

export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    city: string;
    address: string;
    password: string;
    role: string;
    createdOn: string;
    _id: Types.ObjectId
    _doc?: IUser
    };

export interface IPizza {
    name: string;
    description: string;
    size: string;
    price: number;
    _id: Types.ObjectId
    _doc?: IPizza
}    