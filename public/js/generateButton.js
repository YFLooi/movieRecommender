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

        //Request URL builder
        const eGenre = document.getElementById("genre");
        const genre = eGenre.options[eGenre.selectedIndex].value;
        console.log('Genre selected: '+genre);
        const eSubgenre = document.getElementById("subgenre");
        const subgenre = eSubgenre.options[eSubgenre.selectedIndex].value;
        console.log('Subgenre selected: '+subgenre);
        const eexcludeUnrated = document.getElementById("excludeUnrated");
        const excludeUnrated = eexcludeUnrated.options[eexcludeUnrated.selectedIndex].value;
        console.log('Exclude unrated movies? '+excludeUnrated);

        //Obtains selected genre from drop down box, then inserts into requestURL for ajax GET request later
        function urlGenerator(genreIn,subgenreIn,excludeUnratedIn){
            if(subgenreIn==='None'){ //=== needed to match condition with strings
                return '/genre/'+genreIn+'/excludeUnrated/'+excludeUnratedIn;                
            }else{
                return '/genre/'+genre+'/subgenre/'+subgenreIn+'/excludeUnrated/'+excludeUnrated;
            }
        };
        const requestURL = urlGenerator(genre,subgenre,excludeUnrated);
        console.log('Making ajax request to:',requestURL);    

        //Sets sort criteria for results table
        const eSort = document.getElementById("sortResults");
        const sortResults = eSort.options[eSort.selectedIndex].value;
        console.log('Result sort criteria: '+sortResults);
        //Sets sort order for results table
        const eSortOrder = document.getElementById("sortOrder");
        const sortOrder = eSortOrder.options[eSortOrder.selectedIndex].value;
        console.log('Result sort order: '+sortOrder);

       $.ajax({
            //If genre =action, then matches to "app.get('/action')" in server.js. genre=horror, match to "app.get('/horror')", and so on
            url: requestURL, //DO NOT build the GET URL here! Build it before ajax
            type: 'GET', 
            dataType: 'json', //Translates the contents of the send allTitles into numbered rows
            success:(data) => {
                console.log('ajax success' , data); //works if ajax works
                const dataCount = data.allPosters.length;
                console.log('Number of movie entries: '+dataCount)
                
                console.log('Number of table rows to generate, excluding headers: '+dataCount)
                const headerTitle = ['Title and details','Year','%Match score','Audience rating','IMDB rating','Metacritic score'];

               
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
                
                //Clears prior generated table between the <table> tags
                const formParentElement = $('#resultsTable');
                formParentElement.html(""); //Leave blank to avoid inserting content below the target <table> tag to clear

                    function tableCreate() {
                        //This function can only grab by tags. [0] asks it to grab by 1st <table> tag from top
                        const grabAttr = document.getElementsByTagName('table')[0]; 
                        console.log('Table creator latched to: '+grabAttr);

                        const h2 = document.createElement('h2');
                        h2.appendChild(document.createTextNode('Your recommendations'));
                        grabAttr.appendChild(h2);
                        if(dataCount!=0){
                            const h3 = document.createElement('h3');
                            h3.appendChild(document.createTextNode('Click headers to sort. Hold (Shift) and click to sort multiple columns'));
                            grabAttr.appendChild(h3);
                        
                            function pagerCreate(){
                                const pager = document.createElement('div');
                                pager.setAttribute('class', 'pager');
                                pager.setAttribute('align', 'middle');
            
                                const form = document.createElement('form');
                                const imgFirst = document.createElement('img');
                                imgFirst.setAttribute('src', './tablesorter/icons/first.png');
                                imgFirst.setAttribute('class', 'first');
                                form.appendChild(imgFirst);
                                const imgPrevious = document.createElement('img');
                                imgPrevious.setAttribute('src', './tablesorter/icons/previous.png');
                                imgPrevious.setAttribute('class', 'prev');
                                form.appendChild(imgPrevious);
            
                                const span = document.createElement('span');
                                const input = document.createElement('input');
                                input.setAttribute('type', 'text');
                                input.setAttribute('class', 'pagedisplay');
                                input.setAttribute('style', 'max-width:25em');
                                span.appendChild(input);
                                form.appendChild(span);
            
                                const imgNext = document.createElement('img');
                                imgNext.setAttribute('src', './tablesorter/icons/next.png');
                                imgNext.setAttribute('class', 'next');
                                form.appendChild(imgNext);
                                const imgLast = document.createElement('img');
                                imgLast.setAttribute('src', './tablesorter/icons/last.png');
                                imgLast.setAttribute('class', 'last');
                                form.appendChild(imgLast);
            
                                const text = document.createElement('a');
                                text.appendChild(document.createTextNode(' Rows per page: '));
                                form.appendChild(text);

                                const pagesizeSelector = document.createElement('select');
                                pagesizeSelector.setAttribute('class', 'pagesize');
                                const option1 = document.createElement('option');
                                option1.setAttribute('selected', 'selected');
                                option1.setAttribute('value', '10'); //To tablesorter.js, value=10 means show 10 rows
                                pagesizeSelector.appendChild(option1);
                                option1.appendChild(document.createTextNode('10'));
                                const option2 = document.createElement('option');
                                option2.setAttribute('value', '30'); //To tablesorter.js, value=10 means show 10 rows
                                option2.appendChild(document.createTextNode('20'));
                                pagesizeSelector.appendChild(option2);
                                const option3 = document.createElement('option');
                                option3.setAttribute('value', '50'); //To tablesorter.js, value=10 means show 10 rows
                                option3.appendChild(document.createTextNode('30'));
                                pagesizeSelector.appendChild(option3);
                                const option4 = document.createElement('option');
                                option4.setAttribute('value', '100'); //To tablesorter.js, value=10 means show 10 rows
                                option4.appendChild(document.createTextNode('100'));
                                pagesizeSelector.appendChild(option4);
                                form.appendChild(pagesizeSelector);
                                                        
                                pager.appendChild(form);
                                grabAttr.appendChild(pager);
                            }

                            pagerCreate(); //Generates top pager
                            
                            const tbl = document.createElement('table');
                            tbl.setAttribute('class', 'results');
                            tbl.setAttribute('id', 'results');
                            tbl.setAttribute('border', '1'); //Gives borders of 1px wide
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
                                    //Poster and movie details
                                    if (i>=0 && j==0){ 
                                    const td = document.createElement('td');
                                    //Adds <img/> in between <td></td>
                                    const img = document.createElement('img');
                                    //'i>0' in the IF condition means the 1st array eleement selected is '1'. We don't want that, so i-1 to start from element zero
                                    img.setAttribute('src',data.allPosters[i]) 
                                    img.setAttribute('alt',data.allTitles[i])
                                    img.setAttribute('align','left')
                                    td.appendChild(img) //Places the <img> tag between <td> tag
                                   
                                    const titleDiv = document.createElement('div')
                                    titleDiv.appendChild(document.createTextNode(data.allTitles[i]))
                                    td.appendChild(titleDiv)

                                    const durationGenreDiv = document.createElement('div')
                                    durationGenreDiv.appendChild(document.createTextNode(data.allDuration[i]+' minutes | '+data.allGenre[i]))
                                    td.appendChild(durationGenreDiv)

                                    const directorsDiv = document.createElement('div')
                                    directorsDiv.appendChild(document.createTextNode('Director(s): '+data.allDirectors[i]))
                                    td.appendChild(directorsDiv)

                                    const starringDiv = document.createElement('div')
                                    starringDiv.appendChild(document.createTextNode('Starring: '+data.allLeadstar[i]+','+data.allSupportingstars[i]))
                                    td.appendChild(starringDiv)
                                  
                                    td.appendChild(document.createElement('br'))
                                    const descriptionDiv = document.createElement('div')
                                    descriptionDiv.setAttribute('align','justify')
                                    descriptionDiv.appendChild(document.createTextNode(data.allDescription[i]))
                                    td.appendChild(descriptionDiv)

                                    tr.appendChild(td)   
                                    //User-sortable content
                                    } else if (i>=0 && j==1){ 
                                    const td = document.createElement('td');
                                    td.appendChild(document.createTextNode(data.allYear[i]))
                                    tr.appendChild(td)
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
                            grabAttr.appendChild(tbl);

                            pagerCreate(); //Generates bottom pager
                        }else{
                            const h3 = document.createElement('h3');
                            h3.appendChild(document.createTextNode('No movies matched the selected genre(s). Try a different combination'));
                            grabAttr.appendChild(h3);
                        }
                    };

                    tableCreate();  

                    //Gets the tablesroter.js scripts to work. #results is the <table> id
                    $("#results")
                    .tablesorter({
                        //Separate each parameter with a comma
                        //Fixes column width. If false, auto-fit to content
                        widthFixed: false, 
                        widgets: ['zebra'],
                        sortList: [[sortResults,sortOrder]], //Sort 3rd column in descending order. Replace '1' with '0' for ascending
                        headers: {0:{sorter:true}}, //Makes 1st column unsortable by click
                        
                        //Show an indeterminate timer icon in the header when the table is sorted or filtered.
                        //Helpful when large tables are being loaded
                        showProcessing: true
                    })
                    .tablesorterPager({
                        container: $(".pager")
                    });
            }
        });


    });
});
