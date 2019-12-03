const BASE_URL_KTH = "https://www.kth.se/api/kopps/v2";
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const headers = { method: 'GET', mode: 'cors', headers: { 'Access-Control-Allow-Origin': '*' } };
const BASE_URL_DB = "https://kth-courses-backend.tko.now.sh/api/courses"

class CourseModel {
    constructor() {
    this.state = {ratingTypes: [[5, "Awesome - 5 stars", "full"], [4.5, "Really good - 4.5 stars", "half"], [4, "Good - 4 stars", "full"], [3.5, "3.5 stars", "half"], [3, "3 stars", "full"], [2.5, "Average - 2.5 stars", "half"], [2, "2 stars", "full"], [1.5, "1.5 stars", "half"], [1, "Meh - 1 stars", "full"], [0.5, "Bad - 0.5 star", "half"]]}
    }
    getRatingTypes() {
        return this.state.ratingTypes;
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

    async getDepartments(schoolCode) {
        return fetch(`${proxyurl}${BASE_URL_KTH}/departments?l=en`, headers)
            .then(this.processResponse)
            .then(response => { return response.filter(dept => { return dept.name.split("/")[0] === schoolCode }) })
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
            .then(response => { return response.filter(course => { return (course.department.split(" ")[0] === deptCode && course.state !== "CANCELLED") }) })
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
    getAllCoursesDB() {
        return fetch(`${BASE_URL_DB}`)
            .then(this.processResponse)
            .catch(error => {
                console.error("Error:", error);
            });
    }
    getCourseDBDetails(courseCode) {
        return fetch(`${BASE_URL_DB}/${courseCode}`, headers)
            .then(this.processResponse)
            .catch(error => {
                console.error("Error:", error)
            })
    }
    async comment(courseCode, commentType, text, courseName) {
        await this.dbCreateCourseIfDNE(courseCode, courseName)
        return fetch(`${BASE_URL_DB}/${courseCode}/comment`, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            method: "POST",
            mode: "cors",
            body: JSON.stringify({ type: commentType, comment: text })
        }) //${courseCode}`)
            .then(this.processResponse)
            .catch(error => {
                console.error("Error:", error);
            });
    }
    async rate(courseCode, userRating, courseName) {
        await this.dbCreateCourseIfDNE(courseCode, courseName)
        return fetch(`${BASE_URL_DB}/${courseCode}/rate`, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            method: "POST",
            mode: "cors",
            body: JSON.stringify({ rating: userRating })
        })
            .then(this.processResponse)
            .catch(error => {
                console.error("Error:", error);
            });
    }
    createDBCourse(courseCode, courseName) {
        fetch(`${BASE_URL_DB}`, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            method: "POST",
            mode: "cors",
            body: JSON.stringify({ name: courseName, courseID: courseCode })
        })
    }
    async dbCreateCourseIfDNE(courseCode, courseName) {
        const courseResult = await this.getCourseDBDetails(courseCode)
        if (courseResult === undefined || !courseResult) {
            await this.createDBCourse(courseCode, courseName)
            return true
        }
        return true
    }

    async rateSection(courseCode, ratingType, userRating, courseName) {
        // ratingType can either be
        // `literatureRating`, `courseRating`, `examinationRating`, `recommendedPrerequisitesRating`
        // userRating must be a number
        await this.dbCreateCourseIfDNE(courseCode, courseName)
        return fetch(`${BASE_URL_DB}/${courseCode}/ratesection`, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            method: "POST",
            mode: "cors",
            body: JSON.stringify({ rating: userRating, type: ratingType })
        })
            .then(this.processResponse)
            .catch(error => {
                console.error("Error:", error);
            });
    }

    getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }
}
const modelInstance = new CourseModel();
export default modelInstance;