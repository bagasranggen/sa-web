export const GENERAL_CONTACT_MESSAGE = `
Hi Sekar Ayu!

Saya ingin berkonsultasi mengenai kebutuhan dress. Mohon informasinya ya Kak. Terima kasih
`;

export const ORDER_CONTACT_MESSAGE = ({ name, date }: { name?: string; date?: string }) => {
    return `Halo Sekar Ayu, saya ingin menanyakan ketersediaan dress berikut:

* Nama - Code Dress: *${name}*
* Tanggal Pemakaian: *${date}*

Apakah dress tersebut masih tersedia? Terima kasih ✨`;
};
