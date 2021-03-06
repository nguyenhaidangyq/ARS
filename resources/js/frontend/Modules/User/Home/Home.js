import React from "react";
import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.scss";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Suspense } from "react";
import ChooseFlight from "../Components/ChooseFlight/ChooseFlight";
import Reservations from "../Components/Reservations/Reservations";
import BookingConfirm from "../Components/BookingConfirm/BookingConfirm";
import Login from "../../Origin/User/Login/Login";
import Register from "../../Origin/User/Register/Register";
import CustomerProfile from "../Components/CustomerProfile/CustomerProfile";
import AuthService from "../../../Shared/Service/AuthService";
import HomeMain from "../Components/HomeMain/HomeMain";
import DiscountTickets from "../Components/DiscountTickets/DiscountTickets";
import SearchFlightInfo from "../Components/SearchFligthInfo/SearchFlightInfo";
import ViewBookingInfo from "../Components/ViewBookingInfo/ViewBookingInfo";
import BonusServices from "../Components/BonusServices/BonusServices";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const isLogged = !!AuthService.userId;

        return (
            <BrowserRouter>
                <div className="user-layout">
                    <Switch>
                        <Suspense>
                            <Route exact path={"/"} component={HomeMain} />
                            <Route
                                exact
                                path={"/login"}
                                render={() => {
                                    return isLogged ? (
                                        <Redirect to="/" />
                                    ) : (
                                        <Login></Login>
                                    );
                                }}
                            />
                            <Route
                                exact
                                path={"/register"}
                                component={Register}
                            />
                            <Route
                                path={"/search-flight"}
                                component={ChooseFlight}
                            />
                            <Route
                                path={"/reservation/ticket/oneway"}
                                component={Reservations}
                            />
                            <Route
                                path={"/reservation/ticket/round-trip"}
                                component={Reservations}
                            />
                            <Route
                                path={"/reservation/bonus-services"}
                                component={BonusServices}
                            />
                            <Route
                                path={"/reservation/confirm"}
                                component={BookingConfirm}
                            />
                            <Route
                                path={"/booking-info/:code"}
                                component={ViewBookingInfo}
                            />
                            <Route
                                path={"/customer-info"}
                                render={() => {
                                    return isLogged ? (
                                        <CustomerProfile></CustomerProfile>
                                    ) : (
                                        <Redirect to="/" />
                                    );
                                }}
                            />
                            <Route
                                path={"/discount-tickets"}
                                component={DiscountTickets}
                            />
                            <Route
                                path={"/flight-info"}
                                component={SearchFlightInfo}
                            />
                        </Suspense>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}
export default Home;
