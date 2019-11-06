const BASE_URL_KTH = "https://www.kth.se/api/kopps/v2";
class CourseModel {
    constructor() {
        this._school = "";
        this._department = "";
        this.course = "";
    }
    getSchools() {
        return fetch(`${BASE_URL_KTH}/schools?l=en`)
            .then(this.processResponse)
            .then(json => {
                return json.results;
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }
    setSchool(schoolCode) {
        this._school = schoolCode;
    }
    getDepatments(schoolCode) {
        return fetch(`${BASE_URL_KTH}/departments?l=en`).filter(deptCode=>{return deptCode[0]===schoolCode});
    }
    setDepartment(deptCode) {
        this._department = deptCode;
    }
    getCourses(deptCode) {
        return fetch(`${BASE_URL_KTH}/courses/${deptCode}.json?l=en`);
    }
    getCourse(courseCode) {
        return fetch(`${BASE_URL_KTH}/course/${courseCode}/detailedinformation?l=en`);
    }
    setCourse(courseCode) {
        this.course = courseCode;
    }
    getCookies() {

    }
    getSearchInput() {

    }
    setSearchInput() {

    }
    getComments() {

    }
    comment() {

    }
}
const modelInstance = new CourseModel();
export default modelInstance;