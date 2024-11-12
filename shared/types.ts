export type ColumnType = 'todo' | 'inProgress' | 'completed';

export type Task = {
    userId: number;
    id: number;
    title: string;
    completed: boolean | null;
    inProgress: boolean | null;
    description: string;
};

export type Addtask = {
    title: string;
    description: string;
}
