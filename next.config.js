/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    images: {
        domains: ['eeflgyxivqvgvwrufgpf.supabase.co']
    },
}

module.exports = nextConfig
