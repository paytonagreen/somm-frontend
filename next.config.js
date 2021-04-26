const api = process.env.NODE_ENV === 'production' ? 'https://api.asommforyou.com' : 'http://localhost:7777'


module.exports = {
    async rewrites() {
        return [
            { source: '/api/:path*', destination: `${api}/:path*`}
        ]
    }
}