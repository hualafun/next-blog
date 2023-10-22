export const menuItems: MenuItem[] = [
  {
    id: "home",
    label: "首页",
    path: "/",
  },
  {
    id: "category",
    label: "分类",
    path: "/category/application",
  },
  {
    id: "posts",
    label: "博客",
    path: "/posts",
  },
  {
    id: "search",
    label: "检索",
    path: "/search",
  },
];

export const categories: Option[] = [
  {
    value: "application",
    label: "应用",
  },
  {
    value: "data",
    label: "数据",
  },
  {
    value: "software",
    label: "软件",
  },
  {
    value: "tech",
    label: "科技",
  },
  {
    value: "science",
    label: "科学",
  },
];

export const formControls: FormControlItem[] = [
  {
    id: "title",
    label: "标题",
    placeholder: "输入博客标题",
    type: "text",
    component: "input",
    options: [],
  },
  {
    id: "description",
    label: "描述",
    placeholder: "输入博客描述",
    type: "text",
    component: "textarea",
    options: [],
  },
  {
    id: "category",
    label: "分类",
    placeholder: "请选择一个分类",
    type: "",
    component: "select",
    options: categories,
  },
];

export const firebaseConfig = {
  apiKey: "AIzaSyDug0nzWA8pYbUcclhGfaDCFYTOsies1bY",
  authDomain: "huala-blog.firebaseapp.com",
  projectId: "huala-blog",
  storageBucket: "huala-blog.appspot.com",
  messagingSenderId: "328703251350",
  appId: "1:328703251350:web:4858ce7fee87ecf450c3b7",
  measurementId: "G-0VZ5GGZNVJ"
};

export const initialBlogFormData = {
 title :  '',
 description : '',
 image : '',
 category : '' 
}
