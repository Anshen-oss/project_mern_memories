import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';

import CommentSection from './CommentSection';
import { getPost, getPostsBySearch } from '../../actions/posts';
import useStyles from './styles';

/**
 * @function PostDetails
 * @returns details of a post
 * We're going to get the data about the post from the hook useSelector
 * We want to get the state from the reducer:
 *  const { post, posts, isLoading } = useSelector((state) => state.posts);
 */
const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();

/**
 * we have to create the logic for fetching only a single post based on the id with:
 * const { id } = useParams(); - We have to do it with useEffect which will happen when
 * when the id of the post changes. We want to get the post by some specific id.
 * Now, go Create the action creator getpost() in actions/post
 * And after make an api to the backend that's going to serve us all the details
 * about our specific post
*/
  useEffect(() => {
      dispatch(getPost(id));
    }, [id, dispatch]);

  /**
   *  the interesting thing about the recommended posts is that we're going to
   * use the same endpoint we created before getPostsBySearch.
   * We have a dependency array that's going to have the post so whenever the id
   * changes the postchanges and then we want to do something for each post we want
   * to see if the post exists and if it does, we want to dispatch a new action creator
   * and  we have to provide that search query.
   * we're not looking for search we're looking only for tags that's what we're
   * gonna use to recommend the posts so we can say:
   * dispatch(getPostsBySearch({ search: 'none', tags:post?.tags.join(',') }));
   */
    useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
    }
  }, [post]);


  if(!post) return null;

  const openPost = (_id) => history.push(`/posts/${_id}`);

 if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  /**
   * @function recommendedPosts
   * we want to destructure the underscore id from: posts.filter(({ _id }) and
   * then we want to keep all the posts but delete the one where _id is not
   *  equal to currentPost
   */
  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
           <Divider style={{ margin: '20px 0' }} />
          <CommentSection post={post} />
           <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>
      </div>
      {!!recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">You might also like:</Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
              <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                <Typography gutterBottom variant="h6">{title}</Typography>
                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                <Typography gutterBottom variant="subtitle2">{message}</Typography>
                <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                <img src={selectedFile} width="200px" alt="" />
              </div>
            ))}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default PostDetails;
