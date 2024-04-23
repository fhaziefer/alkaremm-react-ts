export interface UserListProps {
    id?: string;
    name?: string,
    bani?: string,
    avatar?: string,
    username?: string,
    isAdmin?: boolean,
    profileBani?: ProfileBani[]
    profileButton: React.MouseEventHandler;
    editButton: React.MouseEventHandler<HTMLButtonElement>;
    deleteButton: React.MouseEventHandler<HTMLButtonElement>;
}

interface ProfileBani {
    bani?: Bani;
}

interface Bani {
    id?: number;
    bani_name?: string;
}