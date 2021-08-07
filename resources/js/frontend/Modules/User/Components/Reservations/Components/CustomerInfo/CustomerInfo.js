import { Typography } from "@material-ui/core";
import React from "react";
import { Component } from "react";
import "./CustomerInfo.scss";
import Form from "../../../../../../Shared/Components/Form/Form";
import FormError from "../../../../../../Shared/Components/Form/FormError";
import { data } from "jquery";

class CustomerInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            adults: [],
            children: [],
            infants: [],
            isValid: false,
        };
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.data !== this.props.data) {
            nextProps.data.passenger.forEach((item) => {
                if (item.passenger_type == 1 && item.quantity > 0) {
                    let { adults } = this.state;
                    for (let i = 0; i < item.quantity; i++) {
                        let data = {
                            id: Math.random(10),
                            name: { value: "", err: "" },
                            birthday: { value: "", err: "" },
                            gender: { value: "Nam", err: "" },
                        };
                        adults.push(data);
                    }
                    this.setState({ adults });
                } else if (item.passenger_type == 2 && item.quantity > 0) {
                    let { children } = this.state;
                    for (let i = 0; i < item.quantity; i++) {
                        let data = {
                            id: Math.random(10),
                            name: { value: "", err: "" },
                            birthday: { value: "", err: "" },
                            gender: { value: "Nam", err: "" },
                        };
                        children.push(data);
                    }
                    this.setState({ children });
                } else if (item.passenger_type == 3 && item.quantity > 0) {
                    let { infants } = this.state;
                    for (let i = 0; i < item.quantity; i++) {
                        let data = {
                            id: Math.random(10),
                            name: { value: "", err: "" },
                            birthday: { value: "", err: "" },
                            gender: { value: "Nam", err: "" },
                        };
                        infants.push(data);
                    }
                    this.setState({ infants });
                }
            });
        }

        if (nextProps.onReservation == true) {
            this.onReservation();
        }
    };

    setValue = (ev, stateKey, id) => {
        const { name, value } = ev.target;
        if (stateKey == 1) {
            let { adults } = this.state;
            adults.forEach((item) => {
                if (id == item.id) {
                    item[[name]].value = value;
                }
            });
            this.setState({ adults });
        } else if (stateKey == 2) {
            let { children } = this.state;
            children.forEach((item) => {
                if (id == item.id) {
                    item[[name]].value = value;
                }
            });
            this.setState({ children });
        } else if (stateKey == 3) {
            let { infants } = this.state;
            infants.forEach((item) => {
                if (id == item.id) {
                    item[[name]].value = value;
                }
            });
            this.setState({ infants });
        }
        this.setState({ isValid: true });
    };

    validateForm = () => {
        let { adults, children, infants } = this.state;
        adults.forEach((item) => {
            Object.keys(item).forEach((k) => {
                if (
                    (k !== "id" && item[k].value == "") ||
                    (item[k].value == null && k !== "id")
                ) {
                    item[k].err = "*";
                } else if (k !== "id") {
                    item[k].err = "";
                }
            });
        });
        children.forEach((item) => {
            Object.keys(item).forEach((k) => {
                if (
                    (k !== "id" && item[k].value == "") ||
                    (item[k].value == null && k !== "id")
                ) {
                    item[k].err = "*";
                } else if (k !== "id") {
                    item[k].err = "";
                }
            });
        });
        infants.forEach((item) => {
            Object.keys(item).forEach((k) => {
                if (
                    (k !== "id" && item[k].value == "") ||
                    (item[k].value == null && k !== "id")
                ) {
                    item[k].err = "*";
                } else if (k !== "id") {
                    item[k].err = "";
                }
            });
        });
        this.setState({ adults, children, infants });
    };

    isValidForm = () => {
        let { adults, children, infants } = this.state;
        let isValid = false;
        adults.forEach((item) => {
            isValid = !Object.keys(item).find((k) => !!item[k].err);
        });
        children.forEach((item) => {
            isValid = !Object.keys(item).find((k) => !!item[k].err);
        });
        infants.forEach((item) => {
            isValid = !Object.keys(item).find((k) => !!item[k].err);
        });
        return isValid;
    };

    onReservation = () => {
        this.validateForm();
        if (this.isValidForm()) {
            console.log("Form is valid");
        } else {
            console.log("Form not valid");
        }
    };

    render() {
        const { data, onReservation } = this.props;
        const { adults, children, infants, isValid } = this.state;
        console.log("45", this.state);
        const passenger = [];
        if (Array.isArray(data.passenger)) {
            data.passenger.forEach((item) => {
                if (item.quantity > 0) {
                    passenger.push(item);
                }
            });
        }
        let loop = 1;

        return (
            <div>
                <div className="customer-info">
                    <div className="title-box">
                        <Typography variant="h4" className="title">
                            Thông tin khách hàng
                        </Typography>
                    </div>
                    <div className="content">
                        <div className="list-sub-title">
                            <div className="row">
                                <div className="col-md-2">
                                    <Typography
                                        variant="h6"
                                        className="sub-title"
                                    >
                                        Khách hàng
                                    </Typography>
                                </div>
                                <div className="col-md-2">
                                    <Typography
                                        variant="h6"
                                        className="sub-title"
                                    >
                                        Giới tính
                                    </Typography>
                                </div>
                                <div className="col-md-4">
                                    <Typography
                                        variant="h6"
                                        className="sub-title"
                                    >
                                        Họ và tên
                                    </Typography>
                                </div>
                                <div className="col-md-3">
                                    <Typography
                                        variant="h6"
                                        className="sub-title"
                                    >
                                        Ngày sinh
                                    </Typography>
                                </div>
                            </div>
                        </div>
                        <div className="list-sub-content">
                            {adults.map((item) => {
                                return (
                                    <div key={item.id} className="sub-content">
                                        <div className="row">
                                            <div className="col-md-2">
                                                <Typography
                                                    variant="body1"
                                                    className="sub-content-title"
                                                >
                                                    Người lớn
                                                </Typography>
                                            </div>
                                            <div className="col-md-2">
                                                <select
                                                    name="gender"
                                                    required
                                                    className="form-control form-select"
                                                    value={item.gender.value}
                                                    onChange={(ev) =>
                                                        this.setValue(
                                                            ev,
                                                            1,
                                                            item.id
                                                        )
                                                    }
                                                >
                                                    <option value={"Nam"}>
                                                        Nam
                                                    </option>
                                                    <option value={"Nữ"}>
                                                        Nữ
                                                    </option>
                                                </select>
                                            </div>
                                            <div className="col-md-4">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    required
                                                    className="form-control "
                                                    value={item.name.value}
                                                    onChange={(ev) =>
                                                        this.setValue(
                                                            ev,
                                                            1,
                                                            item.id
                                                        )
                                                    }
                                                />
                                                {item.name.err == "*" &&
                                                !isValid ? (
                                                    <FormError
                                                        err={
                                                            "Tên không được để trống"
                                                        }
                                                    />
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                            <div className="col-md-4">
                                                <input
                                                    type="date"
                                                    name="birthday"
                                                    required
                                                    className="form-control"
                                                    value={item.birthday.value}
                                                    onChange={(ev) =>
                                                        this.setValue(
                                                            ev,
                                                            1,
                                                            item.id
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="baggage-info">
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <Typography
                                                        variant="body1"
                                                        className="sub-content-title"
                                                    >
                                                        Hành lý
                                                    </Typography>
                                                </div>
                                                <div className="col-md-10">
                                                    <select
                                                        name="checking-bag"
                                                        className="form-control form-select"
                                                    >
                                                        <option>
                                                            {`Tổng cộng ${
                                                                data.checkin_bag +
                                                                data.carbin_bag
                                                            }kg hành lý`}
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            {children.map((item) => {
                                return (
                                    <div key={item.id} className="sub-content">
                                        <div className="row">
                                            <div className="col-md-2">
                                                <Typography
                                                    variant="body1"
                                                    className="sub-content-title"
                                                >
                                                    Trẻ em
                                                </Typography>
                                            </div>
                                            <div className="col-md-2">
                                                <select
                                                    name="gender"
                                                    required
                                                    className="form-control form-select"
                                                    value={item.gender.value}
                                                    onChange={(ev) =>
                                                        this.setValue(
                                                            ev,
                                                            2,
                                                            item.id
                                                        )
                                                    }
                                                >
                                                    <option value={"Nam"}>
                                                        Nam
                                                    </option>
                                                    <option value={"Nữ"}>
                                                        Nữ
                                                    </option>
                                                </select>
                                            </div>
                                            <div className="col-md-4">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    required
                                                    className="form-control "
                                                    value={item.name.value}
                                                    onChange={(ev) =>
                                                        this.setValue(
                                                            ev,
                                                            2,
                                                            item.id
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <input
                                                    type="date"
                                                    name="birthday"
                                                    required
                                                    className="form-control"
                                                    value={item.birthday.value}
                                                    onChange={(ev) =>
                                                        this.setValue(
                                                            ev,
                                                            2,
                                                            item.id
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="baggage-info">
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <Typography
                                                        variant="body1"
                                                        className="sub-content-title"
                                                    >
                                                        Hành lý
                                                    </Typography>
                                                </div>
                                                <div className="col-md-10">
                                                    <select
                                                        name="checking-bag"
                                                        className="form-control form-select"
                                                    >
                                                        <option>
                                                            {`Tổng cộng ${
                                                                data.checkin_bag +
                                                                data.carbin_bag
                                                            }kg hành lý`}
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            {infants.map((item) => {
                                return (
                                    <div key={item.id} className="sub-content">
                                        <div className="row">
                                            <div className="col-md-2">
                                                <Typography
                                                    variant="body1"
                                                    className="sub-content-title"
                                                >
                                                    Em bé
                                                </Typography>
                                            </div>
                                            <div className="col-md-2">
                                                <select
                                                    name="gender"
                                                    required
                                                    className="form-control form-select"
                                                    value={item.gender.value}
                                                    onChange={(ev) =>
                                                        this.setValue(
                                                            ev,
                                                            3,
                                                            item.id
                                                        )
                                                    }
                                                >
                                                    <option value={"Nam"}>
                                                        Nam
                                                    </option>
                                                    <option value={"Nữ"}>
                                                        Nữ
                                                    </option>
                                                </select>
                                            </div>
                                            <div className="col-md-4">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    required
                                                    className="form-control "
                                                    value={item.name.value}
                                                    onChange={(ev) =>
                                                        this.setValue(
                                                            ev,
                                                            3,
                                                            item.id
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <input
                                                    type="date"
                                                    name="birthday"
                                                    required
                                                    className="form-control"
                                                    value={item.birthday.value}
                                                    onChange={(ev) =>
                                                        this.setValue(
                                                            ev,
                                                            3,
                                                            item.id
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="baggage-info">
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <Typography
                                                        variant="body1"
                                                        className="sub-content-title"
                                                    >
                                                        Hành lý
                                                    </Typography>
                                                </div>
                                                <div className="col-md-10">
                                                    <select
                                                        name="checking-bag"
                                                        className="form-control form-select"
                                                    >
                                                        <option>
                                                            {`Tổng cộng ${
                                                                data.checkin_bag +
                                                                data.carbin_bag
                                                            }kg hành lý`}
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CustomerInfo;
