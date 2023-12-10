import { useState } from "react";
import PropTypes from "prop-types";
import { List, ListItem, Collapse } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const Comments = ({ comment }) => {
  const [nestedCommentsOpen, setNestedCommentsOpen] = useState(false);

  const handleToggle = () => {
    setNestedCommentsOpen(!nestedCommentsOpen);
  };

  return (
    <List dense sx={{ mb: 2 }}>
      <ListItem disablePadding sx={{ my: 2 }}>
        {comment.text}
      </ListItem>
      {!!comment.kids && !!comment.kids.length && (
        <>
          {nestedCommentsOpen ? (
            <>
              <ExpandLessIcon onClick={handleToggle} />
            </>
          ) : (
            <>
              <ExpandMoreIcon onClick={handleToggle} />
            </>
          )}
        </>
      )}
      <Collapse in={nestedCommentsOpen} timeout="auto" unmountOnExit>
        <List component="ul" disablePadding>
          {comment.kids &&
            comment.kids.map((childComment) => (
              <ListItem key={childComment.id}>
                <Comments comment={childComment} />
              </ListItem>
            ))}
        </List>
      </Collapse>
    </List>
  );
};

export default Comments;

Comments.propTypes = {
  comment: PropTypes.shape({
    text: PropTypes.string.isRequired,
    kids: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        parent: PropTypes.number.isRequired,
        kids: PropTypes.array,
      })
    ),
  }).isRequired,
};
