const api = process.env.NODE_ENV === 'production' ? 'https://api.asommforyou.com' : 'http://localhost:7777'


module.exports = {
    i18n: {
        locales: ['en-US'],
        defaultLocale: 'en-US'
    },
    async rewrites() {
        return [
            { source: '/api/:path*', destination: `${api}/:path*`}
        ]
    }
}