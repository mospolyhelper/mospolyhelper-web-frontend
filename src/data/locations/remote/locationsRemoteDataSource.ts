import Locations from "@/domain/locations/model/Locations";
import Result from "@/utils/result";
import LocationsApi from "../api/locationsApi";

export default class LocationsRemoteDataSource {
    private api = new LocationsApi();

    getLocations(): Promise<Result<Locations>> {
        return this.api.getLocations();
    }
}
