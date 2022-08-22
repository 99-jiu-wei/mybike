const Weather = () => {
    const WIDGET = {
        "CONFIG": {
            "modules": "012",
            "background": "5",
            "tmpColor": "000000",
            "tmpSize": "16",
            "cityColor": "000000",
            "citySize": "16",
            "aqiColor": "000000",
            "aqiSize": "16",
            "weatherIconSize": "24",
            "alertIconSize": "18",
            "padding": "10px 10px 10px 10px",
            "shadow": "0",
            "language": "auto",
            "fixed": "false",
            "vertical": "top",
            "horizontal": "left",
            "key": "6e442b9990d94159bb5f5cf7bab28f43"
        }
    }
    return (
        <div>
            <div id="he-plugin-simple"></div>
            <script>{WIDGET}</script>

            <script src="https://widget.qweather.net/simple/static/js/he-simple-common.js?v=2.0"></script>
        </div>
    );
}

export default Weather;