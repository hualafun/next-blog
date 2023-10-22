type MenuItem = {
  id: string;
  label: string;
  path: string;
};

type Option = {
  label: string;
  value: string;
};

type FormControlItem = {
  id: string;
  label: string;
  placeholder: string;
  type: string;
  component: string;
  options: Option[];
};

type BlogFormData = {
  title: string;
  description: string;
  image: string;
  category: string;
};

type Post = {
  id: number;
  title: string;
  description: string;
  category: string;
  userid: string;
  userimage: string;
  comments: string[];
  image: string;
};