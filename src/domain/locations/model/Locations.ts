export type Coords = {
    latitude: number;
    longitude: number;
};

export type BasePin = {
    title: string;
    description?: string;
    coordinates: Coords;
};

export type Campus = BasePin;
export type Gym = BasePin;
export type Hostel = BasePin;

export type Locations = {
    campuses?: Campus[];
    gyms?: Gym[];
    hostels?: Hostel[];
};

export function locationToMarker(pin: BasePin): ymaps.GeoObject {
    const { title, description, coordinates } = pin;
    return new ymaps.GeoObject({
        // The geometry description.
        geometry: {
            type: "Point",
            coordinates: [coordinates.latitude, coordinates.longitude]
        } as any,
        // Properties.
        properties: {
            // The placemark content.
            iconContent: title,
            hintContent: description
        }
    }, {
        /**
         * Options.
         * The placemark's icon will stretch to fit its contents.
         */
        preset: 'islands#blackStretchyIcon',
        // The placemark can be dragged.
        draggable: true
    });
}
