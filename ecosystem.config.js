const port = process.env.PORT || 8888
const name = process.env.INSTANCE_NAME || "aga-live"

module.exports = {
    apps: [
        {
            name,
            script: 'node_modules/next/dist/bin/next',
            args: `start -p ${port}`,
        },
    ],
}