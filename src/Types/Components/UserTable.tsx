export interface UserListProps {
    id?: string;
    name?: string,
    bani?: string,
    avatar?: string,
    username?: string,
    isAdmin?: boolean,
    profileButton: React.MouseEventHandler;
    editButton: React.MouseEventHandler<HTMLButtonElement>;
    deleteButton: React.MouseEventHandler<HTMLButtonElement>;
}