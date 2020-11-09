export enum Lang {
    RU = "ru_RU",
    EN = "en_EN"
}

export type LatLng = {
    latitude: number;
    longitude: number;
};

export type MapSettings = {
    apiKey: string;
    lang: Lang;
    load: string;
    center: LatLng;
    zoom: number;
};

export const addMapsScript: (settings: MapSettings) => HTMLScriptElement = ({
    apiKey,
    lang,
    load
}) => {
    const mapsScript = document.createElement("script");
    mapsScript.setAttribute(
        "src",
        `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=${lang}&load=${load}`
    );
    mapsScript.setAttribute("async", "");
    mapsScript.setAttribute("defer", "");
    mapsScript.setAttribute("id", "ymaps-script");
    return document.head.appendChild(mapsScript);
};

export const CENTER_OF_MOSCOW: LatLng = {
    latitude: 55.75396,
    longitude: 37.620393
};

export const DEFAULT_MAP_SETTINGS: MapSettings = {
    apiKey: "8239b260-067a-4165-a7a4-e64e5d0c4bd2",
    lang: Lang.RU,
    load: "package.standard",
    center: CENTER_OF_MOSCOW,
    zoom: 11
};

export const mapLoader = (settings: MapSettings) =>
    new Promise<ymaps.Map>((resolve, reject) => {
        if (window.ymaps || document.getElementById("ymaps-script"))
            return resolve();

        const ymScript = addMapsScript(settings);
        ymScript.onload = () => ymaps.ready(resolve);
        ymScript.onerror = reject;
    });
