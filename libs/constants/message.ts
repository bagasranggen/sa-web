import { ArrayStringProps } from '@/libs/@types';
import { joinArrayString } from '@/libs/utils';

export const GENERAL_CONTACT_MESSAGE = `
Hi Sekar Ayu!

Saya ingin berkonsultasi mengenai kebutuhan dress. Mohon informasinya ya Kak. Terima kasih
`;

export const ORDER_CONTACT_MESSAGE = ({ name, id, date }: { name?: string; id?: string; date?: string }) => {
    let title: ArrayStringProps = [];
    if (name) title.push(name);
    if (id) title.push(id);
    title = joinArrayString(title, ' - ');

    return `Halo Sekar Ayu, saya ingin menanyakan ketersediaan dress berikut:

* Nama - Code Dress: *${title}*
* Tanggal Pemakaian: *${date}*

Apakah dress tersebut masih tersedia? Terima kasih ✨`;
};
