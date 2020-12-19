import { Locations } from "@/domain/locations/model/Locations";
import getDummyLocations from "@/data/locations/local/locationsLocalDataSource";

export default function getLocations(): Promise<Locations> {
    return getDummyLocations()
}