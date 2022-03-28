/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    // pageExtensions: ['page.tsx'],
    images: {
        domains: [
            'storage.googleapis.com',
            'assets.coingecko.com',
            'assets.axieinfinity.com',
        ],
    },
};
