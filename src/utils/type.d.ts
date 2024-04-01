declare interface ITask {
  id: string;
  taskName: string;
  priority: 'High' | 'Medium';
  status: 'Todo' | 'Done';
  createdAt?: number;
  description?: string;
  updatedAt?: number;
}
declare type TExam =
  | 'R'
  | 'I'
  | 'A'
  | 'S'
  | 'E'
  | 'C'
  | 'IQ'
  | 'EQ'
  | 'Holland'
  | 'SchoolScore';
declare interface IOption {
  image?: string;
  content: string;
  isResult?: boolean;
}
declare interface IQuestion {
  questionTitle: string;
  image?: string;
  options?: IOption[];
}
declare interface IResult {
  score?: number | string;
  content: string;
  image?: string;
}
declare interface IExam {
  type: TExam;
  questions: IQuestion[];
  results?: IResult[];
}
