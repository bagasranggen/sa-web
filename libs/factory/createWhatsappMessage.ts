export type CreateWhatsappMessageProps = {
    number?: string;
    message: string;
};

export const createWhatsappMessage = ({ number, message }: CreateWhatsappMessageProps) => {
    let data = '';

    if (number && message) data = `https://wa.me/${number}?text=${message}`;

    return data;
};
