declare interface ITask {
  _id: string;
  taskName: string;
  priority: 'High' | 'Medium';
  status: boolean;
  createdAt?: number;
  description?: string;
  updatedAt?: number;
  userId: string;
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
