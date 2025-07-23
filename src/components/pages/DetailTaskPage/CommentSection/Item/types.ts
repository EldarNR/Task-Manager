export interface CommentItemProps {
  comment: {
    id: number;
    text: string;
    createdAt: string;
    author: {
      id: number;
      name: string;
      avatar: string;
    };
  };
}
