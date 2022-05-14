# Challenge 14
## Tech Blog MVC

- for the fourteenth challenge of my bootcamp, I am tasked with creating my first full stack application with front end handlebars integration, similar to my module learning from the past week. I will utilize previous lessons to handle my mySQL tables, seeding data, adding model relationships with sequelize syntax and more.

<br>
<br>

## User Story
---

- AS A developer who writes about tech
- I WANT a CMS-style blog site
- SO THAT I can publish articles, blog posts, and my thoughts and opinions

## Criteria to be considered complete (Apr. 2022)
---

GIVEN a CMS-style blog site
> WHEN I visit the site for the first time
- THEN I am presented with the homepage, which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard; and the option to log in
> WHEN I click on the homepage option
- THEN I am taken to the homepage
> WHEN I click on any other links in the navigation
- THEN I am prompted to either sign up or sign in
> WHEN I choose to sign up
- THEN I am prompted to create a username and password
> WHEN I click on the sign-up button
- THEN my user credentials are saved and I am logged into the site
> WHEN I revisit the site at a later time and choose to sign in
- THEN I am prompted to enter my username and password
> WHEN I am signed in to the site
- THEN I see navigation links for the homepage, the dashboard, and the option to log out
> WHEN I click on the homepage option in the navigation
- THEN I am taken to the homepage and presented with existing blog posts that include the post title and the date created
> WHEN I click on an existing blog post
- THEN I am presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment
> WHEN I enter a comment and click on the submit button while signed in
- THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created
> WHEN I click on the dashboard option in the navigation
- THEN I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post
> WHEN I click on the button to add a new blog post
- THEN I am prompted to enter both a title and contents for my blog post
> WHEN I click on the button to create a new blog post
- THEN the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post
> WHEN I click on one of my existing posts in the dashboard
- THEN I am able to delete or update my post and taken back to an updated dashboard
> WHEN I click on the logout option in the navigation
- THEN I am signed out of the site
> WHEN I am idle on the site for more than a set time
- THEN I am able to view comments but I am prompted to log in again before I can add, update, or delete comments

<br>
<br>

## Table of Contents
---
- [Installation](#installation)
- [Usage](#usage)
- [License Information](#license-information)
- [Questions](#questions)
- [Working Example of Project](#working-example-of-project)

## Installation
---
- Download repo from github, run "npm i" to install all dependencies, create a ".env" file and then add this code to the created file: 

- DB_NAME='tech_blog_db'
- DB_USER='root'
- DB_PW=''
- sess_secret=''

---
- Replace the "user and pw" fields with your respective username and password.
- Add a personalized secret to the "sess_secrets field that will assist with sessions.
- run "mysql -u root -p" to access your MySQL shell. run "source db/schema.sql;" to create the ecommerce_db database.
- run "npm start" to start server and naviagte to your http://localhost:3001/login path to access the login and enter the site.
- You will not be able to create, edit or delete posts or comments without logging in.

## Usage
---

- This application serves as a very basic full stack website that handles user authetication, user session data, login and logout functionality, post and comment functionality and editing functionality. 

## License Information
---
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
<br/>

## Questions
---
- If you have any further questions, contact me here: [GitHub](https://github.com/jared-ruiz)

## Working Example of Project
---
[Demo of Working Example - Deployed Heroku URL]()


## Weekly Reflection
---

- This week was the hardest week I have ever had. I was unable to sleep simply because I knew I had so much work to knock out before the due date. On top of a full stack project with my team, I had to completely make a different full stack project by myself. Luckily I had great references from the modules and people to bounce ideas off of so I managed to accomplish my goal. I am geninuely happy with my steady grasp of what is going on. I don't expect to memorize anything at this moment, simply because of the sheer amount of info and speed this bootcamp is putting me through, but I believe that after it is all said and done, I'll be able to take these experiences with me into a team enviornment and learn and meet the expectations desired of me. I just need to start my career and watch as my experience solidifies the foundation I cultivated here. This assignment and upcoming project marks the final stretch of my full stack web development journey. Here's to another week!

-J
