import axios from "axios";

const url = "http://localhost:3001/blogs";

const getAllBlogs = async () => {
  const blogs = await axios.get(url);
  return blogs.data;
};

const saveBlog = async ({ title, body, tags }) => {
  const savedBlog = await axios.post(url, { title, body, tags });
  return savedBlog.data;
};

const getBlogById = async (id) => {
  try {
    const blog = await axios.get(`${url}/${id}`);
    return blog.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getBlogsByTitle = async (title) => {
  try{
    const blogs = await axios.get(`${url}/title/${title}`);
    return blogs.data;
  }catch(err){
   console.log(err);
   return null;
  }
};

export { saveBlog, getAllBlogs, getBlogById, getBlogsByTitle };
