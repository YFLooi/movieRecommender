let metascoreRank = 1;
const metascoreRankScorer = () => {
    let type = document.getElementsByName("metascoreRating");
    if(type[0].checked){ 
    //'0' denotes the 1st instance of 'metascore'. Radios and textboxes are numbered like an array's elements
        return metascoreRank = 1;
    }
    else if(type[1].checked){
        return metascoreRank = 2;
    }
    else if(type[2].checked){
        return metascoreRank = 3;
    }
    else if(type[3].checked){
        return metascoreRank = 4;
    }
    else if(type[4].checked){
        return metascoreRank = 5;
    }
};

let imdbRank = 1;
const imdbRankScorer = () => {
    let type = document.getElementsByName("imdbRating");
    if(type[0].checked){
        return imdbRank = 1;
    }
    else if(type[1].checked){
        return imdbRank = 2;
    }
    else if(type[2].checked){
        return imdbRank = 3;
    }
    else if(type[3].checked){
        return imdbRank = 4;
    }
    else if(type[4].checked){
        return imdbRank = 5;
    }
};

let directorRank = 1;
const directorRankScorer = () => {
    let type = document.getElementsByName("directorRating");
    if(type[0].checked){
        return directorRank = 1;
    }
    else if(type[1].checked){
        return directorRank = 2;
    }
    else if(type[2].checked){
        return directorRank = 3;
    }
    else if(type[3].checked){
        return directorRank = 4;
    }
    else if(type[4].checked){
        return directorRank = 5;
    }
};

let leadRank = 1;
const leadRankScorer = () => {
    let type = document.getElementsByName("leadRating");
    if(type[0].checked){
        return leadRank = 1;
    }
    else if(type[1].checked){
        return leadRank = 2;
    }
    else if(type[2].checked){
        return leadRank = 3;
    }
    else if(type[3].checked){
        return leadRank = 4;
    }
    else if(type[4].checked){
        return leadRank = 5;
    }
};

let supportRank = 1;
const supportRankScorer = () => {
    let type = document.getElementsByName("supportRating");
    if(type[0].checked){
        return supportRank = 1;
    }
    else if(type[1].checked){
        return supportRank = 2;
    }
    else if(type[2].checked){
        return supportRank = 3;
    }
    else if(type[3].checked){
        return supportRank = 4;
    }
    else if(type[4].checked){
        return supportRank = 5;
    }
};