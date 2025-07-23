// libraries
import { type FC } from 'react';
// components
import { Button } from '@blueprintjs/core';
import CommentSectionItem from 'components/pages/DetailTaskPage/CommentSection/Item';
import { Form } from 'components/shared/Form';
import { FormControl } from 'components/shared/Form/FormControl';
// types
import type { CommentsSectionProps } from 'components/pages/DetailTaskPage/CommentSection/types';

const CommentsSection: FC<CommentsSectionProps> = ({
  comments,
  onCommentSubmit,
}) => (
  <div className="comments-section">
    <h3 className="comments-section--title">Комментарии</h3>

    <div className="comments-section--form">
      <Form
        defaultValues={{ commentInput: '' }}
        onSubmit={onCommentSubmit}
      >
        <FormControl
          fieldType="textarea"
          label="Добавить комментарий"
          name="commentInput"
          placeholder="Введите комментарий к задаче"
        />
        <div className="mt-md">
          <Button
            intent="primary"
            type="submit"
          >
            Отправить
          </Button>
        </div>
      </Form>
    </div>

    {comments && comments.length > 0 ? (
      <div className="comments-section--list">
        {comments.map((comment) => (
          <CommentSectionItem
            key={comment.id}
            comment={comment}
          />
        ))}
      </div>
    ) : (
      <div className="comments-section--empty">
        Комментарии отсутствуют
      </div>
    )}
  </div>
);

export default CommentsSection;
