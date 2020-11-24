import React, { Component, Fragment } from "react"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import { Link } from "react-router-dom"
import classNames from "classnames"
import Missions from "./Missions"

// specific_launch <<<--- user same query name as you used in schema.js
const SpecificRocketQuery = gql`
    query SpecificRocketQuery($flight_number: Int!) {
        specific_launch(flight_number: $flight_number) {
            flight_number
            mission_name
            launch_year
            launch_success
            launch_date_local,
            rocket {
                rocket_id
                rocket_name
                rocket_type
            }
        }
    }
`

class LaunchDetails extends Component {
    render() {
        let { flight_number } = this.props.match.params;
        flight_number = parseInt(flight_number);


        // childs_1 / child_2 style
        const child_style = {
            width: "50%",
            float: "left",
            padding: "10px"
        }



        return (
            <Fragment>
                <Query query={SpecificRocketQuery} variables={{ flight_number }}>
                    {
                        ({ loading, error, data }) => {
                            if (loading) return <h4>Loading . . .</h4>
                            if (error) return <h4>Error</h4>;

                            const {
                                mission_name,
                                flight_number,
                                launch_year,
                                launch_success,
                                rocket: { rocket_id, rocket_name, rocket_type }
                            } = data.specific_launch



                            return (
                                <div>
                                    <h3 style={{ margin: "40px 0px" }}>Mission Name:
                                        <span
                                            style={{
                                                marginLeft: "20px",
                                            }} >{mission_name}
                                        </span>
                                    </h3>


                                    <div>
                                        <div className="child_1" style={child_style}>
                                            <h4>Launch Details</h4>
                                            <ul className="list-group">
                                                <li className="list-group-item">Flight Number: <b style={{ color: "white" }}>{flight_number}</b></li>
                                                <li className="list-group-item">Launch Year: <b style={{ color: "white" }}>{launch_year}</b></li>
                                                <li className="list-group-item">
                                                    Launch Success: <span className={
                                                        classNames({
                                                            "text-success": launch_success,
                                                            "text-danger": !launch_success
                                                        })}>
                                                        <b style={{ color: "white" }} >{launch_success ? "Yes" : "No"}</b>
                                                    </span></li>
                                            </ul>
                                        </div>



                                        <div className="child_2" style={child_style}>
                                            <h4>Rocket Details</h4>
                                            <ul className="list-group">
                                                <li className="list-group-item">Rocket ID: <b style={{ color: "white" }} >{rocket_id}</b></li>
                                                <li className="list-group-item">Rocket Name: <b style={{ color: "white" }}>{rocket_name}</b></li>
                                                <li className="list-group-item">Rocket Type: <b style={{ color: "white" }}>{rocket_type}</b></li>
                                            </ul>
                                        </div>
                                    </div>


                                    <Link to="/" className="btn btn-secondary" style={{
                                        margin: "100px 0px"
                                    }}>Back</Link>


                                </div>
                            );
                        }
                    }

                </Query >

            </Fragment >
        );
    }
}

export default LaunchDetails;