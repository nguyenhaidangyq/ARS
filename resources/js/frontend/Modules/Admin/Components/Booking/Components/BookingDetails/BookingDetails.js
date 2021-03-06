import React, { Component } from "react";
import "../BookingDetails.scss";
import BookingService from "../../Shared/BookingService";
import Form from "../../../../../../Shared/Components/Form/Form";
import { REGEX_TEL } from "../../../../../../Constances/const";
import {
    getTime,
    dateConvert,
} from "../../../../../../Helpers/DateTime/ConvertDateTime";
import { formatCurrency } from "../../../../../../Helpers/FormatCurrency";
import FormError from "../../../../../../Shared/Components/Form/FormError";
import AlertSuccess from "../../../../../../Shared/Components/Alert/AlertSuccess";
class BookingDetails extends Form {
    constructor(props) {
        super(props);
        this.state = {
            form: this._getInitFormData({
                contact_name: "",
                vocative: "",
                email: "",
                phone: "",
                address: "",
                note: "",
            }),
            booking: {},
            flight: "",
            tripType: "",
            departure: "",
            destination: "",
            airline: "",
            ticket: "",
            passengers: [],
            onEdit: false,
            message: "",
        };
    }

    componentDidMount() {
        this.getBookingDetails();
    }

    getBookingDetails = () => {
        const { id } = this.props.match.params;
        BookingService.getBookingDetails(id).then((res) => {
            this._fillForm({
                contact_name: res.data.contact_name,
                vocative: res.data.vocative,
                email: res.data.contact_email,
                phone: res.data.contact_phone,
                address: res.data.address,
                note: res.data.note,
            });
            this.setState({
                booking: res.data,
                flight: res.data.flight,
                tripType: res.data.trip_type,
                departure: res.data.flight.departure,
                destination: res.data.flight.destination,
                airline: res.data.flight.airline,
                ticket: res.data.ticket,
                passengers: res.data.passenger,
            });
        });
    };

    onEditInfo = () => {
        this.setState({
            onEdit: true,
        });
    };

    onCancelEditInfo = () => {
        this.setState({
            onEdit: false,
        });
        this.getBookingDetails();
    };

    onSaveChangeInfo = () => {
        this._validateForm();
        this.state.form["dirty"] = true;
        if (this._isFormValid()) {
            const { id } = this.props.match.params;
            const { form } = this.state;
            const data = {
                vocative: form.vocative.value,
                contact_name: form.contact_name.value,
                contact_email: form.email.value,
                contact_phone: form.phone.value,
                address: form.address.value,
                note: form.note.value,
            };
            BookingService.updateBooking(id, data).then((res) => {
                this.setState({
                    message: "Update customer's info successful !",
                });
            });
            this.onCancelEditInfo();
        }
    };

    render() {
        const { contact_name, email, phone, address, note, vocative, dirty } =
            this.state.form;
        const {
            tripType,
            departure,
            destination,
            ticket,
            airline,
            flight,
            passengers,
            booking,
            onEdit,
        } = this.state;

        return (
            <div>
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <div className="float-right">
                                {!onEdit ? (
                                    <button
                                        className=" btn btn-primary"
                                        onClick={this.onEditInfo}
                                    >
                                        Edit Customer Info
                                    </button>
                                ) : (
                                    <div>
                                        <button
                                            className=" btn btn-success"
                                            style={{ marginLeft: "1rem" }}
                                            onClick={this.onSaveChangeInfo}
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={this.onCancelEditInfo}
                                            className=" btn btn-warning"
                                            style={{ marginLeft: "1rem" }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </div>
                            <h4 className="card-title">Booking Details</h4>
                        </div>

                        <div className="card-content">
                            <div className="card-body">
                                <form className="form form-vertical">
                                    <div className="form-body">
                                        <div className="row">
                                            <AlertSuccess
                                                message={this.state.message}
                                            />
                                            <div className="col-12">
                                                <h5>Customer's info</h5>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-input-group">
                                                    <label htmlFor="first-name-vertical">
                                                        Vocative
                                                    </label>
                                                    <select
                                                        type="text"
                                                        id="first-name-vertical"
                                                        className="form-control form-select"
                                                        name="vocative"
                                                        disabled={!onEdit}
                                                        value={vocative.value}
                                                        onChange={(ev) =>
                                                            this._setValue(
                                                                ev,
                                                                "vocative"
                                                            )
                                                        }
                                                    >
                                                        <option value="Anh">
                                                            Mr
                                                        </option>
                                                        <option value="Ch???">
                                                            Mrs
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-input-group">
                                                    <label htmlFor="first-name-vertical">
                                                        Customer Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="first-name-vertical"
                                                        className="form-control"
                                                        required
                                                        disabled={!onEdit}
                                                        name="contact_name"
                                                        value={
                                                            contact_name.value
                                                        }
                                                        onChange={(ev) =>
                                                            this._setValue(
                                                                ev,
                                                                "contact_name"
                                                            )
                                                        }
                                                    />
                                                    {contact_name.err == "*" &&
                                                    dirty ? (
                                                        <FormError err="Vui l??ng kh??ng ????? tr???ng t??n li??n h???" />
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="form-input-group">
                                                    <label htmlFor="first-name-vertical">
                                                        Phone Number
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        pattern={REGEX_TEL}
                                                        id="first-name-vertical"
                                                        className="form-control"
                                                        required
                                                        disabled={!onEdit}
                                                        name="phone"
                                                        value={phone.value}
                                                        onChange={(ev) =>
                                                            this._setValue(
                                                                ev,
                                                                "phone"
                                                            )
                                                        }
                                                    />
                                                    {phone.err == "*" &&
                                                    dirty ? (
                                                        <FormError err="Vui l??ng kh??ng ????? tr???ng s??? ??i???n tho???i" />
                                                    ) : phone.err.length > 0 &&
                                                      dirty ? (
                                                        <FormError
                                                            err={phone.err}
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-input-group">
                                                    <label htmlFor="first-name-vertical">
                                                        Email
                                                    </label>
                                                    <input
                                                        type="email"
                                                        id="first-name-vertical"
                                                        className="form-control"
                                                        name="email"
                                                        disabled={!onEdit}
                                                        required
                                                        value={email.value}
                                                        onChange={(ev) =>
                                                            this._setValue(
                                                                ev,
                                                                "email"
                                                            )
                                                        }
                                                    />
                                                    {email.err == "*" &&
                                                    dirty ? (
                                                        <FormError err="Vui l??ng kh??ng ????? tr???ng email" />
                                                    ) : email.err.length > 0 &&
                                                      dirty ? (
                                                        <FormError
                                                            err={email.err}
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-input-group">
                                                    <label htmlFor="first-name-vertical">
                                                        Address
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="first-name-vertical"
                                                        className="form-control"
                                                        name="address"
                                                        disabled={!onEdit}
                                                        value={address.value}
                                                        onChange={(ev) =>
                                                            this._setValue(
                                                                ev,
                                                                "address"
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-input-group">
                                                    <label htmlFor="first-name-vertical">
                                                        Note
                                                    </label>
                                                    <textarea
                                                        style={{
                                                            overflow: "hidden",
                                                        }}
                                                        id="first-name-vertical"
                                                        className="form-control"
                                                        name="note"
                                                        disabled={!onEdit}
                                                        value={note.value}
                                                        onChange={(ev) =>
                                                            this._setValue(
                                                                ev,
                                                                "note"
                                                            )
                                                        }
                                                    ></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="row"
                                            style={{ marginTop: "55px" }}
                                        >
                                            <div className="col-12">
                                                <h5>Flight Infomation</h5>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="form-input-group">
                                                    <label htmlFor="first-name-vertical">
                                                        Trip Type
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="first-name-vertical"
                                                        className="form-control"
                                                        name="tripType"
                                                        disabled
                                                        value={
                                                            tripType == 1
                                                                ? "One way"
                                                                : tripType == 2
                                                                ? "Rountrip"
                                                                : ""
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="form-input-group">
                                                    <label htmlFor="first-name-vertical">
                                                        Departure
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="first-name-vertical"
                                                        className="form-control"
                                                        name="departure"
                                                        disabled
                                                        value={`${departure.airport_name}, ${departure.city}, ${departure.country}`}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-3">
                                                <div className="form-input-group">
                                                    <label htmlFor="first-name-vertical">
                                                        Destination
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        pattern={REGEX_TEL}
                                                        id="first-name-vertical"
                                                        className="form-control"
                                                        name="destination"
                                                        disabled
                                                        value={`${destination.airport_name}, ${destination.city}, ${destination.country}`}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="form-input-group">
                                                    <label htmlFor="first-name-vertical">
                                                        Airlline
                                                    </label>
                                                    <input
                                                        type="email"
                                                        id="first-name-vertical"
                                                        className="form-control"
                                                        name="airline"
                                                        disabled
                                                        value={
                                                            airline.airline_name
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="form-input-group">
                                                    <label htmlFor="first-name-vertical">
                                                        Departure Time
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="first-name-vertical"
                                                        className="form-control"
                                                        name="departureTime"
                                                        disabled
                                                        value={
                                                            getTime(
                                                                flight.departure_datetime
                                                            ) +
                                                            " " +
                                                            dateConvert(
                                                                flight.departure_datetime
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="form-input-group">
                                                    <label htmlFor="first-name-vertical">
                                                        Arrival Time
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="first-name-vertical"
                                                        className="form-control"
                                                        name="arrival"
                                                        disabled
                                                        value={
                                                            getTime(
                                                                flight.arrival_datetime
                                                            ) +
                                                            " " +
                                                            dateConvert(
                                                                flight.arrival_datetime
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="form-input-group">
                                                    <label htmlFor="first-name-vertical">
                                                        Ticket Type
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="first-name-vertical"
                                                        className="form-control"
                                                        name="note"
                                                        disabled
                                                        value={
                                                            ticket.ticket_type
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="form-input-group">
                                                    <label htmlFor="first-name-vertical">
                                                        Available Class
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="first-name-vertical"
                                                        className="form-control"
                                                        name="note"
                                                        disabled
                                                        value={
                                                            ticket.available_class
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Passenger List</h4>
                        </div>
                        <div className="card-content">
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-lg">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Passenger Name</th>
                                                <th>Gender</th>
                                                <th>Birthday</th>
                                                <th>Seat reserved </th>
                                                <th>Price </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {passengers.map((item) => {
                                                return (
                                                    <tr key={item.id}>
                                                        <td></td>
                                                        <td>
                                                            {
                                                                item.passenger_name
                                                            }
                                                        </td>
                                                        <td>{item.gender}</td>
                                                        <td>
                                                            {dateConvert(
                                                                item.birthday
                                                            )}
                                                        </td>
                                                        <td>
                                                            {item.booking_seat
                                                                .length > 0
                                                                ? item.booking_seat
                                                                : "None"}
                                                        </td>
                                                        <td>
                                                            {formatCurrency(
                                                                ticket.price +
                                                                    ticket.tax
                                                            )}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                            <tr>
                                                <td colSpan="5">Total price</td>
                                                <td colSpan="1">
                                                    {formatCurrency(
                                                        booking.into_money
                                                    )}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default BookingDetails;
