export interface TaskDetailsCardProps {
  task: {
    id: number;
    title: string;
    description?: string;
    deadline?: string;
    status: string;
    assignee?: {
      id: number;
      name: string;
      avatar?: string;
    };
  };
}
