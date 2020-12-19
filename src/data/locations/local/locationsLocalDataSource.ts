import { Locations } from "@/domain/locations/model/Locations";

const dummyLocations: Locations = {
    campuses: [
        {
            title: "пися",
            description: "пися",
            coordinates: {
                latitude: 55.790139,
                longitude: 37.814052
            }
        }
    ],
    gyms: [
        {
            title: "пися 2",
            description: "подробности про писю 2",
            coordinates: {
                latitude: 55.694843,
                longitude: 37.435023
            }
        }
    ],
    hostels: [
        {
            title: "пися 3",
            description: "просто пися",
            coordinates: {
                latitude: 55.694843,
                longitude: 37.435023
            }
        }
    ]
};

export default function getDummyLocations(): Promise<Locations> {
    return Promise.resolve(dummyLocations);
}