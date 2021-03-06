import React from "react";
import { Component } from "react";
import Form from "../../../../../../Shared/Components/Form/Form";
import FormError from "../../../../../../Shared/Components/Form/FormError";
import FlightService from "../../../Flight/Shared/FlightService";

class AddNewTicket extends Form {
    constructor(props) {
        super(props);
        this.state = {
            form: this._getInitFormData({
                flight_id: "",
                ticket_type: "",
                available_class: "",
                status: 1,
                carbin_bag: "",
                checkin_bag: "",
                price: "",
                tax: "",
                business_seat_fee: "",
                economy_seat_fee: "",
                deluxe_seat_fee: "",
                exit_seat_fee: "",
            }),
            classesFlight: [],
            classChoosed: {},
        };
    }

    componentDidMount() {}

    handleChangeFlight = (ev) => {
        let { form } = this.state;
        form["dirty"] = false;
        if (ev.target.value !== "") {
            form["flight_id"].value = ev.target.value;
            this.getClassAndPriceFlight(ev.target.value);
        } else {
            form["flight_id"].value = ev.target.value;
            form["flight_id"].err = "*";
        }
        this.setState({ form });
    };

    handleChangeClassFlight = (ev) => {
        const { value } = ev.target;
        let { form } = this.state;
        if (value !== "") {
            form["available_class"].value = parseInt(value);
        }
        this.setState({ form });
        this.setPriceForClass(value);
    };

    setPriceForClass = (classId) => {
        let { form } = this.state;
        const { classesFlight } = this.state;
        classesFlight.forEach((item) => {
            if (item.class == classId) {
                form["price"].value = item.price;
            }
        });
        this.setState({ form });
    };

    getClassAndPriceFlight = (flightId) => {
        FlightService.getClassAndPrice(flightId).then((res) => {
            this.setState({
                classesFlight: res.data,
            });
        });
    };

    onSubmitInfo = () => {
        this._validateForm();
        this.state.form["dirty"] = true;
        if (this._isFormValid()) {
            const { form } = this.state;
            let classFlight = "";
            switch (form["available_class"].value) {
                case 1:
                    classFlight = "Business";
                    break;
                case 2:
                    classFlight = "Deluxe Economy";
                    break;
                case 3:
                    classFlight = "Economy";
                    break;
                case 4:
                    classFlight = "Economy";
                    break;
            }
            const data = {
                flight_id: form.flight_id.value,
                ticket_type: form.ticket_type.value,
                available_class: classFlight,
                status: form.status.value,
                carbin_bag: form.carbin_bag.value,
                checkin_bag: form.checkin_bag.value,
                price: form.price.value,
                tax: form.tax.value,
                business_seat_fee: form.business_seat_fee.value,
                economy_seat_fee: form.economy_seat_fee.value,
                deluxe_seat_fee: form.deluxe_seat_fee.value,
                exit_seat_fee: form.exit_seat_fee.value,
            };
            this.props.onSubmitInfo(data);
        }
    };

    render() {
        const { flightList } = this.props;
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
            business_seat_fee,
            exit_seat_fee,
            economy_seat_fee,
            deluxe_seat_fee,
        } = this.state.form;
        const { classesFlight } = this.state;

        return (
            <div>
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">
                            Add new ticket
                            <div className="float-right">
                                <div>
                                    <button
                                        className="btn btn-success"
                                        onClick={this.onSubmitInfo}
                                    >
                                        Submit
                                    </button>
                                    <button
                                        style={{
                                            marginLeft: "15px",
                                        }}
                                        className="btn btn-warning"
                                        onClick={() => this.props.onCancelAdd()}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </h4>
                    </div>
                    <div className="card-content">
                        <div className="card-body">
                            <div className="add-new-ticket">
                                <div>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div>
                                                <label>Flight</label>
                                                <select
                                                    name="flight_id"
                                                    required
                                                    className="form-control"
                                                    value={flight_id.value}
                                                    onChange={(ev) =>
                                                        this.handleChangeFlight(
                                                            ev
                                                        )
                                                    }
                                                >
                                                    <option value="">
                                                        Select flight code
                                                    </option>
                                                    {flightList.map((item) => {
                                                        return (
                                                            <option
                                                                key={item.id}
                                                                value={item.id}
                                                            >
                                                                {
                                                                    item.flight_code
                                                                }
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                                {dirty &&
                                                flight_id.err === "*" ? (
                                                    <FormError err="Flight cannot be empty" />
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div>
                                                <label>Class available</label>
                                                <select
                                                    required
                                                    className="form-control form-select"
                                                    name="available_class"
                                                    value={
                                                        available_class.value
                                                    }
                                                    onChange={(ev) =>
                                                        this.handleChangeClassFlight(
                                                            ev
                                                        )
                                                    }
                                                >
                                                    <option value="">
                                                        Choose class
                                                    </option>
                                                    {classesFlight.map(
                                                        (item) => {
                                                            return (
                                                                <option
                                                                    key={
                                                                        item.id
                                                                    }
                                                                    value={
                                                                        item.class
                                                                    }
                                                                >
                                                                    {item.class ===
                                                                    1
                                                                        ? "Business"
                                                                        : item.class ===
                                                                          2
                                                                        ? "Deluxe"
                                                                        : item.class ===
                                                                          3
                                                                        ? "Economy"
                                                                        : item.class ===
                                                                          4
                                                                        ? "Special Economy"
                                                                        : ""}
                                                                </option>
                                                            );
                                                        }
                                                    )}
                                                </select>
                                                {dirty &&
                                                available_class.err === "*" ? (
                                                    <FormError err="Available class cannot be empty" />
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
                                        <div className="col-sm-6">
                                            <div>
                                                <label>Ticket type</label>
                                                <input
                                                    type="text"
                                                    name="ticket_type"
                                                    required
                                                    className="form-control"
                                                    value={ticket_type.value}
                                                    onChange={(ev) =>
                                                        this._setValue(
                                                            ev,
                                                            "ticket_type"
                                                        )
                                                    }
                                                />
                                                {dirty &&
                                                ticket_type.err === "*" ? (
                                                    <FormError err="Ticket type cannot be empty" />
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-sm-6">
                                            <div>
                                                <label>Status</label>
                                                <select
                                                    name="status"
                                                    required
                                                    className="form-control form-select"
                                                    value={status.value}
                                                    onChange={(ev) =>
                                                        this._setValue(
                                                            ev,
                                                            "status"
                                                        )
                                                    }
                                                >
                                                    <option value="">
                                                        Choose status
                                                    </option>
                                                    <option value={1}>
                                                        On time
                                                    </option>
                                                    <option value={2}>
                                                        Delay
                                                    </option>
                                                </select>
                                                {dirty && status.err === "*" ? (
                                                    <FormError err="Status cannot be empty" />
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
                                        <div className="col-sm-6">
                                            <div>
                                                <label>Carbin baggage</label>
                                                <input
                                                    required
                                                    name="carbin_bag"
                                                    className="form-control"
                                                    value={carbin_bag.value}
                                                    onChange={(ev) =>
                                                        this._setValue(
                                                            ev,
                                                            "carbin_bag"
                                                        )
                                                    }
                                                />
                                                {dirty &&
                                                carbin_bag.err === "*" ? (
                                                    <FormError err="Carbin baggage cannot be empty" />
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div>
                                                <label>Checkin baggage</label>
                                                <input
                                                    required
                                                    name="checkin_bag"
                                                    className="form-control"
                                                    value={checkin_bag.value}
                                                    onChange={(ev) =>
                                                        this._setValue(
                                                            ev,
                                                            "checkin_bag"
                                                        )
                                                    }
                                                />
                                                {dirty &&
                                                checkin_bag.err === "*" ? (
                                                    <FormError err="Checkin baggage cannot be empty" />
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
                                        <div className="col-sm-6">
                                            <div>
                                                <label>Price</label>
                                                <input
                                                    required
                                                    name="price"
                                                    className="form-control"
                                                    value={price.value}
                                                />
                                                {dirty && price.err === "*" ? (
                                                    <FormError err="Price cannot be empty" />
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div>
                                                <label>Tax</label>
                                                <input
                                                    required
                                                    name="tax"
                                                    className="form-control"
                                                    value={tax.value}
                                                    onChange={(ev) =>
                                                        this._setValue(
                                                            ev,
                                                            "tax"
                                                        )
                                                    }
                                                />
                                                {dirty && tax.err === "*" ? (
                                                    <FormError err="Tax cannot be empty" />
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
                                        <div className="col-sm-6">
                                            <div>
                                                <label>Business seat tax</label>
                                                <input
                                                    required
                                                    name="business_seat_fee"
                                                    className="form-control"
                                                    value={
                                                        business_seat_fee.value
                                                    }
                                                    onChange={(ev) =>
                                                        this._setValue(
                                                            ev,
                                                            "business_seat_fee"
                                                        )
                                                    }
                                                />
                                                {dirty &&
                                                business_seat_fee.err ===
                                                    "*" ? (
                                                    <FormError err="Business seat fee cannot be empty" />
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div>
                                                <label>Deluxe seat tax</label>
                                                <input
                                                    required
                                                    name="deluxe_seat_fee"
                                                    className="form-control"
                                                    value={
                                                        deluxe_seat_fee.value
                                                    }
                                                    onChange={(ev) =>
                                                        this._setValue(
                                                            ev,
                                                            "deluxe_seat_fee"
                                                        )
                                                    }
                                                />
                                                {dirty &&
                                                deluxe_seat_fee.err === "*" ? (
                                                    <FormError err="Deluxe seat fee cannot be empty" />
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
                                        <div className="col-sm-6">
                                            <div>
                                                <label>Economy seat fee</label>
                                                <input
                                                    required
                                                    name="economy_seat_fee"
                                                    className="form-control"
                                                    value={
                                                        economy_seat_fee.value
                                                    }
                                                    onChange={(ev) =>
                                                        this._setValue(
                                                            ev,
                                                            "economy_seat_fee"
                                                        )
                                                    }
                                                />
                                                {dirty &&
                                                economy_seat_fee.err === "*" ? (
                                                    <FormError err="Economy seat fee cannot be empty" />
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div>
                                                <label>Special seat fee</label>
                                                <input
                                                    required
                                                    name="exit_seat_fee"
                                                    className="form-control"
                                                    value={exit_seat_fee.value}
                                                    onChange={(ev) =>
                                                        this._setValue(
                                                            ev,
                                                            "exit_seat_fee"
                                                        )
                                                    }
                                                />
                                                {dirty &&
                                                exit_seat_fee.err === "*" ? (
                                                    <FormError err="Emergency exit seat fee cannot be empty" />
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
            </div>
        );
    }
}
export default AddNewTicket;
