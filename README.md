# Would YouRather Project

This repo is a code-along with the second project in  __[Advanced Front-End Web Development Nanodegree Program]__ 

its learn how to use build app using React linked with Redux, as shown below snapshot of project 


![This is snapshot of porject.] 
(pic/Main-Page.PNG) "the main page."
(pic/Details_vote.PNG) "the Details Vote page."
(pic/Leader_Board.PNG) "Leaderboard page"

## Project Setup

- Clone the project 
this time, will get just file data act as data coming from backend, so the code should be running from scratch.
```
<!-- git clone https://github.com/udacity/reactnd-project-would-you-rather-starter.git -->
```
<!-- - start code -- `code .` -->
- Install the dependencies 
```
npm install
create-react-app file_name
yarn add react-redux redux react-router-dom react-redux-loading redux-thunk
```
- start the development server with 
`yarn start`
- used Pretier to get code organized.

## Usage
once you start App, the login page will appear to you, then choose one of selected user, once login successfully, will show the dashboard page with un-answered question { Would You Rather} at the same page have another tab with "Answered Questions" so you have choise to select one of them.


in above of page, there is NAV and have many coices

| Bar Name         |                              Functionality                              |
| -------------    |:-----------------------------------------------------------------------:|
| Home             |       dashboard containing the questions either answered or not         |
| New Question     |      have ability to create new Question to be added in home page       |
| Leader Board     | its like a report shown for each user how many answered Qs & created Qs |