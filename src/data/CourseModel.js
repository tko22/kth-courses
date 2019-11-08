const BASE_URL_KTH = "https://www.kth.se/api/kopps/v2";
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const headers = {method: 'GET', mode: 'cors', headers:{ 'Access-Control-Allow-Origin': '*'}};
const BASE_URL_DB = "https://kth-courses.tko.now.sh/api/courses";
class CourseModel {
    constructor() {
        /*this._schoolList = "";
        this._school = "";
        this._department = "";
        this.course = ""; */
    }
    processResponse(response) {
        if (response.ok) {
          return response.json();
        }
        throw response;
    }
    getSchools() {
        return fetch(`${proxyurl}${BASE_URL_KTH}/schools?l=en`, headers)
            .then(this.processResponse)
            .catch(error => {
                console.error("Error:", error);
            });
    }
    
    async getDepatments(schoolCode) {
        return fetch(`${proxyurl}${BASE_URL_KTH}/departments?l=en`, headers)
            .then(this.processResponse)
            .then(response => {return response.filter(dept=>{return dept.name.split("/")[0]===schoolCode})})
            .catch(error => {
                console.error("Error:", error);
            });
    }
    
    getCourses(deptCode) {
        return fetch(`${proxyurl}${BASE_URL_KTH}/courses/${deptCode}.json?l=en`, headers)
            .then(this.processResponse)
            .catch(error => {
                console.error("Error:", error);
            });
    }
    getCourses2(deptCode) {
        return fetch(`${proxyurl}${BASE_URL_KTH}/courses?l=en`, headers)
            .then(this.processResponse)
            .then(response => {return response.filter(course=>{return (course.department.split(" ")[0]===deptCode && course.state!=="CANCELLED")})})
            //.then(response => {return response.filter(course=>{return (course.department.split(" ")[0]===deptCode)})})
            .catch(error => {
                console.error("Error:", error);
            });
    }
    getCourseKTH(courseCode) {
        return fetch(`${proxyurl}${BASE_URL_KTH}/course/${courseCode}/detailedinformation?l=en`, headers)
            .then(this.processResponse)
            .catch(error => {
                console.error("Error:", error);
            });
    }
    search(searchString) {
        return fetch(`${proxyurl}${BASE_URL_KTH}/courses/search?text_pattern=${searchString}`, headers)
            .then(this.processResponse)
            .catch(error => {
                console.error("Error:", error);
            });
    }

    getCourseDB(courseCode) {
        return fetch(`${proxyurl}${BASE_URL_DB}`, headers)
            .then(this.processResponse)
            .then(courses=>(courses.filter(course=> course.courseID===courseCode)))
            .catch(error => {
                console.error("Error:", error);
            });
    }
    comment() {

    }
    /* setCourse(courseCode) {
        this.course = courseCode;
    } */
    /* getCookies() {

    }
    getSearchInput() {

    }
    setSearchInput() {

    } */
    /* setDepartment(deptCode) {
        this._department = deptCode;
    } */
    /*setSchools(schoolList){
        this._schoolList = schoolList;
    } */
    /* setSchool(schoolCode) {
        this._school = schoolCode;
    } */
}
const modelInstance = new CourseModel();
export default modelInstance;