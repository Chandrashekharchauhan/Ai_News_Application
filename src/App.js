import React, {useState, useEffect} from "react";
import alanBtn from "@alan-ai/alan-sdk-web";

import wordsToNumbers from "words-to-numbers";

import NewsCards from './Components/NewsCards/NewsCards';
import useStyles from './styles.js';

const alanKey = '0bba7f2a1e84bae17a09163f93682d7f2e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {
    const[newsArticles, setNewsArticles] = useState([]);
    const[activeArticle, setActiveArticle] = useState(-1);
    const classes = useStyles();


    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({ command, articles, number }) => {
                if(command === 'newHeadlines') {
                    setNewsArticles(articles);
                    
                } else if(command === 'highlight') {
                    setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
                } else if(command === 'open') {
                    const parsedNumber = number.length > 2 ? wordsToNumbers(number, { fuzzy : true}) : number;
                    const article = articles[parsedNumber - 1];

                    if(parsedNumber > 20) {
                        alanBtn().playText('Please try that again.')
                    } else if(article){
                        window.open(articles[number].url, '_blank');
                        alanBtn().playText('Opening....');
                    }
                }
            }
        })
    }, [])


    return (
        <div>
            <div className={classes.logoContainer}>
                <img src="https://t3.ftcdn.net/jpg/00/88/43/58/240_F_88435800_UWguWz2C7Sy8vcMOtr9EQhcvA21KwQbG.jpg" className={classes.alanLogo} alt="News logo"/>
            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle} />
        </div>
    );
}

export default App;