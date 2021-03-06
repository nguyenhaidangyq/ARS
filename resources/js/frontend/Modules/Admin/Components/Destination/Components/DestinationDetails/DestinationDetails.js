import React, { Component } from "react";
import DestinationService from "../../Shared/DestinationService";
import Form from "../../../../../../Shared/Components/Form/Form";
import FormError from "../../../../../../Shared/Components/Form/FormError";
import "../DestinationDetails.scss";
import AlertSuccess from "../../../../../../Shared/Components/Alert/AlertSuccess";
import AlertDanger from "../../../../../../Shared/Components/Alert/AlertDanger";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import AddFavouriteDestination from "../AddFavouriteDestination/AddFavouriteDestination";
import { URL_IMAGE_DESTINATION } from "../../../../../../Constances/const";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        overflow: "hidden",
        backgroundColor: theme.palette.background.paper,
    },
    imageList: {
        width: 500,
        height: 450,
        // Promote the list into its own layer in Chrome. This cost memory, but helps keep FPS high.
        transform: "translateZ(0)",
    },
    titleBar: {
        background:
            "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
            "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
    },
    icon: {
        color: "white",
    },
}));
class DestinationDetails extends Form {
    constructor(props) {
        super(props);
        this.state = {
            form: this._getInitFormData({
                city: "",
                province: "",
                airport_code: "",
                airport: "",
                country_code: "",
                country: "",
            }),
            provinceOrg: "",
            onEdit: false,
            message: "",
            updateMessage: "",
            errorMessage: "",
            imageList: [],
        };
    }
    componentDidMount() {
        this.getDestinationDetails();
        this.getImageList();
    }
    getDestinationDetails = () => {
        const { id } = this.props.match.params;
        DestinationService.getDestinationDetails(id).then((res) => {
            this._fillForm({
                city: res.data.city,
                province: res.data.province,
                airport_code: res.data.airport_code,
                airport: res.data.airport_name,
                country_code: res.data.country_code,
                country: res.data.country,
            });
            this.setState({
                provinceOrg: res.data.province,
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
        const { form } = this.state;
        if (this.state.provinceOrg == null || this.state.provinceOrg == "") {
            Object.keys(form).forEach((k) => {
                if (k == "province") {
                    Object.keys(form.province).forEach((i) => {
                        form.province[i] = "";
                    });
                }
            });
        }
        this.setState({ form });
        this.getDestinationDetails();
    };

    onSaveChangeInfo = () => {
        this._validateForm();
        this.state.form["dirty"] = true;
        const { id } = this.props.match.params;
        if (this._isFormValid()) {
            const { form } = this.state;
            const data = {
                city: form.city.value,
                province: form.province.value,
                airport_code: form.airport_code.value,
                airport_name: form.airport.value,
                country: form.country.value,
                country_code: form.country_code.value,
            };
            DestinationService.updateDestination(id, data)
                .then((res) => {
                    console.log(res.data);
                    this.setState({
                        updateMessage: "Update destination successfully ",
                    });
                })
                .catch((err) => {
                    this.setState({
                        errorMessage: "Update destionation failed",
                    });
                });
            this.setState({ onEdit: false });
        }
    };

    onAddImage = (data) => {
        const { id } = this.props.match.params;
        let formData = new FormData();
        formData.append("image", data);
        DestinationService.uploadImageDestination(id, formData)
            .then((res) => {
                this.setState({
                    message: `Upload image successful !!`,
                });
                this.getImageList();
            })
            .catch((err) => {
                this.setState({
                    errorMessage: `Upload image failed !!`,
                });
            });
    };

    getImageList = () => {
        const { id } = this.props.match.params;
        DestinationService.getImageList(id).then((res) => {
            this.setState({
                imageList: res.data,
            });
        });
    };
    render() {
        const {
            city,
            province,
            airport_code,
            airport,
            country_code,
            country,
            dirty,
        } = this.state.form;
        const { updateMessage, errorMessage, onEdit, imageList } = this.state;

        if (updateMessage.length > 0 || errorMessage.length > 0) {
            const timer = setTimeout(() => {
                this.setState({
                    updateMessage: "",
                    errorMessage: "",
                });
            }, 10000);
        }
        const { classes } = this.props;
        const { id } = this.props.match.params;
        return (
            <div className="destination-details">
                <div className="card">
                    <div className="card-header">
                        <h4
                            className="card-title"
                            style={{ marginLeft: "20px" }}
                        >
                            Destination details
                            <div className="float-right">
                                {!onEdit ? (
                                    <button
                                        style={{ marginRight: "20px" }}
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
                                            style={{
                                                marginRight: "22px",
                                            }}
                                            onClick={this.onCancelEdit}
                                            className="btn btn-warning"
                                        >
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
                    <section id="multiple-column-form">
                        <div className="row match-height">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-content">
                                        <div className="card-body">
                                            <form
                                                className="form"
                                                style={{ padding: "20px" }}
                                            >
                                                <div className="row">
                                                    <div
                                                        className="col-md-6 col-12"
                                                        style={{
                                                            paddingRight:
                                                                "20px",
                                                        }}
                                                    >
                                                        <div>
                                                            <label htmlFor="first-name-column">
                                                                City
                                                            </label>
                                                            <input
                                                                type="text"
                                                                required
                                                                id="first-name-column"
                                                                className="form-control"
                                                                disabled={
                                                                    !onEdit
                                                                }
                                                                name="city"
                                                                value={
                                                                    city.value
                                                                }
                                                                onChange={(
                                                                    ev
                                                                ) =>
                                                                    this._setValue(
                                                                        ev,
                                                                        "city"
                                                                    )
                                                                }
                                                            />
                                                            {city.err == "*" &&
                                                            dirty ? (
                                                                <FormError
                                                                    err={
                                                                        "City cannot be empty"
                                                                    }
                                                                />
                                                            ) : (
                                                                ""
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="col-md-6 col-12"
                                                        style={{
                                                            paddingLeft: "20px",
                                                        }}
                                                    >
                                                        <div>
                                                            <label htmlFor="first-name-column">
                                                                Province
                                                            </label>
                                                            <input
                                                                type="text"
                                                                id="first-name-column"
                                                                className="form-control"
                                                                disabled={
                                                                    !onEdit
                                                                }
                                                                name="province"
                                                                value={
                                                                    province.value
                                                                }
                                                                onChange={(
                                                                    ev
                                                                ) =>
                                                                    this._setValue(
                                                                        ev,
                                                                        "province"
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    className="row"
                                                    style={{
                                                        marginTop: "20px",
                                                    }}
                                                >
                                                    <div
                                                        className="col-md-6 col-12"
                                                        style={{
                                                            paddingRight:
                                                                "20px",
                                                        }}
                                                    >
                                                        <div>
                                                            <label htmlFor="last-name-column">
                                                                Airport code
                                                            </label>
                                                            <input
                                                                type="text"
                                                                id="last-name-column"
                                                                className="form-control"
                                                                required
                                                                disabled={
                                                                    !onEdit
                                                                }
                                                                name="airport_code"
                                                                value={
                                                                    airport_code.value
                                                                }
                                                                onChange={(
                                                                    ev
                                                                ) =>
                                                                    this._setValue(
                                                                        ev,
                                                                        "airport_code"
                                                                    )
                                                                }
                                                            />
                                                            {airport_code.err ==
                                                                "*" && dirty ? (
                                                                <FormError
                                                                    err={
                                                                        "Airport code cannot be empty"
                                                                    }
                                                                />
                                                            ) : (
                                                                ""
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="col-md-6 col-12"
                                                        style={{
                                                            paddingLeft: "20px",
                                                        }}
                                                    >
                                                        <div>
                                                            <label htmlFor="city-column">
                                                                Airport
                                                            </label>
                                                            <input
                                                                type="text"
                                                                id="city-column"
                                                                className="form-control"
                                                                required
                                                                disabled={
                                                                    !onEdit
                                                                }
                                                                name="airport"
                                                                value={
                                                                    airport.value
                                                                }
                                                                onChange={(
                                                                    ev
                                                                ) =>
                                                                    this._setValue(
                                                                        ev,
                                                                        "airport"
                                                                    )
                                                                }
                                                            />
                                                            {airport.err ==
                                                                "*" && dirty ? (
                                                                <FormError
                                                                    err={
                                                                        "Airport cannot be empty"
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
                                                    style={{
                                                        marginTop: "20px",
                                                    }}
                                                >
                                                    <div
                                                        className="col-md-6 col-12"
                                                        style={{
                                                            paddingRight:
                                                                "20px",
                                                        }}
                                                    >
                                                        <div>
                                                            <label htmlFor="country-floating">
                                                                Country
                                                            </label>
                                                            <input
                                                                type="text"
                                                                id="country-floating"
                                                                className="form-control"
                                                                required
                                                                disabled={
                                                                    !onEdit
                                                                }
                                                                name="country"
                                                                value={
                                                                    country.value
                                                                }
                                                                onChange={(
                                                                    ev
                                                                ) =>
                                                                    this._setValue(
                                                                        ev,
                                                                        "country"
                                                                    )
                                                                }
                                                            />
                                                            {country.err ==
                                                                "*" && dirty ? (
                                                                <FormError
                                                                    err={
                                                                        "Country cannot be empty"
                                                                    }
                                                                />
                                                            ) : (
                                                                ""
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="col-md-6 col-12"
                                                        style={{
                                                            paddingLeft: "20px",
                                                        }}
                                                    >
                                                        <div>
                                                            <label htmlFor="company-column">
                                                                Country code
                                                            </label>
                                                            <input
                                                                type="text"
                                                                id="company-column"
                                                                required
                                                                className="form-control"
                                                                disabled={
                                                                    !onEdit
                                                                }
                                                                name="country_code"
                                                                value={
                                                                    country_code.value
                                                                }
                                                                onChange={(
                                                                    ev
                                                                ) =>
                                                                    this._setValue(
                                                                        ev,
                                                                        "country_code"
                                                                    )
                                                                }
                                                            />
                                                            {country_code.err ==
                                                                "*" && dirty ? (
                                                                <FormError
                                                                    err={
                                                                        "Country code cannot be empty"
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
                            </div>
                        </div>
                    </section>
                </div>
                <div className="image-list">
                    <div className="card">
                        <div className="card-header">
                            {" "}
                            <div className="float-right">
                                <button
                                    className="btn btn-primary"
                                    data-toggle="modal"
                                    data-target={`#addImageDestination${id}`}
                                >
                                    Add new image
                                </button>
                            </div>
                            <h3 className="card-title">Image List</h3>
                        </div>
                        <div className="card-content">
                            <div className="card-body">
                                <ImageList
                                    rowHeight={200}
                                    gap={1}
                                    className={classes.imageList}
                                >
                                    {imageList.map((item) => {
                                        return (
                                            <ImageListItem
                                                key={item.id}
                                                cols={1}
                                                rows={3}
                                            >
                                                <img
                                                    src={
                                                        URL_IMAGE_DESTINATION +
                                                        item.image_name
                                                    }
                                                    alt={"Hello"}
                                                />
                                                <ImageListItemBar
                                                    title={"Hello"}
                                                    position="top"
                                                    actionIcon={
                                                        <IconButton
                                                            aria-label={`star`}
                                                            className={
                                                                classes.icon
                                                            }
                                                        >
                                                            <StarBorderIcon />
                                                        </IconButton>
                                                    }
                                                    actionPosition="left"
                                                    className={classes.titleBar}
                                                />
                                            </ImageListItem>
                                        );
                                    })}
                                </ImageList>
                            </div>
                            <AddFavouriteDestination
                                onSubmitImage={this.onAddImage}
                                destinationId={id}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default withStyles(useStyles)(DestinationDetails);
