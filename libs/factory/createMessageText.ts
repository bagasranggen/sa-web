export type CreateMessageTextProps = {
    isEncoded?: boolean;
    message: string;
};

export const createMessageText = ({ isEncoded = true, message: messageProps }: CreateMessageTextProps) => {
    let message = messageProps ?? '';

    if (isEncoded) message = encodeURIComponent(message);

    return message;
};
