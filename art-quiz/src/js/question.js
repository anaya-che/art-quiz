import PageLayout from './pageLayout';
import CategoryPage from './categoryPage';
import Animation from './animation';
import Sounds from './sounds';

class Question {

    constructor(fromPage, category, data, questions) {
        this.category = category;
        this.fromPage = fromPage
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
        this.quizQuestiionElement = document.querySelector('.quiz__question');
        this.quizAnswerElement = document.querySelectorAll('.quiz__answer');
        this.quizImgAnswerElements = document.querySelectorAll('.quiz__img-answer');
        this.answerImageElement = document.querySelector('.answer__image');
        this.authorElement = document.querySelector('.answer__author');
        this.nameElement = document.querySelector('.answer__name');
        this.yearElement = document.querySelector('.answer__year');
        this.indicatorElement = document.querySelector('.answer__indicator');
        this.animation = new Animation(this.fromPage, this.category);
    }

    async startQuiz() {
        this.answersData = {};
        this.firstQuestion = this.category * 10;
        this.lastQuestion = this.firstQuestion + 9;
        this.currentQuestion = this.firstQuestion;
        this.dotId = 1;
        await this.getQuizImg(this.firstQuestion);
        if (this.fromPage === 'artists') this.getAuthorAnswers(this.firstQuestion);
        if (this.fromPage === 'pictures') {
            this.setQuizQuestion(this.firstQuestion);
            this.getImgAnswers(this.firstQuestion);
        }
        this.setAnswerToPopup(this.firstQuestion)
        this.animation.quizShowAnimation();
    }

    async getQuizImg(num){
        const src = `./assets/quiz-img/${num}.webp`;
        const quizImage = await PageLayout.createImage(src);
        this.answerImageElement.style.backgroundImage = `url(${quizImage.src})`;
        if (this.fromPage === 'artists') this.quizImgElement.style.backgroundImage = `url(${quizImage.src})`;
    }

    setQuizQuestion(num) {
        this.quizQuestiionElement.textContent = `Какую из этих картин написал ${this.questions[num].author}?`
    }

    setAnswerToPopup(num) {
        this.authorElement.textContent = this.questions[num].author;
        this.nameElement.textContent = this.questions[num].name;
        this.yearElement.textContent = this.questions[num].year;
    }

    getAuthorAnswers(num) {
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

    getImgAnswers(num) {
        let answersArr = [];
        answersArr.push(this.questions[num].imageNum);
        while(answersArr.length < 4) {
            let i = Math.floor(Math.random() * 240);
            if (!answersArr.includes(this.data[i].imageNum) 
            && this.data[i].author !== this.questions[num].author) answersArr.push(this.data[i].imageNum);
        }
        this.shuffleAnswers(answersArr);
        this.quizImgAnswerElements.forEach( async (el, i) => {
            el.id = answersArr[i];
            const src = `./assets/quiz-img/${answersArr[i]}.webp`;
            const quizImage = await PageLayout.createImage(src);
            el.style.backgroundImage = `url(${quizImage.src})`;
        });
    }

    shuffleAnswers(arr) {
        arr.sort(() => Math.random() - 0.5);
    }

    checkAnswer(target) {
        if ((this.fromPage === 'artists' && target.textContent === this.questions[this.currentQuestion].author) 
        || (this.fromPage === 'pictures' && target.id === this.questions[this.currentQuestion].imageNum)) {
            Sounds.correctSound();
            target.style.backgroundColor = '#00A170';
            this.indicatorElement.style.backgroundColor = '#00A170';
            this.indicatorElement.style.backgroundImage = 'url("../assets/svg/correct.svg")';
            document.querySelector(`#dot${this.dotId}`).style.backgroundColor = '#00A170';
            this.dotId += 1;
            this.animation.popupShowAnimation();
            this.answersData[this.currentQuestion] = true;
        }

        else {
            Sounds.errorSound();
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
        if (this.fromPage === 'artists') {
            this.quizAnswerElement.forEach(el => {
                el.style.backgroundColor = 'unset';
            })
        }

        if (this.fromPage === 'pictures') {
            this.quizImgAnswerElements.forEach(el => {
                el.style.backgroundColor = 'unset';
            });
        }
    }

    async nextQuestion() {
        if(this.currentQuestion < this.lastQuestion) {
            this.unsetButtonColor()
            this.animation.popupHideAnimation();
            this.currentQuestion += 1;
            await this.getQuizImg(this.currentQuestion);
            if (this.fromPage === 'artists') this.getAuthorAnswers(this.currentQuestion);
            if (this.fromPage === 'pictures') {
                this.setQuizQuestion(this.currentQuestion);
                this.getImgAnswers(this.currentQuestion);
            }
            this.setAnswerToPopup(this.currentQuestion);
            this.animation.quizHideAnimation();
            setTimeout(() => this.animation.quizShowAnimation(), 1000);
        }

        else if(this.currentQuestion === this.lastQuestion) {
            Sounds.endOfQuiz();
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