export default interface DialogPreviewModel {
    id: number;
    dialogKey?: string;
    authorName?: string;
    authorGroup?: string;
    avatarUrl?: string;
    message?: string;
    date?: string;
    senderImageUrl?: string;
    senderName?: string;
    hasAttachments: boolean;
    hasRead: boolean;
}
