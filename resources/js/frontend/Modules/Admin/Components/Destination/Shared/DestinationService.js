import axios from "axios";
import { BASE_URL } from "../../../../../Constances/const";

const API_ENPOINT = {
    GET_ALL_DESTINATIONS: "destinations",
    GET_DESTINATION_DETAILS: "destinations/",
    UPDATE_DESTINATION: "destinations/update/",
};

class DestinationService {
    constructor() {
        if (DestinationService._instance) {
            return DestinationService._instance;
        }
        DestinationService._instance = this;
    }

    async getDestinationList() {
        return await axios.get(BASE_URL + API_ENPOINT.GET_ALL_DESTINATIONS);
    }

    async getDestinationDetails(id) {
        return await axios.get(
            BASE_URL + API_ENPOINT.GET_DESTINATION_DETAILS + id
        );
    }

    async updateDestination(id, data) {
        return await axios.patch(
            BASE_URL + API_ENPOINT.UPDATE_DESTINATION + id,
            data
        );
    }
}

const instance = new DestinationService();
export default instance;
