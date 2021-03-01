import axios from "axios";

const url = "http://localhost:3001/blogs";

const getAllBlogs = async (pageNumber) => {
  const blogsData = await axios.get(`${url}/page/${pageNumber}`);
  return blogsData.data;
};

const saveBlog = async ({ title, body, tags, coverImageUrl }) => {
  const savedBlog = await axios.post(url, { title, body, tags, coverImageUrl });
  return savedBlog.data;
};

const updateBlog = async (id, { title, body, tags, coverImageUrl }) => {
  const updatedBlog = await axios.put(`${url}/${id}`, {
    title,
    body,
    tags,
    coverImageUrl,
  });
  return updatedBlog.data;
};

const deleteBlog = async (id) => {
  try {
    const deleteBlog = await axios.delete(`${url}/${id}`);
    return deleteBlog;
  } catch (err) {
    console.log('error');
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

const getSearchBlogs = async (title, pageNumber) => {
  try {
    const blogs = await axios.get(`${url}/search/${pageNumber}?q=${title}`);
    return blogs.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getBlogsByTags = async (tag,pageNumber) => {
  try {
    const blogs = await axios.get(`${url}/tag/${tag}/${pageNumber}`);
    return blogs.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getBlogTitles = async() => {
  try{
   const blogDetails = await axios.get(`${url}/live/title`);
  return blogDetails.data;
  }catch(err){
    console.log(err);
    return null;
  }
}

export {
  saveBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  getBlogsByTags,
  getSearchBlogs,
  getBlogTitles
};
