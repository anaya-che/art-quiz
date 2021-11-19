import PageLayout from './pageLayout';
import CategoryPage from './categoryPage';
import Animation from './animation';

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
        this.quizImgElement = document.querySelector('.quiz__img');
        this.quizAnswerElement = document.querySelectorAll('.quiz__answer');
        this.answerImageElement = document.querySelector('.answer__image');
        this.authorElement = document.querySelector('.answer__author');
        this.nameElement = document.querySelector('.answer__name');
        this.yearElement = document.querySelector('.answer__year');
        this.indicatorElement = document.querySelector('.answer__indicator');
        this.animation = new Animation;
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

        this.animation.quizShowAnimation();
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
            this.animation.popupShowAnimation();
            this.answersData[this.currentQuestion] = true;
        }

        else {
            target.style.backgroundColor = '#E9897E';
            this.indicatorElement.style.backgroundColor = '#E9897E';
            this.indicatorElement.style.backgroundImage = 'url("../assets/svg/wrong.svg")';
            document.querySelector(`#dot${this.dotId}`).style.backgroundColor = '#E9897E';
            this.dotId += 1;
            this.animation.popupShowAnimation();
            this.answersData[this.currentQuestion] = false;
        }
    }

    unsetButtonColor() {
        this.quizAnswerElement.forEach(el => {
            el.style.backgroundColor = 'unset';
        })
    }

    async nextQuestion() {
        if(this.currentQuestion < this.lastQuestion) {
            this.unsetButtonColor()
            this.animation.popupHideAnimation();
            this.currentQuestion += 1;
            await this.getQuizImg(this.currentQuestion);
            this.getAnswers(this.currentQuestion);
            this.setAnswerToPopup(this.currentQuestion);
            this.animation.quizHideAnimation()
            setTimeout(() => this.animation.quizShowAnimation(), 1200);
        }

        else if(this.currentQuestion === this.lastQuestion) {
            this.setLocalStorage();
            this.getResults();
            this.animation.showResult();
        }
    }

    getResults() {
        let correctAnswers = 0;
        let obj = this.answersData;
        for (let key in obj) {
            if (obj[key]) correctAnswers += 1;
        }
        document.querySelector('.result__score').textContent = `${correctAnswers} / 10`
    }

    setLocalStorage() {
        let obj = {};
        if (localStorage.getItem('answers')) obj = CategoryPage.getLocalStorage();
        
        obj[this.category] = this.answersData;
        const json = JSON.stringify(obj);
        localStorage.setItem('answers', json);
    }

}

export default Question;