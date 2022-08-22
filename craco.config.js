const CracoLessPlugin = require('craco-less');

module.exports = {
    devtool: "source-map",
    babel: {
        plugins: [
            [
                "import",
                {
                    "libraryName": "antd",
                    "libraryDirectory": "es",
                    "style": true //设置为true即是less
                }
            ]
        ],
    },
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: { '@primary-color': '#f9c700' },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ]
}