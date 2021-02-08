import axios from "axios";

const url = "http://localhost:3001/blogs";

const getAllBlogs = async () => {
  const blogs = await axios.get(url);
  return blogs.data;
};

const saveBlog = async (accessToken, { title, body, tags, coverImageUrl }) => {
  const headers = {'Authorization': `Bearer ${accessToken}`}
  const savedBlog = await axios.post(url, { title, body, tags, coverImageUrl }, {headers});
  return savedBlog.data;
};

const updateBlog = async (accessToken, id, { title, body, tags, coverImageUrl }) => {
  const headers = {'Authorization': `Bearer ${accessToken}`}
  const updatedBlog = await axios.put(`${url}/${id}`, {
    title,
    body,
    tags,
    coverImageUrl,
  }, { headers });
  return updatedBlog.data;
};

const deleteBlog = async (id) => {
  try {
    const deleteBlog = await axios.delete(`${url}/${id}`);
    return deleteBlog;
  } catch (err) {
    console.log(err);
  }
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

const getSearchBlogs = async (title) => {
  try {
    const blogs = await axios.get(`${url}/search?title=${title}`);
    return blogs.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getBlogsByTags = async (tag) => {
  try {
    const blogs = await axios.get(`${url}/tag/${tag}`);
    return blogs.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export {
  saveBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  getBlogsByTags,
  getSearchBlogs,
};
