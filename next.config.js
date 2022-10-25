/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ["boroughcrest-api.lws.codes"],
    },
};

module.exports = nextConfig;
