import React, { Component } from "react";
import AddLoanPopup from "./AddLoanPopup";
import LoanTable from "./LoanTable";
import GenerateExcel from "./GenerateExcel";
import Cards from "./Cards";
import Loader from "./../Common/Loader";

class LoanPage extends Component {
    constructor(props) {
        super(props);

        this.state = { showPopup: false };
    }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    render() {
        const styleFromSettings = {
            fontFamily: this.props.settings ? this.props.settings.font : "sans-serif",
            backgroundColor: this.props.settings
                ? this.props.settings.mode === "night"
                    ? "#484842"
                    : "#EDF0EF"
                : "#EDF0EF",
            minHeight: "91vh"
        };

        if (this.props.settings) {
            return (
                <div className="container-fluid" style={styleFromSettings}>
                    <div className="row">
                        <div className="col-sm-12">
                            <Cards loans={this.props.loans} authUser={this.props.user} />
                            <GenerateExcel
                                loans={this.props.loans}
                                authUser={this.props.user}
                                settings={this.props.settings}
                            />
                            <LoanTable
                                loans={this.props.loans}
                                authUser={this.props.user}
                                settings={this.props.settings}
                            />
                        </div>
                    </div>

                    {this.props.loans ? (
                        <button className="addloan-btn" onClick={this.togglePopup.bind(this)} id="addLoan">
                            <i className="fa fa-plus-circle fa-5x" aria-hidden="true" />
                        </button>
                    ) : null}

                    {this.state.showPopup ? (
                        <AddLoanPopup
                            user={this.props.user}
                            closePopup={this.togglePopup.bind(this)}
                            settings={this.props.settings}
                        />
                    ) : null}
                </div>
            );
        } else {
            return (
                <div>
                    <Loader />
                </div>
            );
        }
    }
}

export default LoanPage;
