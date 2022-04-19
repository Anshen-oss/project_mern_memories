import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import { commentPost } from '../../actions/posts';

const CommentSection = ({ post }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [comment, setComment ]= useState('');
  const dispatch = useDispatch()
  const [ comments, setComments ] = useState([post?.comment]);

  const classes = useStyles();
 ;

  /**
   * @function handleComment - Print the comment of the user
   * When we click the comment button we have to dispatch a new action to our redux
   * on dispatch l'action commentPost plus précisément. Our comment also needs
   * to contain the information about who is creating that specific comment.
   * First, grab our user from the local storage:
   * const user = JSON.parse(localStorage.getItem('user'));
   *
   * secondly, form our comment to include the user's name and also the comment itself:
   * const finalComment = `${user.result.name}: ${comment}`;
   *
   * Then, Go to create the action in commentPost ../../actions/posts';
   *
   */
  const handleComment = async () => {
    const finalComment = `${user.result.name}: ${comment}`;
    // the second parameter of commentPost, we have to say which post does this comment belong to
    const newComments = await dispatch(commentPost(finalComment, post._id));

    setComments(newComments);
    setComment('');
  }

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">Comments</Typography>
          {comments?.map((c, i) => (
          <Typography key={i} gutterBottom variant="subtitle1">
            {c}
          </Typography>
        ))}
      </div>
      {/* If the user has a name then display this piece of code otherwise show nothing
      * not throw an error if the user doesn't exist with user? */}
      {user?.result.name && (
        <div style={{ width: '70%' }}>
            <Typography gutterBottom variant="h6">Write a comment</Typography>
            <TextField fullWidth rows={4} variant="outlined" label="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)} />
            {/* <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment}  color="primary" variant="contained" onClick={handleClick}>
              Comment
            </Button> */}
            <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment.length} variant="contained" color="primary" onClick={handleComment}>
              Comment
            </Button>
        </div>
        )}
      </div>
    </div>
  )
}

export default CommentSection;
