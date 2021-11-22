class Animation {
    
    constructor(fromPage, category) {
        this.category = category;
        this.fromPage = fromPage;
        this.quizContainer = document.querySelector('.quiz-container');
        this.quizPagination = document.querySelector('.quiz__pagination');
        this.quizImgElement = document.querySelector('.quiz__img');
        this.quizImgAnswerContainer = document.querySelector('.quiz__img-container');
        this.answersContainer = document.querySelector('.quiz__answers-container')
        this.questionContainer = document.querySelector('.quiz__question-container')
        this.popupElement = document.querySelector('.popup-container');
        this.overlayElement = document.querySelector('.page-overlay');
        this.answerContainer = document.querySelector('.answer-container');
        this.resultContainer = document.querySelector('.result-container');
        this.timerElement = document.querySelector('.timer');
    }

    quizShowAnimation() {
        this.quizContainer.style.transform = 'translateX(0)';
        this.quizPagination.style.transform = 'unset';
        this.questionContainer.style.transform = 'unset';
        this.timerElement.style.transform = 'unset';

        if (this.fromPage === 'artists') {
            this.quizImgElement.style.transform = 'unset';
            this.answersContainer.style.transform = 'unset';
        }

        if (this.fromPage === 'pictures') {
            this.quizImgAnswerContainer.style.transform = 'unset';
        }
    }

    quizHideAnimation() {
        this.quizContainer.style.transform = 'translate(-100vw, -50vh)';
        this.quizPagination.style.transform = 'translateX(-100vw)';
        this.questionContainer.style.transform = 'translate(-50vw, -50vh)';
        this.timerElement.style.transform = 'translate(-50vw, -50vh)';

        if (this.fromPage === 'artists') {
            this.quizImgElement.style.transform = 'translate(-50vw, -50vh) scale(0)';
            this.answersContainer.style.transform = 'translate(-100vw, 0)';
        }

        if (this.fromPage === 'pictures') {
            this.quizImgAnswerContainer.style.transform = 'translate(-50vw, -50vh) scale(0)';
        }
    }

    popupShowAnimation() {
        this.popupElement.style.transform = 'unset';
        this.answerContainer.style.transform = 'unset';
        this.overlayElement.style.opacity = '0.6';
        this.popupElement.style.height = `${document.body.clientHeight}px`;
    }

    popupHideAnimation() {
        this.overlayElement.style.opacity = '0';
        this.popupElement.style.transform = 'translateX(-100vw)';
        this.answerContainer.style.transform = 'translate(-100vw, -100vh) scale(0)';
    }

    showResult() {
        this.answerContainer.style.transform = 'translate(-100vw, -100vh) scale(0)';
        this.resultContainer.style.transform = 'unset';
    }

    static pageShowAnimation() {
        document.querySelector('.main').style.transform = 'unset';
    }

    static pageHideAnimation() {
        document.querySelector('.main').style.transform = 'translateX(-100vw)';
    }
    
}

export default Animation;