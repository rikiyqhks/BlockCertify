/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    experimental: {
        serverActions: true,
    },
    images: {
        domains: ['eeflgyxivqvgvwrufgpf.supabase.co']
    },
}

module.exports = nextConfig
