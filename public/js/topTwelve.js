$(document).ready(function() { //This function is a must to start jQuery
    $(window).on("load",function(){ //"load"=When script is run
        console.log('Wrapper being loaded');
        $.ajax({
            url: '/topTwelve', 
            type: 'GET', 
            dataType: 'json', //Translates the contents of the returning data into numbered rows
            success:(data) => {
                console.log('ajax success' , data); //works if ajax works
                const dataCount = data.allPosters.length;
                console.log('Number of top 12 movie entries: '+dataCount)

                function createCards () {
                    const grabAttr = document.getElementsByTagName('section')[0];
                    console.log('Wrap creator latched to: '+grabAttr);
                    const wrap = document.createElement('section');
                    wrap.setAttribute('class', 'card');
                
                    for (let i = 0; i<dataCount; i++) {
                        //Create a new card for each of the top 12
                        const card = document.createElement('div');
                        card.setAttribute('class', 'cardContent');
                        card.setAttribute('align', 'center');
                        
                        //Insert poster img
                        const cardPoster = document.createElement('img');
                        cardPoster.setAttribute('class','cardPoster');
                        cardPoster.setAttribute('src',data.allPosters[i]);
                        cardPoster.setAttribute('alt',data.allTitles[i]);
                        card.appendChild(cardPoster);

                        
                        //Line break between poster and title
                        const lineBreak = document.createElement('br'); //Don't name 'break'. Special variable
                        card.appendChild(lineBreak);
                        
                        //Insert title 
                        const cardDescription = document.createElement('div');
                        cardDescription.setAttribute('class','cardDescription');
                        const cardTitle = document.createElement('div');
                        const cardTitleUnderline = document.createElement('u');
                        //Text can only be appendChild using .createTextNode. Variables can be appendChild directly 
                        cardTitleUnderline.appendChild(document.createTextNode(data.allTitles[i])); 
                        cardTitle.appendChild(cardTitleUnderline);
                        
                        
                        //Insert hidden description popup
                        const cardDescriptionText = document.createElement('span');
                        cardDescriptionText.setAttribute('class','cardDescriptionText');
                        cardDescriptionText.appendChild(document.createTextNode(data.allDescription[i]));
                        
                        cardDescription.appendChild(cardDescriptionText);
                        cardDescription.appendChild(cardTitle);
                        card.appendChild(cardDescription);
                        wrap.appendChild(card);
                    }
                    grabAttr.appendChild(wrap);
                }

                createCards();                 

            }  
        });
    });
});


/*
<section class="card">
        <div class="cardContent" align="center">
            <img class="cardPoster" src="https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_UX67_CR0,0,67,98_AL_.jpg">
            <br>
            <div class="cardDescription">
                movieTitle
                <span class="cardDescriptionText">movieDescription</span>
            </div>
        </div>  
</section>
*/