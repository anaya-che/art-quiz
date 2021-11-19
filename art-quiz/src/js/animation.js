

class Animation {
    
    constructor() {
        this.quizContainer = document.querySelector('.quiz-container');
        this.quizImgElement = document.querySelector('.quiz__img')
        this.answersContainer = document.querySelector('.quiz__answers-container')
        this.questionContainer = document.querySelector('.quiz__question-container')
        this.popupElement = document.querySelector('.popup-container');
        this.overlayElement = document.querySelector('.page-overlay');
        this.answerContainer = document.querySelector('.answer-container');
        this.resultContainer = document.querySelector('.result-container');
    }

    quizShowAnimation() {
        this.quizContainer.style.transform = 'translateX(0)';
        this.quizImgElement.style.transform = 'translateY(0)';
        this.answersContainer.style.transform = 'translateY(0)';
        this.questionContainer.style.transform = 'translateY(0)';
    }

    quizHideAnimation() {
        this.quizContainer.style.transform = 'translate(-100vw, -50vh)';
        this.quizImgElement.style.transform = 'translate(-50vw, -50vh) scale(0)';
        this.answersContainer.style.transform = 'translate(-100vw, 0)';
        this.questionContainer.style.transform = 'translate(-50vw, -50vh)';
    }

    popupShowAnimation() {
        this.popupElement.style.transform = 'translateX(0)';
        this.answerContainer.style.transform = 'translateY(0)';
        this.overlayElement.style.opacity = '0.6';
    }

    popupHideAnimation() {
        this.overlayElement.style.opacity = '0';
        this.popupElement.style.transform = 'translateX(-100vw)';
        this.answerContainer.style.transform = 'translate(-100vw, -100vh) scale(0)';
    }

    showResult() {
        this.answerContainer.style.transform = 'translate(-100vw, -100vh) scale(0)';
        this.resultContainer.style.transform = 'translateY(0)';
    }
    
}

export default Animation;