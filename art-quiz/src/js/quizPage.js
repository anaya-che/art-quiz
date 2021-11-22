import Animation from './animation';

class QuizPage {

    static setQuizPage(fromPage, page) {

        if (fromPage === 'artists') {
            document.querySelector('.main').innerHTML = `
            <div class="quiz-container">
                <div class="quiz__question-container">
                    <div class="quiz__button" id="home">Home</div>
                    <div class="quiz__question">Кто автор данной картины?</div>
                    <div class="quiz__button" id="categories">Categories</div>
                </div>
                <div class="timer"></div>
                <div class="quiz__img"></div>
                <div class="quiz__pagination">
                    <div class="pagination-dot" id="dot1"></div>
                    <div class="pagination-dot" id="dot2"></div>
                    <div class="pagination-dot" id="dot3"></div>
                    <div class="pagination-dot" id="dot4"></div>
                    <div class="pagination-dot" id="dot5"></div>
                    <div class="pagination-dot" id="dot6"></div>
                    <div class="pagination-dot" id="dot7"></div>
                    <div class="pagination-dot" id="dot8"></div>
                    <div class="pagination-dot" id="dot9"></div>
                    <div class="pagination-dot" id="dot10"></div>
                </div>
                <div class="quiz__answers-container">
                    <div class="quiz__answer" id="answer1"></div>
                    <div class="quiz__answer" id="answer2"></div>
                    <div class="quiz__answer" id="answer3"></div>
                    <div class="quiz__answer" id="answer4"></div>
                </div>
            </div>
            <div class="popup-container">
                <div class="page-overlay"></div>
                <div class="answer-container">
                    <div class="answer__indicator"></div>
                    <div class="answer__image"></div>
                    <div class="answer__author"></div>
                    <div class="answer__name"></div>
                    <div class="answer__year"></div>
                    <div class="answer__next-button">Next question</div>
                </div>
                <div class="result-container">
                    <div class="result__text">Congratulations!</div>
                    <div class="result__image"></div>
                    <div class="result__score"></div>
                    <div class="result__next-button" id="next-category">Next</div>
                </div>
            </div>`
        }
        
        if (fromPage === 'pictures') {
            document.querySelector('.main').innerHTML = `
                <div class="quiz-container">
                    <div class="quiz__question-container">
                        <div class="quiz__button" id="home">Home</div>
                        <div class="quiz__question"></div>
                        <div class="quiz__button" id="categories">Categories</div>
                    </div>
                    <div class="timer"></div>
                    <div class="quiz__img-container">
                        <div class="quiz__img-answer" id="answer1"></div>
                        <div class="quiz__img-answer" id="answer2"></div>
                        <div class="quiz__img-answer" id="answer3"></div>
                        <div class="quiz__img-answer" id="answer4"></div>
                    </div>
                    <div class="quiz__pagination">
                        <div class="pagination-dot" id="dot1"></div>
                        <div class="pagination-dot" id="dot2"></div>
                        <div class="pagination-dot" id="dot3"></div>
                        <div class="pagination-dot" id="dot4"></div>
                        <div class="pagination-dot" id="dot5"></div>
                        <div class="pagination-dot" id="dot6"></div>
                        <div class="pagination-dot" id="dot7"></div>
                        <div class="pagination-dot" id="dot8"></div>
                        <div class="pagination-dot" id="dot9"></div>
                        <div class="pagination-dot" id="dot10"></div>
                    </div>
                </div>
                <div class="popup-container">
                    <div class="page-overlay"></div>
                    <div class="answer-container">
                        <div class="answer__indicator"></div>
                        <div class="answer__image"></div>
                        <div class="answer__author"></div>
                        <div class="answer__name"></div>
                        <div class="answer__year"></div>
                        <div class="answer__next-button">Next question</div>
                    </div>
                    <div class="result-container">
                        <div class="result__text"></div>
                        <div class="result__image"></div>
                        <div class="result__score"></div>
                        <div class="result__next-button" id="next-category">Next</div>
                    </div>
                </div>`
        }
        Animation.pageShowAnimation();
    }
}

export default QuizPage;