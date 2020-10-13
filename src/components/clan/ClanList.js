import React from 'react';
import PropTypes from 'prop-types';
import Pagination from "react-js-pagination";
import ClanItem from './ClanItem';

class ClanList extends React.Component {
    state = {
        activePage: 1,
        clansPerPage: 5
    }

    handlePageChange = ( pageNumber ) => {
        this.setState( () => ( { activePage: pageNumber } ) );
    }

    render() {
        const { activePage, clansPerPage } = this.state;
        const { clans } = this.props;

        return (
            <div>
                {
                    clans.length === 0 ? (
                        <p>There are no clans.</p>
                    ) : (
                        <div>
                            <table className="clans">
                                <thead>
                                    <tr>
                                        <th>Country</th>
                                        <th>Tag</th>
                                        <th>Name</th>
                                        <th>Leader</th>
                                        <th>Web</th>
                                        <th>ESL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        clans
                                            .slice( ( activePage - 1 ) * clansPerPage, ( clansPerPage * activePage ) )
                                            .map( ( clan ) => <ClanItem key={ clan.id } clan={ clan } /> )
                                    }
                                </tbody>
                            </table>
                            {
                                clans.length > clansPerPage && (
                                    <div className="site-pagination">
                                        <Pagination
                                            activePage={ this.state.activePage }
                                            itemsCountPerPage={ clansPerPage }
                                            totalItemsCount={ clans.length }
                                            pageRangeDisplayed={ 5 }
                                            onChange={ this.handlePageChange }
                                        />
                                    </div>
                                )
                            }
                        </div>
                    )
                }
            </div>
        );
    };
};

ClanList.propTypes = {
    clans: PropTypes.array.isRequired
};

export default ClanList;