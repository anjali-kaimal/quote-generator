const quoteContainer=document.getElementById('quote-container');
const quoteText=document.getElementById('quote');
const authorText=document.getElementById('author');
const twitterBtn=document.getElementById('twitter');
const newQuoteBtn=document.getElementById('new-quote');
const loader=document.getElementById('loader');

//We use let because it keeps changing
let apiQuotes=[];

//Show loading
function loading(){
    quoteContainer.hidden=true;
    loader.hidden=false;
}

//hide loading after complete
function complete(){
    quoteContainer.hidden=false;
    loader.hidden=true;
}
//Get quotes from API
async function getQuotes(){
    loading();
    
    //API URL
    const apiURL='https://type.fit/api/quotes';
    try{

        //waits for data to be fetched from API and then stores it into const
        const response=await fetch(apiURL);

        //Pass the json into a global variable
        apiQuotes=await response.json();

        newQuote();
    }
    catch(error){
        console.log(error);
    }
}

//Show new quote
function newQuote(){
    //in case we click new quote and it takes time to load
    loading();
    //Get random quote between 0 and array length
    const quote=apiQuotes[Math.floor(Math.random() * (apiQuotes.length))];
        
    //set the text content to value in array
    //Check if author is null, then return anonymous
    (!quote.author)?authorText.textContent="Anonymous":authorText.textContent=quote.author;

    //Check if the quote is too long then apply our long function in css
    if(quote.text.length>150){
        //pass css class
        quoteText.classList.add('long-quote');
    }
    else{
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent=quote.text;

    complete();

}

//tweet quote
function tweetQuote(){

    //create a query parameter text
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;

    //open the window
    window.open(twitterUrl,'_blank');
}

//Event listener
newQuoteBtn.addEventListener('click',newQuote);

twitterBtn.addEventListener('click',tweetQuote);

//On load
getQuotes();
