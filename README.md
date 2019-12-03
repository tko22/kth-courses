# kth-courses
## Mid-project review
**App link**: https://kth-courses.tko.now.sh  
**Backend**: https://kth-courses-backend.tko.now.sh  
**App link to course with comments and rating**: https://kth-courses.tko.now.sh/course/MJ2685  

### Description 
“IMDB for courses”. This app enables students to rate and comment on entire courses as well as specific course content to facilitate the choice of elective courses.

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


### Some Design Choices
Because courses may get added and deleted from the KTH API, our backend api that stores data on each course must reflect the courses in the KTH API. A common way to do it is have a background cron job updating the diff between the KTH API and our own api. This would be overkill for this project, given the deployment options we have. Thus, we have decided to add all the current courses manually (via code) to our database and we check if the course exists before we add comments/ratings - if it doesn't exist, we would create it. An additional request adds minimal latency and thus doesn't have as much impact on user experience. 

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


#### POST /api/courses/[id]/ratesection
Add a rating to a section of a course with id.

The request body would have a `type`, which is a rating type for the different rateable sections, except for the overall course rating, which is done by the .../rate endpoint. This includes: `literatureRating`, `courseRating`, `examinationRating`, `recommendedPrerequisitesRating`. The rating field is the rating number. The Rating must be a number.
```
{
    "type": "literatureRating",
    "rating": 4
}
```