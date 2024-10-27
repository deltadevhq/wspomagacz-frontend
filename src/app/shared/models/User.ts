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

export interface UserResponse {
  id: number;
  username: string;
  display_name: string;
  email: string;
  birthday: string;
  exp: number;
  level: number;
  height: number;
  status: string;
  gender: string;
  weights: UserWeight[];
  last_logged_at: string;
  modified_at: string;
  created_at: string;
}

export const transformUser = (user: UserResponse): User => {
  const {
    birthday,
    modified_at,
    last_logged_at,
    created_at,
    gender,
    status,
    ...rest
  } = user;

  return {
    birthday: new Date(birthday),
    created_at: new Date(created_at),
    modified_at: new Date(modified_at),
    last_logged_at: new Date(last_logged_at),
    gender: UserGender[gender as keyof typeof UserGender],
    status: UserStatus[status as keyof typeof UserStatus],
    ...rest,
  };
};
