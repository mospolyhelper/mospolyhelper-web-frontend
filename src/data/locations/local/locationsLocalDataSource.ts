import Locations from "@/domain/locations/model/Locations";

const dummyLocations: Locations = {
    addresses: {
        campuses: [
            {
                title: "пися",
                description: "пися",
                coordinates: {
                    lat: 55.790139,
                    lng: 37.814052
                }
            }
        ],
        gyms: [
            {
                title: "пися 2",
                description: "подробности про писю 2",
                coordinates: {
                    lat: 55.68843,
                    lng: 37.75023
                }
            }
        ],
        hostels: [
            {
                title: "пися 3",
                description: "просто пися",
                coordinates: {
                    lat: 55.694843,
                    lng: 37.435023
                }
            }
        ]
    }
};

export default function getDummyLocations(): Promise<Locations> {
    return Promise.resolve(dummyLocations);
}
