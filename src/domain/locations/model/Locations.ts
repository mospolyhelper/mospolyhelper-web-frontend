export type Coords = {
    lat: number;
    lng: number;
};

export type BasePin = {
    title: string;
    description?: string;
    coordinates: Coords;
};

export type Campus = BasePin;
export type Gym = BasePin;
export type Hostel = BasePin;

export type Addresses = {
    campuses?: Campus[];
    gyms?: Gym[];
    hostels?: Hostel[];
};

type Locations = {
    addresses?: Addresses;
};
export default Locations;
