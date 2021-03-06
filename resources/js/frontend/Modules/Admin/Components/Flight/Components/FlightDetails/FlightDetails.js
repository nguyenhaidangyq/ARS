import React, { Component } from "react";
import Form from "../../../../../../Shared/Components/Form/Form";
import FormError from "../../../../../../Shared/Components/Form/FormError";
import FlightService from "../../Shared/FlightService";
import "../FlightDetails.scss";
import DestinationService from "../../../Destination/Shared/DestinationService";
import AirlineService from "../../../Airline/Shared/AirlineService";
import AlertSuccess from "../../../../../../Shared/Components/Alert/AlertSuccess";
import AlertDanger from "../../../../../../Shared/Components/Alert/AlertDanger";
import {
    dateConvert,
    getTime,
} from "../../../../../../Helpers/DateTime/ConvertDateTime";
import FlightSeatDetails from "./FlightSeatDetail/FlightSeatDetails";
class FlightDetails extends Form {
    constructor(props) {
        super(props);
        this.state = {
            departureList: [],
            destinationList: [],
            airlineList: [],
            seatsReserved: [],
            flightInfo: {},
            form: this._getInitFormData({
                flight_code: "",
                departure_datetime: "",
                arrival_datetime: "",
                aircraft: "",
                airline_id: "",
                departure_id: "",
                destination_id: "",
                capacity: "",
                seats_reserved: "",
                seats_available: "",
            }),
            onEdit: false,
            message: "",
            errorMessage: "",
            updateMessage: "",
        };
    }
    componentDidMount() {
        this.getFlightDetails();
        this.getAirlineList();
        this.getDepartureList();
        this.getDestinationList();
        this.getSeatsReserved();
    }
    getDestinationList = () => {
        DestinationService.getDestinationList().then((res) => {
            this.setState({
                destinationList: res.data,
            });
        });
    };
    getDepartureList = () => {
        DestinationService.getDestinationList().then((res) => {
            this.setState({
                departureList: res.data,
            });
        });
    };
    getAirlineList = () => {
        AirlineService.getAirlineList().then((res) => {
            this.setState({
                airlineList: res.data,
            });
        });
    };
    getFlightDetails = () => {
        const { id } = this.props.match.params;
        FlightService.getFlightDetails(id).then((res) => {
            this.setState({
                flightInfo: res.data,
            });
            this._fillForm({
                flight_code: res.data.flight_code,
                departure_datetime: res.data.departure_datetime,
                arrival_datetime: res.data.arrival_datetime,
                aircraft: res.data.aircraft,
                airline_id: res.data.airline_id,
                departure_id: res.data.departure_id,
                destination_id: res.data.destination_id,
                capacity: res.data.capacity,
                seats_reserved: res.data.seats_reserved,
                seats_available: res.data.seats_available,
            });
        });
    };

    getSeatsReserved = () => {
        const { id } = this.props.match.params;
        FlightService.getSeatsReserved(id).then((res) => {
            this.setState({
                seatsReserved: res.data,
            });
        });
    };

    onEditInfo = () => {
        this.setState({
            onEdit: true,
        });
    };

    onCancelEdit = () => {
        this.setState({
            onEdit: false,
        });
        this.getFlightDetails();
    };

    onSaveChangeInfo = () => {
        const { form } = this.state;
        this._validateForm();
        this.state.form["dirty"] = true;
        const { id } = this.props.match.params;
        if (this._isFormValid()) {
            const data = {
                flight_code: form.flight_code.value,
                departure_datetime: form.departure_datetime.value,
                arrival_datetime: form.arrival_datetime.value,
                aircraft: form.aircraft.value,
                airline_id: form.airline_id.value,
                departure_id: form.departure_id.value,
                destination_id: form.destination_id.value,
                capacity: form.capacity.value,
                seats_reserved: form.seats_reserved.value,
                seats_available: form.seats_available.value,
            };
            console.log(data);
            FlightService.updateFlightInfo(id, data)
                .then((res) => {
                    console.log(res.data);
                    this.setState({
                        updateMessage: `Update successfully flight with code ${res.data.flight_code}`,
                    });
                })
                .catch((err) => {
                    this.setState({
                        errorMessage: "Update flight failed",
                    });
                });
            this.setState({
                onEdit: false,
            });
        }
    };
    render() {
        const {
            flight_code,
            departure_datetime,
            arrival_datetime,
            aircraft,
            airline_id,
            departure_id,
            destination_id,
            capacity,
            seats_reserved,
            seats_available,
            dirty,
        } = this.state.form;
        const {
            destinationList,
            airlineList,
            departureList,
            updateMessage,
            errorMessage,
            seatsReserved,
            flightInfo,
        } = this.state;
        const { onEdit } = this.state;
        if (updateMessage.length > 0 || errorMessage.length > 0) {
            const timer = setTimeout(() => {
                this.setState({
                    updateMessage: "",
                    errorMessage: "",
                });
            }, 5000);
        }

        return (
            <div>
                <div className="card">
                    <div className="card-header">
                        <h4
                            className="card-title"
                            style={{ marginLeft: "10px" }}
                        >
                            Flight Details
                            <div
                                className="float-right"
                                style={{ marginRight: "10px" }}
                            >
                                {!onEdit ? (
                                    <button
                                        className="btn btn-primary"
                                        onClick={this.onEditInfo}
                                    >
                                        {" "}
                                        Edit
                                    </button>
                                ) : (
                                    <div style={{ marginBottom: "20px" }}>
                                        <button
                                            className="btn btn-success"
                                            onClick={this.onSaveChangeInfo}
                                        >
                                            {" "}
                                            Save
                                        </button>
                                        <button
                                            style={{ marginLeft: "1rem" }}
                                            className="btn btn-warning"
                                            onClick={this.onCancelEdit}
                                        >
                                            {" "}
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </div>
                        </h4>
                        <div style={{ marginTop: "54px" }}>
                            <AlertSuccess message={this.state.updateMessage} />
                            <AlertDanger message={this.state.errorMessage} />
                        </div>
                    </div>
                    <div className="row">
                        <div
                            className="col-md-4 col-12"
                            style={{
                                marginLeft: "20px",
                                width: "32.3333333%",
                            }}
                        >
                            <section id="multiple-column-form">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-content">
                                            <form className="form">
                                                <label
                                                    htmlFor="first-name-column"
                                                    style={{
                                                        fontWeight: "600",
                                                        color: "rgba(35,28,99,.7)",
                                                    }}
                                                >
                                                    Start
                                                </label>
                                                <div className="input-form">
                                                    <div className="input-group input-group-sm mb-3">
                                                        <span
                                                            className="input-group-text"
                                                            id="inputGroup-sizing-sm"
                                                        >
                                                            Departure
                                                        </span>
                                                        <select
                                                            type="text"
                                                            className="form-control"
                                                            required
                                                            disabled
                                                            name="departure_id"
                                                            value={
                                                                departure_id.value
                                                            }
                                                        >
                                                            <option>
                                                                Select departure
                                                                city
                                                            </option>
                                                            {departureList.map(
                                                                (item) => {
                                                                    return (
                                                                        <option
                                                                            key={
                                                                                item.id
                                                                            }
                                                                            value={
                                                                                item.id
                                                                            }
                                                                        >
                                                                            {
                                                                                item.city
                                                                            }
                                                                        </option>
                                                                    );
                                                                }
                                                            )}
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="input-form">
                                                    <div className="input-group input-group-sm mb-3">
                                                        <span
                                                            className="input-group-text"
                                                            id="inputGroup-sizing-sm"
                                                        >
                                                            Depart
                                                        </span>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="departure_datetime"
                                                            value={`${getTime(
                                                                departure_datetime.value
                                                            )} ${dateConvert(
                                                                departure_datetime.value
                                                            )}`}
                                                            required
                                                            disabled={!onEdit}
                                                            onChange={(ev) =>
                                                                this._setValue(
                                                                    ev,
                                                                    "departure_datetime"
                                                                )
                                                            }
                                                        />
                                                        {departure_datetime.err ==
                                                            "*" && dirty ? (
                                                            <FormError
                                                                err={
                                                                    "Departure datetime cannot be empty"
                                                                }
                                                            />
                                                        ) : (
                                                            ""
                                                        )}
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div
                            className="col-md-4 col-12"
                            style={{ width: "32.3333333%" }}
                        >
                            <section id="multiple-column-form">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-content">
                                            <form className="form">
                                                <label
                                                    htmlFor="first-name-column"
                                                    style={{
                                                        fontWeight: "600",
                                                        color: "rgba(35,28,99,.7)",
                                                    }}
                                                >
                                                    Destination
                                                </label>
                                                <div className="input-form">
                                                    <div className="input-group input-group-sm mb-3">
                                                        <span
                                                            className="input-group-text"
                                                            id="inputGroup-sizing-sm"
                                                        >
                                                            Destination
                                                        </span>
                                                        <select
                                                            type="text"
                                                            className="form-control"
                                                            required
                                                            disabled
                                                            name="destination_id"
                                                            value={
                                                                destination_id.value
                                                            }
                                                        >
                                                            <option>
                                                                Select
                                                                destination city
                                                            </option>
                                                            {destinationList.map(
                                                                (item) => {
                                                                    return (
                                                                        <option
                                                                            key={
                                                                                item.id
                                                                            }
                                                                            value={
                                                                                item.id
                                                                            }
                                                                        >
                                                                            {
                                                                                item.city
                                                                            }
                                                                        </option>
                                                                    );
                                                                }
                                                            )}
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="input-form">
                                                    <div className="input-group input-group-sm mb-3">
                                                        <span
                                                            className="input-group-text"
                                                            id="inputGroup-sizing-sm"
                                                        >
                                                            Landing time
                                                        </span>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="arrival_datetime"
                                                            value={`${getTime(
                                                                arrival_datetime.value
                                                            )} ${dateConvert(
                                                                arrival_datetime.value
                                                            )}`}
                                                            required
                                                            disabled={!onEdit}
                                                            onChange={(ev) =>
                                                                this._setValue(
                                                                    ev,
                                                                    "arrival_datetime"
                                                                )
                                                            }
                                                        />
                                                        {arrival_datetime.err ==
                                                            "*" && dirty ? (
                                                            <FormError
                                                                err={
                                                                    "Arrival datetime cannot be empty"
                                                                }
                                                            />
                                                        ) : (
                                                            ""
                                                        )}
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <div
                            className="col-md-4 col-12"
                            style={{ width: "32.3333333%" }}
                        >
                            <section id="multiple-column-form">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-content">
                                            <form className="form">
                                                <label
                                                    htmlFor="first-name-column"
                                                    style={{
                                                        fontWeight: "600",
                                                        color: "rgba(35,28,99,.7)",
                                                    }}
                                                >
                                                    Flight
                                                </label>
                                                <div className="input-form">
                                                    <div className="input-group input-group-sm mb-3">
                                                        <span
                                                            className="input-group-text"
                                                            id="inputGroup-sizing-sm"
                                                        >
                                                            Airline
                                                        </span>
                                                        <select
                                                            required
                                                            type="text"
                                                            className="form-control"
                                                            name="airline_id"
                                                            value={
                                                                airline_id.value
                                                            }
                                                            disabled
                                                        >
                                                            <option>
                                                                Select airline
                                                                name
                                                            </option>
                                                            {airlineList.map(
                                                                (item) => {
                                                                    return (
                                                                        <option
                                                                            key={
                                                                                item.id
                                                                            }
                                                                            value={
                                                                                item.id
                                                                            }
                                                                        >
                                                                            {
                                                                                item.airline_name
                                                                            }
                                                                        </option>
                                                                    );
                                                                }
                                                            )}
                                                            ;
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="input-form">
                                                    <div className="input-group input-group-sm mb-3">
                                                        <span
                                                            className="input-group-text"
                                                            id="inputGroup-sizing-sm"
                                                        >
                                                            Flight code
                                                        </span>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="flight_code"
                                                            value={
                                                                flight_code.value
                                                            }
                                                            required
                                                            disabled={!onEdit}
                                                            onChange={(ev) =>
                                                                this._setValue(
                                                                    ev,
                                                                    "flight_code"
                                                                )
                                                            }
                                                        />
                                                        {flight_code.err ==
                                                            "*" && dirty ? (
                                                            <FormError
                                                                err={
                                                                    "Flight code cannot be empty"
                                                                }
                                                            />
                                                        ) : (
                                                            ""
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="input-form">
                                                    <div className="input-group input-group-sm mb-3">
                                                        <span
                                                            className="input-group-text"
                                                            id="inputGroup-sizing-sm"
                                                        >
                                                            Aircraft
                                                        </span>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="aircraft"
                                                            value={
                                                                aircraft.value
                                                            }
                                                            required
                                                            disabled={!onEdit}
                                                            onChange={(ev) =>
                                                                this._setValue(
                                                                    ev,
                                                                    "aircraft"
                                                                )
                                                            }
                                                        />
                                                        {aircraft.err == "*" &&
                                                        dirty ? (
                                                            <FormError
                                                                err={
                                                                    "Aircraft cannot be empty"
                                                                }
                                                            />
                                                        ) : (
                                                            ""
                                                        )}
                                                    </div>
                                                </div>

                                                {/* </div> */}
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <section
                            id="multiple-column-form"
                            style={{
                                marginLeft: "-13px",
                                marginTop: "-30px",
                            }}
                        >
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-content">
                                        <form className="form">
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label htmlFor="first-name-column">
                                                            Capacity
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="first-name-column"
                                                            className="form-control"
                                                            name="capacity"
                                                            value={
                                                                capacity.value
                                                            }
                                                            required
                                                            disabled={!onEdit}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label htmlFor="country-floating">
                                                            Seat reserved
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="country-floating"
                                                            className="form-control"
                                                            name="seats_reserved"
                                                            value={
                                                                seatsReserved.length
                                                            }
                                                            required
                                                            disabled={!onEdit}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label htmlFor="country-floating">
                                                            Seat available
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="country-floating"
                                                            className="form-control"
                                                            name="seats_available"
                                                            value={
                                                                seats_available.value
                                                            }
                                                            required
                                                            disabled={!onEdit}
                                                            onChange={(ev) =>
                                                                this._setValue(
                                                                    ev,
                                                                    "seats_available"
                                                                )
                                                            }
                                                        />
                                                        {seats_available.err ==
                                                            "*" && dirty ? (
                                                            <FormError
                                                                err={
                                                                    "Seats available cannot be empty"
                                                                }
                                                            />
                                                        ) : (
                                                            ""
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header"></div>
                    <div className="card-content">
                        <div className="card-body">
                            <FlightSeatDetails
                                seatsReserved={seatsReserved}
                                seats={flightInfo.capacity}
                                businessSeats={flightInfo.business_seats}
                                economySeats={flightInfo.economy_seats}
                                firstEconomySeats={
                                    flightInfo.first_economy_seats
                                }
                                exitSeats={flightInfo.exit_seats}
                                flightInfo={flightInfo}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default FlightDetails;
