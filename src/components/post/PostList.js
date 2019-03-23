import React from 'react';
import PropTypes from 'prop-types';
import Pagination from "react-js-pagination";
import PostItem from './PostItem';

class PostList extends React.Component {
    state = {
        activePage: 1,
        postsPerPage: 5
    }

    handlePageChange = ( pageNumber ) => {
        this.setState( () => ( { activePage: pageNumber } ) );
    }

    render() {
        const { activePage, postsPerPage } = this.state;
        const { posts } = this.props;

        return (
            <div>
                {
                    posts.length === 0 ? (
                        <p>There are no posts.</p>
                    ) : (
                        <div>
                            <div className="posts">
                                {
                                    posts
                                        .slice( ( activePage - 1 ) * postsPerPage, ( postsPerPage * activePage ) )
                                        .map( ( post ) => <PostItem key={ post.id } post={ post } /> )
                                }
                            </div>
                            {
                                posts.length > postsPerPage && (
                                    <div className="site-pagination">
                                        <Pagination
                                            activePage={ this.state.activePage }
                                            itemsCountPerPage={ postsPerPage }
                                            totalItemsCount={ posts.length }
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

PostList.propTypes = {
    posts: PropTypes.array.isRequired
};

export default PostList;