export type PaginationOptions = {
  skip: number;
  take: number;
};

export type LoginInputType = {
  username: string;
  password: string;
};

export type UserInputType = {
  id_user?: number;
  username: string;
  password?: string;
  full_name: string;
  id_user_role?: number;
};

export type UserSearchType = {
  id_user?: any;
  id_user_role?: number;
  OR?: {
    username?: any;
    full_name?: any;
  }[];
};

export type CourseInputType = {
  id_course?: number;
  name: string;
  description: string;
};

export type CourseSearchType = {
  id_course?: any;
  OR?: {
    name?: any;
  }[];
};

export type ExamInputType = {
  id_exam?: number;
  id_course: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  duration: number;
};
