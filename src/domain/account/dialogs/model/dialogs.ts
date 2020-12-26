export default interface DialogPreview {
    id: number;
    dialogKey?: string;
    authorName?: string;
    authorGroup?: string;
    avatarUrl?: string;
    message?: string;
    date?: string;
    hasAttachments: boolean;
    hasRead: boolean;
}
