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
    id: "blogs",
    label: "博客",
    path: "/blogs",
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
  apiKey: "AIzaSyBlCooWO0lmd0JNEgeAfI2aCs1tA3hZNo8",
  authDomain: "blog-app-97d34.firebaseapp.com",
  projectId: "blog-app-97d34",
  storageBucket: "blog-app-97d34.appspot.com",
  messagingSenderId: "980489662763",
  appId: "1:980489662763:web:56af6495955d00bed7d56e",
  measurementId: "G-D8QK3X4RR6"
};

export const initialBlogFormData = {
 title :  '',
 description : '',
 image : '',
 category : '' 
}
