import { RestClient } from "typed-rest-client";

const BASE_URL = "https://mospolyhelper.herokuapp.com";

const restClient = new RestClient(null, BASE_URL);
export default restClient;
