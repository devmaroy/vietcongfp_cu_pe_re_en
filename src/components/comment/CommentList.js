import React from 'react';
import PropTypes from 'prop-types';
import Pagination from "react-js-pagination";
import CommentItem from './CommentItem';

class CommentList extends React.Component {
    state = {
        activePage: 1,
        commentsPerPage: 5
    }

    handlePageChange = ( pageNumber ) => {
        this.setState( () => ( { activePage: pageNumber } ) );
    }

    render() {
        const { activePage, commentsPerPage } = this.state;
        const { comments } = this.props;

        return (
            <div>
                <h3>Comments: { comments.length }</h3>
                {
                    comments.length === 0 ? (
                        <p>There are no comments.</p>
                    ) : (
                        <div>
                            <div className="comments">
                                {
                                    comments
                                        .slice( ( activePage - 1 ) * commentsPerPage, ( commentsPerPage * activePage ) )
                                        .map( ( comment ) => <CommentItem key={ comment.id } comment={ comment } /> )
                                }
                            </div>  
                            {  
                                comments.length > commentsPerPage && (
                                    <div className="site-pagination">
                                        <Pagination
                                            activePage={ this.state.activePage }
                                            itemsCountPerPage={ commentsPerPage }
                                            totalItemsCount={ comments.length }
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

CommentList.propTypes = {
    comments: PropTypes.array.isRequired
};

export default CommentList;