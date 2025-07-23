export interface TaskHeaderProps {
  task: {
    id: number;
    title: string;
    status: string;
  };
  onStatusChange: () => void;
  onEditClick: () => void;
  onDeleteClick: () => void;
}
