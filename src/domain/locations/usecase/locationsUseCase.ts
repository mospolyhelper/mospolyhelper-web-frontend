import LocationsRepository from "@/data/locations/repository/locationsRepository";
import Result from "@/utils/result";
import Locations from "../model/Locations";

export default class LocationsUseCase {
    private repository = new LocationsRepository();

    getLocations(): Promise<Result<Locations>> {
        return this.repository.getLocations();
    }
}
