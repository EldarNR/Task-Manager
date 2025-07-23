interface Comment {
  id: number;
  text: string;
  createdAt: string;
  author: {
    id: number;
    name: string;
    avatar: string;
  };
}

export interface CommentsSectionProps {
  comments: Comment[];
  onCommentSubmit: (formData: { commentInput: string }) => Promise<void>;
}
