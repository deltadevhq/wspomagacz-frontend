export enum UserStatus {
    Active = 'Aktywny',
    Inactive = 'Nieaktywny',
    Blocked = 'Zawieszony',
}

export enum UserGender {
    Male = 'Mężczyzna',
    Female = 'Kobieta',
    NotSpecified = 'Wolę nie podawać',
}

export interface UserWeight {
    weight: number;
    date: Date;
}

export interface User {
    id: number;
    username: string;
    display_name: string;
    gender: UserGender;
    birthday: Date;
    status: UserStatus;
    level: number;
    exp: number;
    weights: UserWeight[];
    height: number;
    created_at: Date;
    modified_at: Date;
    last_logged_at: Date;
}
