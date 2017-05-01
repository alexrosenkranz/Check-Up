API Documentation
-----------------

| HTTP method         | URL                             | Description                |
| :----------:        | --------------------            | -------------------------- |
| ** GET **           | /api/v2/all-patients            | gets all patients in system |
| ** GET **           | /api/v2/patient/username/:email | finds patient based on their email|
| ** GET **           | /api/v2/patient/username/:email | finds patient based on their email|
| ** GET **           | /api/v2/patient/id/:id          | finds patient based on their _id |
| ** POST **           | /api/v2/new-patient            | creates a new patient. Body must contain { email, first_name, last_name, password } |
| ** GET **           | /api/v2/patient/id/:id          | finds patient based on their _id |