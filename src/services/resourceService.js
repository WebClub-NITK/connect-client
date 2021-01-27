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
    return branches.data.branches;
};

const getBranch = async (branchId) => {
    const branch = await axios.get(`${url}/branch/${branchId}`);
    console.log(branch);
    return branch.data.branch;
}

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

const getAllCourses = async ()=>{
    const courses = await axios.get(`${url}/${courseUrl}`);
    console.log(courses);
    return  courses.data.courses;
};

const getCourse = async (courseId) => {
    const course = await axios.get(`${url}/course/${courseId}`)
    console.log(course);
    return course.data.course;
}

const getCoursesForBranch = async (branchId) => {
    const courses = await axios.get(`${url}/${courseUrl}/${branchId}`);
    console.log(courses);
    return  courses.data.courses;
}

const createNewCourse = async(code,name,branch)=>{
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
    return resources.data.resources;
};

const createNewResource = async(course, formData)=>{

    console.log(formData);

    const resourceStatus = await axios.post(`${url}/${resourceUrl}/${course}`, formData, {
        header: {
            'Content-Type': 'multipart/form-data'
        }
    })
    console.log(resourceStatus);
    if(resourceStatus.statusCode == 422)
        {
            return  resourceStatus.data.error;
        }
    else
    {
        return  resourceStatus.data.message;
    } 
};


export{
    getAllBranches,
    getBranch,
    createNewBranch,
    getAllCourses,
    getCourse,
    getCoursesForBranch,
    createNewCourse,
    getAllResources,
    getResourcesForCourse,
    createNewResource,
}