import React, { Component } from "react";
import Form from "../../../../../../Shared/Components/Form/Form";
import FormError from "../../../../../../Shared/Components/Form/FormError";
import TicketService from "../../Shared/TicketService";
import FlightService from "../../../Flight/Shared/FlightService";
import "../TicketDetails.scss";

class TicketDetails extends Form {
    constructor(props) {
        super(props);
        this.state = {
            flightList: [],
            ticketDetails: {},
            form: this._getInitFormData({
                flight_id: "",
                ticket_type: "",
                available_class: "",
                status: "",
                carbin_bag: "",
                checkin_bag: "",
                price: "",
                tax: "",
            }),
            onEdit: false,
        };
    }

    componentDidMount() {
        this.getTicketDetails();
        this.getFlightList();
    }
    getTicketDetails = () => {
        const { id } = this.props.match.params;
        TicketService.getTicketDetails(id).then((res) => {
            this.setState({
                ticketDetails: res.data,
            });
            this._fillForm({
                flight_id: res.data.flight_id,
                ticket_type: res.data.ticket_type,
                available_class: res.data.available_class,
                status: res.data.status,
                carbin_bag: res.data.carbin_bag,
                checkin_bag: res.data.checkin_bag,
                price: res.data.price,
                tax: res.data.tax,
            });
        });
    };
    getFlightList = () => {
        FlightService.getFlightList().then((res) => {
            this.setState({
                flightList: res.data,
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
        this.getTicketDetails();
    };
    onSaveChangeInfo = () => {
        const { id } = this.props.match.params;
        this._validateForm();
        this.state.form["dirty"] = true;
        if (this._isFormValid()) {
            const { form } = this.state;
            const data = {
                flight_id: form.flight_id.value,
                ticket_type: form.ticket_type.value,
                available_class: form.available_class.value,
                status: form.status.value,
                carbin_bag: form.carbin_bag.value,
                checkin_bag: form.checkin_bag.value,
                price: form.price.value,
                tax: form.tax.value,
            };
            TicketService.updateTicketInfo(id, data).then((res) => {
                console.log(res.data);
            });
            this.setState({
                onEdit: false,
            });
        }
    };
    render() {
        const {
            flight_id,
            ticket_type,
            available_class,
            status,
            carbin_bag,
            checkin_bag,
            price,
            tax,
            dirty,
        } = this.state.form;
        let { flightList, ticketDetails } = this.state;
        const departure = Object.assign({}, ticketDetails.departure);
        const destination = Object.assign({}, ticketDetails.destination);
        const airline = Object.assign({}, ticketDetails.airline);
        const { onEdit } = this.state;
        return (
            <div>
                <div className="card">
                    <div className="card-header">
                        <div className="float-right">
                            {!onEdit ? (
                                <button
                                    onClick={this.onEditInfo}
                                    className="btn btn-primary"
                                >
                                    Edit
                                </button>
                            ) : (
                                <div>
                                    <button
                                        onClick={this.onSaveChangeInfo}
                                        className="btn btn-success"
                                        style={{
                                            marginLeft: "1rem",
                                            marginRight: "1rem",
                                        }}
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={this.onCancelEdit}
                                        className="btn btn-warning"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>
                        <h4 className="card-title">Ticke details</h4>
                    </div>

                    <section id="multiple-column-form">
                        <div className="row match-height">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-content">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-6 col-12">
                                                    <div>
                                                        <label htmlFor="first-name-column">
                                                            Flight
                                                        </label>
                                                        <select
                                                            type="text"
                                                            className="form-control"
                                                            disabled
                                                            name="flight_id"
                                                            value={
                                                                flight_id.value
                                                            }
                                                        >
                                                            <option>
                                                                Select flight
                                                                code
                                                            </option>
                                                            {flightList.map(
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
                                                                                item.flight_code
                                                                            }
                                                                        </option>
                                                                    );
                                                                }
                                                            )}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-12">
                                                    <div>
                                                        <label htmlFor="first-name-column">
                                                            Route
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            required
                                                            disabled
                                                            name="route"
                                                            value={
                                                                departure.city +
                                                                " - " +
                                                                destination.city
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-12">
                                                    <div
                                                        style={{
                                                            marginTop: "20px",
                                                        }}
                                                    >
                                                        <label htmlFor="first-name-column">
                                                            Ticket type
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            required
                                                            disabled={!onEdit}
                                                            name="ticket_type"
                                                            value={
                                                                ticket_type.value
                                                            }
                                                            onChange={(ev) =>
                                                                this._setValue(
                                                                    ev,
                                                                    "ticket_type"
                                                                )
                                                            }
                                                        />
                                                        {ticket_type.err ==
                                                            "*" && dirty ? (
                                                            <FormError
                                                                err={
                                                                    "Ticket type cannot be empty"
                                                                }
                                                            />
                                                        ) : (
                                                            ""
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-12">
                                                    <div
                                                        style={{
                                                            marginTop: "20px",
                                                        }}
                                                    >
                                                        <label htmlFor="first-name-column">
                                                            Airline
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            required
                                                            disabled={!onEdit}
                                                            name="ticket_type"
                                                            value={
                                                                airline.airline_name
                                                            }
                                                            onChange={(ev) =>
                                                                this._setValue(
                                                                    ev,
                                                                    "ticket_type"
                                                                )
                                                            }
                                                        />
                                                        {ticket_type.err ==
                                                            "*" && dirty ? (
                                                            <FormError
                                                                err={
                                                                    "Ticket type cannot be empty"
                                                                }
                                                            />
                                                        ) : (
                                                            ""
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className="row"
                                                style={{ marginTop: "20px" }}
                                            >
                                                <div className="col-md-6 col-12">
                                                    <div>
                                                        <label htmlFor="last-name-column">
                                                            Class available
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            required
                                                            disabled={!onEdit}
                                                            name="available_class"
                                                            value={
                                                                available_class.value
                                                            }
                                                            onChange={(ev) =>
                                                                this._setValue(
                                                                    ev,
                                                                    "available_class"
                                                                )
                                                            }
                                                        />
                                                        {available_class.err ==
                                                            "*" && dirty ? (
                                                            <FormError
                                                                err={
                                                                    "Available class cannot be empty"
                                                                }
                                                            />
                                                        ) : (
                                                            ""
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-12">
                                                    <div>
                                                        <label htmlFor="city-column">
                                                            Status
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            required
                                                            disabled={!onEdit}
                                                            name="status"
                                                            value={status.value}
                                                            onChange={(ev) =>
                                                                this._setValue(
                                                                    ev,
                                                                    "status"
                                                                )
                                                            }
                                                        />
                                                        {status.err == "*" &&
                                                        dirty ? (
                                                            <FormError
                                                                err={
                                                                    "Status cannot be empty"
                                                                }
                                                            />
                                                        ) : (
                                                            ""
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className="row"
                                                style={{ marginTop: "20px" }}
                                            >
                                                <div className="col-md-6 col-12">
                                                    <div>
                                                        <label htmlFor="country-floating">
                                                            Carbin baggage
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            required
                                                            disabled={!onEdit}
                                                            name="carbin_bag"
                                                            value={
                                                                carbin_bag.value
                                                            }
                                                            onChange={(ev) =>
                                                                this._setValue(
                                                                    ev,
                                                                    "carbin_bag"
                                                                )
                                                            }
                                                        />
                                                        {carbin_bag.err ==
                                                            "*" && dirty ? (
                                                            <FormError
                                                                err={
                                                                    "Carbin baggage cannot be empty"
                                                                }
                                                            />
                                                        ) : (
                                                            ""
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-12">
                                                    <div>
                                                        <label htmlFor="company-column">
                                                            Checkin baggage
                                                        </label>
                                                        <input
                                                            type="text"
                                                            required
                                                            className="form-control"
                                                            disabled={!onEdit}
                                                            name="checkin_bag"
                                                            value={
                                                                checkin_bag.value
                                                            }
                                                            onChange={(ev) =>
                                                                this._setValue(
                                                                    ev,
                                                                    "checkin_bag"
                                                                )
                                                            }
                                                        />
                                                        {checkin_bag.err ==
                                                            "*" && dirty ? (
                                                            <FormError
                                                                err={
                                                                    "Checkin baggage cannot be empty"
                                                                }
                                                            />
                                                        ) : (
                                                            ""
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className="row"
                                                style={{ marginTop: "20px" }}
                                            >
                                                <div className="col-md-6 col-12">
                                                    <div>
                                                        <label htmlFor="first-name-column">
                                                            Price
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            required
                                                            disabled={!onEdit}
                                                            name="price"
                                                            value={price.value}
                                                            onChange={(ev) =>
                                                                this._setValue(
                                                                    ev,
                                                                    "price"
                                                                )
                                                            }
                                                        />
                                                        {price.err == "*" &&
                                                        dirty ? (
                                                            <FormError
                                                                err={
                                                                    "Price cannot be empty"
                                                                }
                                                            />
                                                        ) : (
                                                            ""
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-12">
                                                    <div>
                                                        <label htmlFor="company-column">
                                                            Taxs
                                                        </label>
                                                        <input
                                                            type="text"
                                                            required
                                                            className="form-control"
                                                            disabled={!onEdit}
                                                            name="tax"
                                                            value={tax.value}
                                                            onChange={(ev) =>
                                                                this._setValue(
                                                                    ev,
                                                                    "tax"
                                                                )
                                                            }
                                                        />
                                                        {tax.err == "*" &&
                                                        dirty ? (
                                                            <FormError
                                                                err={
                                                                    "Taxs cannot be empty"
                                                                }
                                                            />
                                                        ) : (
                                                            ""
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}
export default TicketDetails;
