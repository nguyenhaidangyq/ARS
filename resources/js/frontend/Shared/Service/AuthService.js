import axios from "axios";
import { BASE_URL } from "../../Constances/const";

const API_ENPOINT = {
    USER_LOGIN: "user/login",
    USER_REGISTER: "user/register",
    GET_USER_INFO: "user/my-info",
    GET_MY_BOOKING: "user/get-booking",
    UPDATE_MY_INFO: "user/update-info",
    ADMIN_LOGIN: "admin/login",
    FETCH_MESSAGE: "my-message",
    SEND_MESSAGE: "send-message",
    GET_LIST_PEOPLE_CHAT: "list-people-chat",
    GET_INCOMING_MESSAGE: "messages/",
};

class AuthService {
    constructor() {
        if (AuthService._instance) {
            return AuthService._instance;
        }
        AuthService._instance = this;
    }

    userId = JSON.parse(window.localStorage.getItem("userId" || ""));
    adminId = JSON.parse(window.localStorage.getItem("adminId" || ""));
    userInfo = {};

    async userLogin(data) {
        return await axios.post(BASE_URL + API_ENPOINT.USER_LOGIN, data);
    }

    async userRegister(data) {
        return await axios.post(BASE_URL + API_ENPOINT.USER_REGISTER, data);
    }

    async getUserInfo() {
        let userInfo = (await axios.get(BASE_URL + API_ENPOINT.GET_USER_INFO))
            .data;
        this.userInfo = userInfo;
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
    }

    async getMyBookingFlight() {
        return await axios.get(BASE_URL + API_ENPOINT.GET_MY_BOOKING);
    }

    async updateMyInfo(data) {
        return await axios.patch(BASE_URL + API_ENPOINT.UPDATE_MY_INFO, data);
    }

    async adminLogin(data) {
        return await axios.post(BASE_URL + API_ENPOINT.ADMIN_LOGIN, data);
    }

    async fetchMyMessages() {
        return await axios.get(BASE_URL + API_ENPOINT.FETCH_MESSAGE);
    }

    async sendMessage(data) {
        return await axios.post(BASE_URL + API_ENPOINT.SEND_MESSAGE, data);
    }

    async getListPeopleChat() {
        return await axios.get(BASE_URL + API_ENPOINT.GET_LIST_PEOPLE_CHAT);
    }

    async getIncomingMessage(userId) {
        return await axios.get(
            BASE_URL + API_ENPOINT.GET_INCOMING_MESSAGE + userId
        );
    }
}

const constance = new AuthService();
export default constance;
