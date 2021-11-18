import PageLayout from './pageLayout';

class Question {

    constructor(category, data, questions) {
        this.category = category
        this.data = data;
        this.questions = questions;
        this.startQuiz();
        this.firstQuestion;
        this.lastQuestion;
        this.currentQuestion;
        this.dotId;
        this.answersData;
        this.body = document.querySelector('body');
        this.quizImgElement = document.querySelector('.quiz__img')
        this.quizAnswerElement = document.querySelectorAll('.quiz__answer');
        this.answerImageElement = document.querySelector('.answer__image')
        this.authorElement = document.querySelector('.answer__author');
        this.nameElement = document.querySelector('.answer__name');
        this.yearElement = document.querySelector('.answer__year');
        this.popupElement = document.querySelector('.popup-container');
        this.overlayElement = document.querySelector('.page-overlay');
        this.answerContainer = document.querySelector('.answer-container');
        this.indicatorElement = document.querySelector('.answer__indicator');
        // window.addEventListener('beforeunload', this.setLocalStorage.bind(this))
    }

    async startQuiz() {
        this.answersData = {};
        this.firstQuestion = this.category * 10;
        this.lastQuestion = this.firstQuestion + 9;
        this.currentQuestion = this.firstQuestion;
        this.dotId = 1;
        await this.getQuizImg(this.firstQuestion);
        this.getAnswers(this.firstQuestion);
        this.setAnswerToPopup(this.firstQuestion)
    }

    async getQuizImg(num){
        const src = `./assets/quiz-img/${num}.webp`;
        const quizImage = await PageLayout.createImage(src);
        this.quizImgElement.style.backgroundImage = `url(${quizImage.src})`;
        this.answerImageElement.style.backgroundImage = `url(${quizImage.src})`
    }

    setAnswerToPopup(num) {
        this.authorElement.textContent = this.questions[num].author;
        this.nameElement.textContent = this.questions[num].name;
        this.yearElement.textContent = this.questions[num].year;
    }

    getAnswers(num) {
        let answersArr = [];
        answersArr.push(this.questions[num].author);
        while(answersArr.length < 4) {
            let i = Math.floor(Math.random() * 240);
            if (!answersArr.includes(this.data[i].author)) answersArr.push(this.data[i].author);
        }
        this.shuffleAnswers(answersArr);
        this.quizAnswerElement.forEach((el, i) => {
            el.textContent = answersArr[i];
        });
    }

    shuffleAnswers(arr) {
        arr.sort(() => Math.random() - 0.5);
    }

    checkAnswer(target) {
        if (target.textContent === this.questions[this.currentQuestion].author) {
            target.style.backgroundColor = '#00A170';
            this.indicatorElement.style.backgroundColor = '#00A170';
            this.indicatorElement.style.backgroundImage = 'url("../assets/svg/correct.svg")';
            document.querySelector(`#dot${this.dotId}`).style.backgroundColor = '#00A170';
            this.dotId += 1;
            this.popupShowAnimation();
            this.answersData[this.currentQuestion] = true;
        }

        else {
            target.style.backgroundColor = '#E9897E';
            this.indicatorElement.style.backgroundColor = '#E9897E';
            this.indicatorElement.style.backgroundImage = 'url("../assets/svg/wrong.svg")';
            document.querySelector(`#dot${this.dotId}`).style.backgroundColor = '#E9897E';
            this.dotId += 1;
            this.popupShowAnimation();
            this.answersData[this.currentQuestion] = false;
        }
    }

    popupShowAnimation() {
        this.body.style.overflow = 'hidden'
        this.popupElement.style.left = '0'
        this.overlayElement.style.opacity = '0.6'
        this.answerContainer.style.left = 'calc(50vw - 300px)'
        this.answerContainer.style.bottom = 'calc(-50vh - 300px)'
    }

    popupHideAnimation() {
        this.body.style.overflow = 'unset'
        this.popupElement.style.left = '-100vw'
        this.overlayElement.style.opacity = '0'
        this.answerContainer.style.left = '-100vw'
        this.answerContainer.style.bottom = 'calc(-100vh - 600px)'
    }

    unsetButtonColor() {
        this.quizAnswerElement.forEach(el => {
            el.style.backgroundColor = 'unset';
        })
    }

    async nextQuestion() {
        if(this.currentQuestion < this.lastQuestion) {
            this.unsetButtonColor()
            this.popupHideAnimation();
            this.currentQuestion += 1;
            let num = this.currentQuestion;
            await this.getQuizImg(num);
            this.getAnswers(num);
            this.setAnswerToPopup(this.currentQuestion)
        }

        else if(this.currentQuestion === this.lastQuestion) {
            this.setLocalStorage();
            this.getResults();

        }
    }

    getResults() {
        let correctAnswers = 0;
        let obj = this.answersData;
        for (let key in obj) {
            if (obj[key]) correctAnswers += 1;
        }
        return correctAnswers;
    }

    setLocalStorage() {
        let obj = {};
        obj[this.category] = this.answersData;
        const json = JSON.stringify(this.answersData);
        localStorage.setItem(this.category, json);
    }

}

export default Question;