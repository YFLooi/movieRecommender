//Imports the express library we installed using npm install with package.json in Node
const express = require('express');
const app = express(); //Assigns express like a function to a variable

const sqlite3=require('sqlite3'); //Import sqlite 3 library
const db = new sqlite3.Database('movies.sqlite'); //Creates a new connection to movies.db. If does not exist, it will create moviesTest.db

app.use(express.static(__dirname+'/public'));

//GET-s the default.html as the main page to which the app returns to
app.get('/', function(req,res){
	console.log('default html loading');
	res.render('./public/index.html');
});

//This route GET a list of all user names stored in the db
app.get('/action',(req, res, next) => {
	/* Runs a query in SQL. Once it finishes, it runs a callback function that stores data 
	collected from column 'title' in the parameter 'rows' */
	//The anon function has 2 parameters. err is the 1st param by convention.
	/*What this does? Run the SELECT SQL query, then run the callback function to find err on 
	each rows.*/
	db.all('SELECT * FROM action',(err,rows) => {
		//Prints an array of all 3 rows of 'name'
		//console.log(rows); 

		//Or a simpler display option to an array: Use a map function
		/* .map iterates thru rows array. Each element assigned to var 'e'. 
		The arrow statement for const allTitles means 'Takes in e, and returns e mapped to each element under SQLite's 'title' column 
		*/
		//This ensures only the title is returned! Otherwise, it's 0: Object { title: "The Avengers" } and so forth.
		const allPosters = rows.map(e => e.poster);
		const allTitles = rows.map(e => e.title);
		const allYear = rows.map(e => e.year);
		const allRating = rows.map(e => e.rating);
		const allDuration = rows.map(e => e.duration);
		const allGenre = rows.map(e => e.genre);
		const allImdbrating = rows.map(e => e.imdbRating);
		const allMetascore = rows.map(e => e.metacritic);
		const allDescription = rows.map(e => e.description);
		const allDirectors = rows.map(e => e.directors);
		const allDirectorrating = rows.map(e => e.directorRating);
		const allLeadstar = rows.map(e => e.leadstar);
		const allLeadstarrating = rows.map(e => e.leadstarRating);
		const allSupportingstars = rows.map(e => e.supportingstars);
		const allSupportingstarsrating = rows.map(e => e.supportingstarsRating);

		//This will return a JSON string for each constant. In this exact order.
		res.send({allPosters, allTitles, allYear, allRating, allDuration, allGenre, allImdbrating, allMetascore, allDescription, allDirectors, allDirectorrating, allLeadstar,allLeadstarrating,allSupportingstars,allSupportingstarsrating});
	});
});

//This route GET a list of all user names stored in the db
app.get('/comedy',(req, res, next) => {
	db.all('SELECT * FROM comedy',(err,rows) => {
		//Or a simpler display option to an array: Use a map function
		/* .map iterates thru rows array. Each element assigned to var 'e'. 
		The arrow statement for const allTitles means 'Takes in e, and returns e mapped to each element under SQLite's 'title' column 
		*/
		//This ensures only the title is returned! Otherwise, it's 0: Object { title: "The Avengers" } and so forth.
		const allPosters = rows.map(e => e.poster);
		const allTitles = rows.map(e => e.title);
		const allYear = rows.map(e => e.year);
		const allRating = rows.map(e => e.rating);
		const allDuration = rows.map(e => e.duration);
		const allGenre = rows.map(e => e.genre);
		const allImdbrating = rows.map(e => e.imdbRating);
		const allMetascore = rows.map(e => e.metacritic);
		const allDescription = rows.map(e => e.description);
		const allDirectors = rows.map(e => e.directors);
		const allDirectorrating = rows.map(e => e.directorRating);
		const allLeadstar = rows.map(e => e.leadstar);
		const allLeadstarrating = rows.map(e => e.leadstarRating);
		const allSupportingstars = rows.map(e => e.supportingstars);
		const allSupportingstarsrating = rows.map(e => e.supportingstarsRating);

		//This will return a JSON string for each constant. In this exact order.
		res.send({allPosters, allTitles, allYear, allRating, allDuration, allGenre, allImdbrating, allMetascore, allDescription, allDirectors, allDirectorrating, allLeadstar,allLeadstarrating,allSupportingstars,allSupportingstarsrating});
	});
});

//This route GET a list of all user names stored in the db
app.get('/horror',(req, res, next) => {
	db.all('SELECT * FROM horror',(err,rows) => {
		//Or a simpler display option to an array: Use a map function
		/* .map iterates thru rows array. Each element assigned to var 'e'. 
		The arrow statement for const allTitles means 'Takes in e, and returns e mapped to each element under SQLite's 'title' column 
		*/
		//This ensures only the title is returned! Otherwise, it's 0: Object { title: "The Avengers" } and so forth.
		const allPosters = rows.map(e => e.poster);
		const allTitles = rows.map(e => e.title);
		const allYear = rows.map(e => e.year);
		const allRating = rows.map(e => e.rating);
		const allDuration = rows.map(e => e.duration);
		const allGenre = rows.map(e => e.genre);
		const allImdbrating = rows.map(e => e.imdbRating);
		const allMetascore = rows.map(e => e.metacritic);
		const allDescription = rows.map(e => e.description);
		const allDirectors = rows.map(e => e.directors);
		const allDirectorrating = rows.map(e => e.directorRating);
		const allLeadstar = rows.map(e => e.leadstar);
		const allLeadstarrating = rows.map(e => e.leadstarRating);
		const allSupportingstars = rows.map(e => e.supportingstars);
		const allSupportingstarsrating = rows.map(e => e.supportingstarsRating);

		//This will return a JSON string for each constant. In this exact order.
		res.send({allPosters, allTitles, allYear, allRating, allDuration, allGenre, allImdbrating, allMetascore, allDescription, allDirectors, allDirectorrating, allLeadstar,allLeadstarrating,allSupportingstars,allSupportingstarsrating});
	});
});

//This route GET a list of all user names stored in the db
app.get('/scifi',(req, res, next) => {
	db.all('SELECT * FROM scifi',(err,rows) => {
		//Or a simpler display option to an array: Use a map function
		/* .map iterates thru rows array. Each element assigned to var 'e'. 
		The arrow statement for const allTitles means 'Takes in e, and returns e mapped to each element under SQLite's 'title' column 
		*/
		//This ensures only the title is returned! Otherwise, it's 0: Object { title: "The Avengers" } and so forth.
		const allPosters = rows.map(e => e.poster);
		const allTitles = rows.map(e => e.title);
		const allYear = rows.map(e => e.year);
		const allRating = rows.map(e => e.rating);
		const allDuration = rows.map(e => e.duration);
		const allGenre = rows.map(e => e.genre);
		const allImdbrating = rows.map(e => e.imdbRating);
		const allMetascore = rows.map(e => e.metacritic);
		const allDescription = rows.map(e => e.description);
		const allDirectors = rows.map(e => e.directors);
		const allDirectorrating = rows.map(e => e.directorRating);
		const allLeadstar = rows.map(e => e.leadstar);
		const allLeadstarrating = rows.map(e => e.leadstarRating);
		const allSupportingstars = rows.map(e => e.supportingstars);
		const allSupportingstarsrating = rows.map(e => e.supportingstarsRating);

		//This will return a JSON string for each constant. In this exact order.
		res.send({allPosters, allTitles, allYear, allRating, allDuration, allGenre, allImdbrating, allMetascore, allDescription, allDirectors, allDirectorrating, allLeadstar,allLeadstarrating,allSupportingstars,allSupportingstarsrating});
	});
});

//starts a server once the JS file is run in cmd 
//'3000' is convention for server port number for testing
//'localhost' is a special operator that operates my pc as a server
//Blank () = Anonymous function
app.listen(3000,() => {
	console.log('Server stated at http://localhost:3000/');
});

