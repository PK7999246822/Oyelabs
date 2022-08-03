1) API registration:-
formate in postman-
{
    "name":"minu",
    "phone":"7999246866",
    "email":"priyankakhatrii1202@gmail.com",
    "password":"1234hunn",
    "subject":["maths","science","english"]
}

output - 

{
    "status": true,
    "message": "successful",
    "data": {
        "name": "minu",
        "phone": 7999246866,
        "email": "priyankakhatrii1202@gmail.com",
        "password": "1234hunn",
        "subject": [
            "maths",
            "science",
            "english"
        ],
        "_id": "62ea2ee794061da67417d3ff",
        "createdAt": "2022-08-03T08:16:39.397Z",
        "updatedAt": "2022-08-03T08:16:39.397Z",
        "__v": 0
    }
}

2)API Login:-
input - {
    "phone":"7999246866",
    "password":"1234hunn"
}
output- {
    {
    "status": true,
    "message": "You are successfully logged in",
    "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmVhMmVlNzk0MDYxZGE2NzQxN2QzZmYiLCJpYXQiOjE2NTk1MTcwNzh9.HvnIISSDhFJo33k1DS1l0bfeHi3Yx_S9MqVrWnORk8o"
}
}

3)API findSubject - 
subjects in alphabetical order
output - {
    {
    "status": true,
    "message": "sucessfull",
    "data": {
        "name": "minu",
        "subject": [
            "english",
            "maths",
            "science"
        ]
    }
}
}