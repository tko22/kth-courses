# kth-courses
## Mid-project review
**App link**: https://kth-courses.tko.now.sh  
**Backend**: https://kth-courses-backend.tko.now.sh  
**App link to course with comments and rating**: https://kth-courses.tko.now.sh/course/MJ2685  

### Description 
“IMDB for courses”. This app enables students to rate and comment on entire courses as well as specific course content to facilitate the choice of elective courses.

### What has been done
We are using the "KOPPS" api from KTH https://www.kth.se/api/kopps/v2 to access course, department and school information and have displayed that information within our app. We have also implemented search functionality using a search-call in the "KOPPS" api. Additionally we have implemented our own api which is used to access comments and ratings on a specific course and we have displayed that information within our app. We have also implemented commenting and rating functionality.

### What we plan to do
We plan to look into: 
- Rating comments and displaying comments according to rating.
- Rating parts of a course (examination, literature etc.).
- Using cookies to save course favourites in a profile page.
- Improving our UI, we would like feedback on how this could be done!
- If possible, speeding up fetches

### File Structure
Some of the higher level file structures are dependent on how we deploy our site - we use Zeit Now, a serverless deployment. 
- `api` Backend service using Mongodb for data storage. Zeit Now recognizes the folder /api as serverless functions. URL Path Segments are used through file paths, hence, the inner structure of api. 
    - `courses`
        - `index.js` - function for /api/courses
        - `[id]` - Zeit now specific folder that allows you to put in dynamic data under the query variable `id`
            - `index.js` for /api/courses/[id] - to get course data
            - `comment.js` function for /api/courses/[id]/comment - to comment on course
            - `rate.js` function for /api/courses/[id]/rate - to rate course
    - `index.js` - function for /api
- `lib` utility functions for the backend
    - `courses.js` - Mongoose Schema for Course. Mongoose is an ORM for MongoDB
    - `db.js` - connects to MongoDB once
    - `errorWrap.js` - Middleware to allow us to safely handle errors in async/await code without wrapping each route in try...catch blocks
- `public` folder holding static files. Folder created by create-react-app
- `src` React sourcecode
    - `components`
    - `data`
        - `CourseModel.js`
    - `pages`
    - `App.js`
    - `index.js`
    - `ModelContext.js`: React Context object for the data to be used in components

## Getting Started
To get backend running, you will need a .env file to set environment variables, one of which includes the MONGO_DB credentials

To run frontend with npm:
```
cd frontend
npm install
npm run start
```

It should show up in `localhost:3000`

To run backend
```
cd backend
now dev
```

## API
Note: All request bodies must be in json

#### GET /api/courses
Gets list of all courses


#### POST /api/courses
request body:
```
{
    "name": "Course Name",
    "courseID": "DH24859"
}
```

#### GET /api/courses/[id]
Get information about course with specific ID. the ID would usually be the id given by the KTH api
Example:
```
GET /api/courses/DD2462

response:
{
    "name": "Interaction Programming",
    "courseID": "DH2462",
    "overallComments": ["I like this class"],
    "courseContents": ["includes web programming, javascript content....","hello"],
    "examination": ["there are no exams", "exams don't exist"],
    "literature": ["books include ..."],
    "recommendedPrequisites": ["You should take x first", "I took X class first and it helped a lot"],
    "ratings": [8,4,6,9,7,7,8,8,6]
}
```

#### POST /api/courses/[id]/comment
Add a comment to a course with id.

The request body would have a `type`, which is a comment type for the different commentable sections. This includes: `overallComments`, `courseContents`, `examination`, `literature`, `recommendedPrerequisites`. The comment field is the comment text.
```
{
    "type": "overallComments",
    "comment": "course was good"
}
```


#### POST /api/courses/[id]/rate
Rate a course between 0 and 10

The body just includes the rating. Note that the rating can be a string in json
{
    "rating": "9"
}
