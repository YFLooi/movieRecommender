# AMovie Recommender
Suggest movies by calculating a match score based on the weight of user-selected criteria. Criteria include Metacritic score, IMDB rating, and importance of director, lead star, and supporting stars. Results are displayed in sortable table. 

![site function gif](amovierecommender.gif)

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites
(Version numbers were at time of deployment in 2018)
  *For runtime environment:
  *nodejs: v8.10.0
  *npm v5.6.0

  Dependencies:
  body-parser: 1.18.3
  express:  4.16.3
  jquery: 3.3.1
  sqlite3: 4.0.2

### Installing
	1. Clone this repo at https://github.com/YFLooi/movieRecommender.git
	2. Install all dependencies using 'npm install'
	3. Start this project using 'npm start'. The message 'Server stated at http://localhost:3000/' should appear in the console
	4. Open a browser, navigate to http://localhost:3000/

## Deployment
SQLite has limited web hosting options. Microsoft Azure is the most accessible of them.
Follow this guide by sanathjs: https://www.codeproject.com/Articles/1133660/Deploy-Node-js-in-Microsoft-Azure

## Authors
Looi Yih Foo (https://github.com/YFLooi/)

