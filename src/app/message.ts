export interface Message {
    id: number,
    content: string,
    createdAt: Date,
    updatedAt: Date,
    deadline: Date,
    link: string,
    icon: string,
    tags: string[],
}