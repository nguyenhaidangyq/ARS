import React from "react";
import { Component } from "react";
import { goTo } from "../../../../../Helpers/Redirect/Redirect";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onLogout = () => {
        localStorage.removeItem("adminId");
        goTo("admin-login");
    };

    render() {
        const adminInfo = JSON.parse(localStorage.getItem("adminInfo" || ""));
        return (
            <header className="mb-3">
                <nav className="navbar navbar-expand navbar-light ">
                    <div className="container-fluid">
                        <a href="#" className="burger-btn d-block">
                            <i className="bi bi-justify fs-3" />
                        </a>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div
                            className="collapse navbar-collapse"
                            id="navbarSupportedContent"
                        >
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item dropdown me-1">
                                    <a
                                        className="nav-link active dropdown-toggle"
                                        href="#"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <i className="bi bi-envelope bi-sub fs-4 text-gray-600" />
                                    </a>
                                    <ul
                                        className="dropdown-menu dropdown-menu-end"
                                        aria-labelledby="dropdownMenuButton"
                                    >
                                        <li>
                                            <h6 className="dropdown-header">
                                                Mail
                                            </h6>
                                        </li>
                                        <li>
                                            <a
                                                className="dropdown-item"
                                                href="#"
                                            >
                                                No new mail
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item dropdown me-3">
                                    <a
                                        className="nav-link active dropdown-toggle"
                                        href="#"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <i className="bi bi-bell bi-sub fs-4 text-gray-600" />
                                    </a>
                                    <ul
                                        className="dropdown-menu dropdown-menu-end"
                                        aria-labelledby="dropdownMenuButton"
                                    >
                                        <li>
                                            <h6 className="dropdown-header">
                                                Notifications
                                            </h6>
                                        </li>
                                        <li>
                                            <a className="dropdown-item">
                                                No notification available
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            <div className="dropdown">
                                <a
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    style={{
                                        cursor: "pointer",
                                        textDecoration: "none",
                                    }}
                                >
                                    <div className="user-menu d-flex">
                                        <div className="user-name text-end me-3">
                                            <h6
                                                className="mb-0 text-gray-600"
                                                style={{
                                                    textDecoration: "none",
                                                }}
                                            >
                                                {adminInfo.name}
                                            </h6>
                                            <p
                                                className="mb-0 text-sm text-gray-600"
                                                style={{
                                                    textDecoration: "none",
                                                }}
                                            >
                                                {adminInfo.roleId == 1
                                                    ? "Administrator"
                                                    : adminInfo.roleId == 2
                                                    ? "Agent"
                                                    : ""}
                                            </p>
                                        </div>
                                        <div className="user-img d-flex align-items-center">
                                            <div className="avatar avatar-md">
                                                <img src="https://i.postimg.cc/ncm8z6TL/avatar-512.png" />
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                <ul
                                    className="dropdown-menu dropdown-menu-end"
                                    aria-labelledby="dropdownMenuButton"
                                >
                                    <li>
                                        <h6 className="dropdown-header">
                                            {`Hello, ${adminInfo.name}`}
                                        </h6>
                                    </li>
                                    {/* <li>
                                        <a className="dropdown-item" href="#">
                                            <i className="icon-mid bi bi-person me-2" />{" "}
                                            My Profile
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            <i className="icon-mid bi bi-gear me-2" />
                                            Settings
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            <i className="icon-mid bi bi-wallet me-2" />
                                            Wallet
                                        </a>
                                    </li> */}
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li onClick={this.onLogout}>
                                        <a className="dropdown-item" href="#">
                                            <i className="icon-mid bi bi-box-arrow-left me-2" />{" "}
                                            Logout
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}

export default Header;
