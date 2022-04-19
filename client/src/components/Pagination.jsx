import React, { useEffect } from 'react';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';

import { getPosts } from '../actions/posts';

/**
 * @function Paginate
 * @returns Pagination component
 * @const {number} count: the number of pages - un montant statique mais nous
 * devrons récupérer dynamiquement le nombre de pages en fonction du nombre de
 * Posts que nous avons actuellement.
 * @const {number} page - the current page
 * We pass the data from the item inside <PaginationItem />:
 * renderItem={(item) => (
 * <PaginationItem {...item} />
 * )}
 *
 * use hook useSelector() to get the number of pages
 */
const Paginate = ({ page }) => {
  const { numberOfPages } = useSelector((state) => state.posts);
  const classes = useStyles();
  const dispatch = useDispatch();

  /**
   * Fetch the post anytime that the page changes
   */
  useEffect(() => {
    if(page) dispatch(getPosts(page));
  }, [dispatch, page])

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
      )}
    />
  )
}

export default Paginate;
