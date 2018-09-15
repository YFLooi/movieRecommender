$(document).ready(function() { //This function is a must to start jQuery
    $('#generateButton').click(() => {
        console.log('generateButton clicked!');

        console.log('imdbRating rank selected is: '+imdbRank);
        console.log('metascore rank selected is: '+metascoreRank);
        console.log('director rank selected is: '+directorRank);
        console.log('lead rank selected is: '+leadRank);
        console.log('support rank selected is: '+supportRank);

        console.log('Calculating weights for each criteria: ');            
        const netScore = metascoreRank + imdbRank + directorRank + leadRank + supportRank;
        const imdbWeight = imdbRank/netScore;
        console.log('imdbWeight is: '+imdbWeight);
        const metascoreWeight = metascoreRank/netScore;
        console.log('metascoreWeight is: '+metascoreWeight);
        const directorWeight = directorRank/netScore;
        console.log('directorWeight is: '+directorWeight);
        const leadWeight = leadRank/netScore;
        console.log('leadWeight is: '+leadWeight);
        const supportWeight = supportRank/netScore;
        console.log('supportWeight is: '+supportWeight);

        //Obtains selected genre from drop down box
        const e = document.getElementById("genre");
        const genre = e.options[e.selectedIndex].value;
        console.log('Genre selected: '+genre);
       

       $.ajax({
            //If genre =action, then matches to "app.get('/action')" in server.js. genre=horror, match to "app.get('/horror')", and so on
            url: genre, 
            type: 'GET', 
            dataType: 'json', //Translates the contents of the send allTitles into numbered rows
            success:(data) => {
                console.log('ajax success' , data); //works if ajax works
                const dataCount = data.allPosters.length;
                console.log('Number of movie entries: '+dataCount)
                
                console.log('Number of table rows to generate, excluding headers: '+dataCount)
                const headerTitle = ['','Details','%Match score','Audience rating','IMDB rating','Metacritic score'];

               
                //Calculate score[] array
                //Each parameter for calculating score[] needs to be converted to fit a 1 to 5 scale
                const imdbRating = data.allImdbrating
                const weightedImdb = [];
                for(let i=0; i<dataCount; i++){
                    //Do not assign the new, calculated array to the original array! It will overwrite the original!
                    //Eg imdbRating[i]=(imdbRating[i]/2)*imdbWeight will change data.allImdbrating = imdbRating 
                    //Assign to a new, empty array instead, weightedImdb in this case
                    weightedImdb[i]=(imdbRating[i]/2)*imdbWeight; 
                }
                
                const metascore = data.allMetascore;
                const weightedMetascore = []
                for(let i=0; i<dataCount; i++){
                    weightedMetascore[i]=(metascore[i]/20)*metascoreWeight;
                }

                const director = data.allDirectorrating;
                const weightedDirectorrating = []
                for(let i=0; i<dataCount; i++){
                    weightedDirectorrating[i]=director[i]*directorWeight;
                }
                
                const lead = data.allLeadstarrating;
                const weightedLeadrating = []
                for(let i=0; i<dataCount; i++){
                    weightedLeadrating[i]=lead[i]*leadWeight;
                }

                const support = data.allSupportingstarsrating;
                const weightedSupportrating = []
                for(let i=0; i<dataCount; i++){
                    weightedSupportrating[i]= support[i]*supportWeight;
                }
    
                const score = [];
                for(let i=0; i<dataCount; i++){
                    score[i] = Math.round(((weightedImdb[i]+weightedMetascore[i]+weightedDirectorrating[i]+weightedLeadrating[i]+weightedSupportrating[i])*100/5));
                }

                console.log('Match scores: '+score);
                
                //Clears prior generated table between the table <div>-s
                const formParentElement = $('#resultsTable');
                formParentElement.html(""); //Leave blank to avoid inserting content below the <div> tag to clear

                function tableCreate() {
                    //This function can only grab by tags. [0] asks it to grab by 1st div tag from top
                    const grabAttr = document.getElementsByTagName('table')[0]; 
                    console.log('Table creator latched to: '+grabAttr);
                    
                    const tbl = document.createElement('table');
                    tbl.style.width = '95%';
                    tbl.setAttribute('class', 'results');
                    tbl.setAttribute('id', 'results');
                    tbl.setAttribute('border', '1');
                    tbl.setAttribute('align','center');

                    const thead = document.createElement('thead');
                    const tr = document.createElement('tr');
                    for (let j = 0; j<6; j++) {
                    const th = document.createElement('th');
                    th.appendChild(document.createTextNode(headerTitle[j]))
                    tr.appendChild(th);
                    thead.appendChild(tr);
                    }
                    tbl.appendChild(thead)

                    //i=rows, j=columns
                    const tbdy = document.createElement('tbody');
                    for (let i = 0; i<dataCount; i++) {
                        const tr = document.createElement('tr');
                        for (let j = 0; j<6; j++) {           
                            //Poster
                            if (i>=0 && j==0){ //Insert data after row 1 (headers)
                            const td = document.createElement('td');
                            //Adds <img/> in between <td></td>
                            let img = document.createElement('img');
                            //'i>0' in the IF condition means the 1st array eleement selected is '1'. We don't want that, so i-1 to start from element zero
                            img.setAttribute('src',data.allPosters[i]) 
                            img.setAttribute('alt',data.allTitles[i])
                            td.appendChild(img)
                            tr.appendChild(td)
                            //Unsortable content
                            } else if (i>=0 && j==1){ 
                            const td = document.createElement('td');
                            td.appendChild(document.createTextNode(data.allTitles[i]))
                            td.appendChild(document.createElement('br'))
                            td.appendChild(document.createTextNode(data.allYear[i]))
                            td.appendChild(document.createTextNode(' | '+data.allDuration[i]+' minutes'))
                            td.appendChild(document.createTextNode(' | '+data.allGenre[i]))
                            td.appendChild(document.createElement('br'))

                            td.appendChild(document.createTextNode('Director(s): '+data.allDirectors[i]))
                            td.appendChild(document.createElement('br'))
                            td.appendChild(document.createTextNode(' '+'Starring: '+data.allLeadstar[i]+','+data.allSupportingstars[i-1]))
                            td.appendChild(document.createElement('br'))

                            td.appendChild(document.createTextNode(data.allDescription[i]))
                            tr.appendChild(td)   
                            //User-sortable content
                            } else if (i>=0 && j==2){ 
                            const td = document.createElement('td');
                            td.appendChild(document.createTextNode(score[i]))
                            tr.appendChild(td)
                            } else if (i>=0 && j==3){ 
                            const td = document.createElement('td');
                            td.appendChild(document.createTextNode(data.allRating[i]))
                            tr.appendChild(td)
                            } else if (i>=0 && j==4){ 
                            const td = document.createElement('td');
                            td.appendChild(document.createTextNode(data.allImdbrating[i]))
                            tr.appendChild(td)
                            } else if (i>=0 && j==5){ 
                            const td = document.createElement('td');
                            td.appendChild(document.createTextNode(data.allMetascore[i]))
                            tr.appendChild(td)
                            }
                        }
                        tbdy.appendChild(tr);
                    }
                    tbl.appendChild(tbdy);
                    grabAttr.appendChild(tbl)
                    
                }

                tableCreate();  

                //Gets the jsSorter script to work. #results is the <table> id
                //Can only grab by id. Not class.
                $("#results").tablesorter({
                    sortList: [[2,1]], //Sort 3rd column in descending order. Replace '1' with '0' for ascending
                    headers: {0:{sorter:false}} //Makes 1st column unsortable by click
                });
                  
            }
        });


    });
});
