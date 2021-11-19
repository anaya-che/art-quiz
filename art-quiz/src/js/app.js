import PageLayout from './pageLayout';
import Question from './question';
import ScorePage from './scorePage';

class App {

    constructor(page = 'home') {
        this.getData();
        this.page = page;
        this.fromPage;
        this.data;
        this.questions = {};
        this.scoreCards = [];
        this.firstQuestion;
        this.lastQuestion;
        this.currentQuestion;
        this.quiz;
        document.addEventListener('DOMContentLoaded', PageLayout.init(this.fromPage, this.page));
        document.addEventListener('click', this.changePage.bind(this));
        document.addEventListener('click', this.checkAnswer.bind(this));
        document.addEventListener('click', this.nextQuestion.bind(this));

    }

    async getData() {
        const imagesData = './data/images.json';
        const res = await fetch(imagesData);
        this.data = await res.json();
    }

    async changePage({ target }) {

        if (target.closest('#artists')) {
            this.fromPage = 'home'
            this.page = 'artists';
            PageLayout.init(this.fromPage, this.page);
        }
        
        if (target.closest('#pictures')) {
            this.fromPage = 'home'
            this.page = 'pictures';
            PageLayout.init(this.fromPage, this.page);
        }

        if (target.closest('#home')) {
            this.fromPage = this.page;
            this.page = 'home';
            PageLayout.init(this.fromPage, this.page);
        }

        if (target.closest('#score')) {
            if (this.page === 'artists') {
                this.fromPage = this.page;
                this.page = 'score';
            }
            if (this.page === 'pictures') {
                this.fromPage = this.page;
                this.page = 'score';
            }
            PageLayout.init(this.fromPage, this.page);
        }

        if (target.closest('.card') && (this.page === 'artists' || this.page === 'pictures')) {
            this.fromPage = this.page;
            let quizCategory = Number(target.closest('.card').id.split('card')[1]);
            this.page = quizCategory;
            PageLayout.init(this.fromPage, this.page);
            this.startQuiz();
        }

        if (target.closest('.card') && this.page === 'score') {
            this.fromPage = this.page;
            let scoreCategory = Number(target.closest('.card').id.split('card')[1]);
            this.page = scoreCategory;
            // PageLayout.init(this.fromPage, this.page);
            this.getCardsForScore();
            ScorePage.renderCards(this.page, this.scoreCards);
        }

        if (target.closest('#categories') || target.closest('#next-category')) {
            if(this.fromPage === 'artists') this.page = 'artists';
            if(this.fromPage === 'pictures') this.page = 'pictures';
            PageLayout.init(this.fromPage, this.page);
        }

    }

    startQuiz() {
        let num = this.page * 10;
        this.questions = {};
        this.data.forEach((el, i) => {
            if(i >= num && i < num + 10) this.questions[i] = el;
        });

        this.quiz = new Question(this.fromPage, this.page, this.data, this.questions);
    }


    checkAnswer({ target }) {
        if (target.closest('.quiz__answer') || target.closest('.quiz__img-answer')) {
            this.quiz.checkAnswer(target);
        }
    }

    nextQuestion({ target }) {
        if (target.closest('.answer__next-button')) {
            this.quiz.nextQuestion(target);
        }
    }

    getCardsForScore() {
        let num = this.page * 10;
        this.scoreCards = [];
        this.data.forEach((el, i) => {
            if(i >= num && i < num + 10) this.scoreCards.push(el.imageNum);
        });
    }

}

export default App;