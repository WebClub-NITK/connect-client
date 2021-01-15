import axios from 'axios'

const url = 'http://localhost:3001/resource_module'

const resourceUrl = 'resources';
const branchUrl = 'branches';
const courseUrl = 'courses';

const getAllResources = async ()=>{

    const resources = await axios.get(`${url}/${resourceUrl}`);
    console.log(resources);
    return resources.data;
};

const getAllBranches = async ()=>{
    const branches = await axios.get(`${url}/${branchUrl}`);
    console.log(branches);
    return branches.data;
};

const createNewBranch = async({code,name})=>{
    const branchStatus = await axios.post(`${url}/${branchUrl}`,{code,name});
    console.log(branchStatus);
    if(branchStatus.statusCode == 422)
        {
            return  branchStatus.data.error;
        }
    else
    {
        return  branchStatus.data.message;
    } 
};

const getAllCourses = async (branchId)=>{
    const courses = await axios.get(`${url}/${courseUrl}/${branchId}`);
    console.log(courses);
    return  courses.data;
};

const createNewCourse = async({code,name,branch})=>{
    const courseStatus = await axios.post(`${url}/${courseUrl}`,{code,name,branch});
    console.log(courseStatus);
    if(courseStatus.statusCode == 422)
        {
            return  courseStatus.data.error;
        }
    else
    {
        return  courseStatus.data.message;
    } 
};

const getResourcesForCourse= async (courseId)=>{
    const resources = await axios.get(`${url}/${resourceUrl}/${courseId}`);
    console.log(resources);
    return resources.data;
};


export{
    getAllResources,
    getAllBranches,
    createNewBranch,
    getAllCourses,
    createNewCourse,
    getResourcesForCourse

}