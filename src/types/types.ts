export type Company = {
    bs: string;
    catchPhrase: string;
    name: string;
};

export type User = {
    id: number;
    email: string;
    name: string;
    phone: string;
    username: string;
    website: string;
    company: Company;
    address: string
};

export interface IUserInfoProps {
    user: User;
}

export interface IButtonProps {
    onClick: React.MouseEventHandler;
}
