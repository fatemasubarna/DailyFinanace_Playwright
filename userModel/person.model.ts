

export enum Gender {
    Male = "Male",
    Female = "Female",
    Other = "Other"
}

export interface UserModel {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    address: string;
    gender: Gender;
    acceptTerms: boolean;

}
