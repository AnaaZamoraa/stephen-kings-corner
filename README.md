# WELCOME TO STEPHEN KING'S CORNER: Journey through Stephen King's World

## In my first backend project I wanted to practice my backend development skills and create a platform where fans of Stephen King can explore his works together.

### Check my project deployed here: https://stephen-kings-corner.fly.dev/

If you liked my project, go check my [Linkedin](https://www.linkedin.com/in/ana-zamora-narvaez/)
----

# APIs
* Cloudinary
* https://stephen-king-api.onrender.com/


# ROUTES

## Index routes:
|         Route         | HTTP Verb |     Description        |
|-----------------------|-----------|------------------------|
|`/`                    |GET        |Home page               |

## Auth routes:

|         Route         | HTTP Verb |     Description        |
|-----------------------|-----------|------------------------|
|`/signup`              |GET        |Sign up page            |
|`/signup`              |POST       |Create new user         |     
|`/login`               |GET        |Login page              |  
|`/login`               |POST       |Login user              |     
|`/logout`              |POST       |Logout user             | 
|`/userProfile`         |GET        |Profile page            | 

## User routes:

|         Route         | HTTP Verb |     Description        |
|-----------------------|-----------|------------------------|
|`/users`               |GET        |List of all users       |
|`/users/:id`           |GET        |Users profile pages     |     
|`/users/:id/delete`    |POST       |Admin delete users      |
|`/users/:id/edit`      |GET        |Edit user page          |  
|`/users/:id/edit`      |POST       |Edit user               |     

## Book routes:

|          Route           | HTTP Verb |     Description        |
|--------------------------|-----------|------------------------|
|`/books`                  |GET        |List of all books       |
|`/books/:page`            |GET        |Book's list pagination  |
|`/books/details:id`       |GET        |Book details            |
|`/books/:id/add-favorite` |POST       |Add book to favorites   |
|`/books/:id/quit-favorite`|POST       |Quit book from favorites|

## Villain routes:

|           Route             | HTTP Verb |     Description        |
|-----------------------------|-----------|------------------------|
|`/villains`                  |GET        |List of all villains    |
|`/villains/:page`            |GET        |Villains list pagination|
|`/villains/details:id`       |GET        |Villain details         |
|`/villains/:id/add-favorite` |POST       |Add favorite villains   |
|`/villains/:id/quit-favorite`|POST       |Quit favorite villains  |

## Short routes:

|            Route          | HTTP Verb |     Description        |
|---------------------------|-----------|------------------------|
|`/shorts`                  |GET        |List of all shorts      |
|`/shorts/:page`            |GET        |Shorts list pagination  |
|`/shorts/details:id`       |GET        |Short details           |
|`/shorts/:id/add-favorite` |POST       |Add favorite shorts     |
|`/shorts/:id/quit-favorite`|POST       |Quit favorite shorts    |