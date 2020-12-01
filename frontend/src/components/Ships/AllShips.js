import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import ShipCards from "./ShipCards"
import ActiveHandle from "./ActiveHandle"


const ShipsQuery = gql`
    query ShipsQuery {
        ships {
            ship_id
            ship_name
            home_port
            ship_type
            year_built
            active
        }
    }
`


class AllShips extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="container" style={{ textAlign: "center", margin: "0 auto" }}>

                <Fragment>
                    <h3 style={{ marginBottom: "50px" }}>All Ship Launches</h3>
                    <ActiveHandle />

                    <Query query={ShipsQuery}>
                        {
                            ({ loading, error, data }) => {
                                if (loading) return <h4>Loading . . .</h4>
                                if (error) return <h4>Error</h4>

                                return (
                                    <Fragment>
                                        {data.ships.map(ship => (
                                            <ShipCards key={ship.ship_id} ship={ship} />
                                        ))}
                                    </Fragment>
                                )
                            }
                        }

                    </Query>
                </Fragment>

            </div>
        );
    }
}

export default AllShips;