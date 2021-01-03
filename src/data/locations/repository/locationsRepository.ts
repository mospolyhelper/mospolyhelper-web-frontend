import Locations from "@/domain/locations/model/Locations";
import Result from "@/utils/result";
import LocationsRemoteDataSource from "../remote/locationsRemoteDataSource";

export default class LocationsRepository {
    private remoteDataSource = new LocationsRemoteDataSource();

    getLocations(): Promise<Result<Locations>> {
        return this.remoteDataSource.getLocations();
    }
}
