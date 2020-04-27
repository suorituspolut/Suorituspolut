# Suorituspolut

## Project premise

Suorituspolut is a web application intended for providing visualization of course data in University of Helsinki.  
Currently there is data only of the Bachelor studies in computer science.  
Essential information to provide includes the order, scheduling and popularity of completed courses in forms of various diagrams.  

### Course graphs

#### Sankey

The sankey diagrams display study paths between courses.  
The first version allows selecting the starting course while the second one shows several courses from the beginning of the studies.

#### Histogram

The histograms show the distribution of the timing when courses are completed.  
The first variant displays a single histogram of the selected course while the second one lists histograms with several options.

#### Bubble

The bubble chart displays the most popular courses in each period.  
The amount of courses shown can be changed, and the display of each period can be toggled on and off.

### Course recommendation system

#### Road to success

The road to success contains a pie chart that displays the grade distribution of the selected course.

## Used technologies

The frontend is made using React, the backend uses Node.js, and the application is deployed with Docker.  
React library Highcharts is used to draw diagrams to help with visualization.

## Installing the application

**In order to use the project, you'll need a dataset that contains information of studies.**

### Installation steps

- Clone the project repository: 
`git clone https://github.com/suorituspolut/Suorituspolut`
- Navigate to the cloned repository, and install dependencies with `npm install`  

Application can be launched with `npm start`  
Linter can be run with `npm run lint`

## Documentation
[![CircleCI](https://circleci.com/gh/suorituspolut/Suorituspolut.svg?style=svg)](https://circleci.com/gh/suorituspolut/Suorituspolut)
[![codecov](https://codecov.io/gh/suorituspolut/Suorituspolut/branch/master/graph/badge.svg)](https://codecov.io/gh/suorituspolut/Suorituspolut)

[Product backlog](https://docs.google.com/spreadsheets/d/1LwSKeKnjF9BILT-SWq7dcVWEsRqqfTetZ7wfIkhxkG0/edit#gid=0)

[Sprint backlog](https://docs.google.com/spreadsheets/d/10I3woz3KTBmCiSt_vDrgeIdjG_VAujJe4kMJsc5h_64/edit#gid=1103601563)

[29.1. - Visualization ideas](https://drive.google.com/file/d/1wv-ooICCFOkA7cIQ_uEerSDFzVKA0Bdz/view?usp=sharing)

