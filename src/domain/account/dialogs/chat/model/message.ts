export default interface Message {
    id: number;
    avatarUrl?: string;
    authorName?: string;
    message?: string;
    attachments?: Attachment[];
    removeUrl?: string;
}

export interface Attachment {
    url?: string;
    name?: string;
}
