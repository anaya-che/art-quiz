class QuizPage {

    static setQuizPage(page) {

        document.querySelector('body').innerHTML += `
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
            </div>`

        if(page < 12) {
            document.querySelector('.main').innerHTML = `
            <div class="quiz-container">
                <div class="quiz__question-container">
                    <div class="quiz__button" id="home">Home</div>
                    <div class="quiz__question">Кто автор данной картины?</div>
                    <div class="quiz__button" id="categories">Categories</div>
                </div>
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
            </div>`
        }

    }
}

export default QuizPage;