/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ["https://boroughcrest-api.lws.codes"],
    },
};

module.exports = nextConfig;
