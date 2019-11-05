# kth-courses

### Contents
- `api` Backend service using Mongodb for data storage
- `lib` utility functions for backend
- `src` React sourcecode

To get backend running, you will need a .env file to set environment variables

To run frontend with npm:
```
npm install
npm run start
```

It should show up in `localhost:3000`


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

#### PUT /api/courses/[id]/comment
Add a comment to a course with id.

The request body would have a `type`, which is a comment type for the different commentable sections. This includes: `overallComments`, `courseContents`, `examination`, `literature`, `recommendedPrerequisites`. The comment field is the comment text.
```
{
    "type": "overallComments",
    "comment": "course was good"
}
```


#### PUT /api/courses/[id]/rate
Rate a course between 0 and 10

The body just includes the rating. Note that the rating can be a string in json
{
    "rating": "9"
}
