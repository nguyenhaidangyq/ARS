import axios from "axios";
import { BASE_URL } from "../../../../Constances/const";

const API_ENPOINT = {
    GET_ALL_DESTINARION: "destinations",
    SEARCH_FLIGHT: "user/flights/search",
    GET_DESTINATION_INFO: "user/destinations/",
    GET_ALL_FLIGHT_FOLLOW_DATE: "user/flights"
}

class UserService {
    constructor() {
        if(UserService._instance) {
            return UserService._instance;
        }
        UserService._instance = this;
    }

    async getAllDestination() {
        return await axios.get(BASE_URL + API_ENPOINT.GET_ALL_DESTINARION);
    }

    async searchFlight(data) {
        return await axios.post(BASE_URL + API_ENPOINT.SEARCH_FLIGHT, data);
    }

    async getDestinationInfo(destinationId) {
        return await axios.get(BASE_URL + API_ENPOINT.GET_DESTINATION_INFO + destinationId);
    }

    async getFlightListWithoutDate(data) {
        return await axios.post(BASE_URL + API_ENPOINT.GET_ALL_FLIGHT_FOLLOW_DATE, data);
    }
}

const instance = new UserService();
export default instance;


