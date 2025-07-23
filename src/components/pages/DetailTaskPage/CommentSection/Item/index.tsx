// libraries
import { type FC } from 'react';
// static
import GuestAvatarImg from 'assets/images/guest.png';
// types
import type { CommentItemProps } from 'components/pages/DetailTaskPage/CommentSection/Item/types';

const CommentSectionItem: FC<CommentItemProps> = ({ comment }) => (
  <div className="comment-item">
    <div className="comment-item--header">
      {comment.author.avatar && (
      <img
        alt={`avatar-${comment.author.name}`}
        className="comment-item--avatar"
        onError={(e) => {
          e.currentTarget.src = GuestAvatarImg;
        }}
        src={comment.author.avatar}
      />
      )}
      <strong className="comment-item--author">
        {comment.author.name}
      </strong>
    </div>
    <div className="comment-item--text">
      {comment.text}
    </div>
  </div>
);

export default CommentSectionItem;
