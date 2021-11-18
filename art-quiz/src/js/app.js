import PageLayout from './pageLayout'
import Question from './question'

class App {

    constructor(page = 'home') {
        this.getData();
        this.page = page;
        this.data;
        this.questions = {};
        this.firstQuestion;
        this.lastQuestion;
        this.currentQuestion;
        this.quiz;
        document.addEventListener('DOMContentLoaded', PageLayout.init(this.page));
        document.addEventListener('click', this.changePage.bind(this));
        document.addEventListener('click', this.checkAnswer.bind(this));
        document.addEventListener('click', this.nextQuestion.bind(this));
        // window.addEventListener('load', this.getLocalStorage);
    }

    async getData() {
        const imagesData = './data/images.json';
        const res = await fetch(imagesData);
        this.data = await res.json();
    }

    async changePage({ target }) {

        if (target.closest('#artists')) {
            this.page = 'artists';
            PageLayout.init(this.page);
        }
        
        if (target.closest('#pictures')) {
            this.page = 'pictures';
            PageLayout.init(this.page);
        }

        if (target.closest('#home')) {
            this.page = 'home';
            PageLayout.init(this.page);
        }

        if (target.closest('.card')) {
            let quizCategory = Number(target.closest('.card').id.split('card')[1]);
            this.page = quizCategory;
            PageLayout.init(this.page);
            this.startQuiz();
        }

        if (target.closest('#categories')) {
            if(this.page < 12) this.page = 'artists';
            if(this.page > 12) this.page = 'pictures';
            PageLayout.init(this.page);
        }

    }

    startQuiz() {
        let num = this.page * 10;
        this.questions = {};
        this.data.forEach((el, i) => {
            if(i >= num && i < num + 10) this.questions[i] = el;
        });

        this.quiz = new Question(this.page, this.data, this.questions);
    }


    checkAnswer({ target }) {
        if (target.closest('.quiz__answer')) {
            this.quiz.checkAnswer(target);
        }
    }

    nextQuestion({ target }) {
        if (target.closest('.answer__next-button')) {
            this.quiz.nextQuestion(target);
        }
    }

    getLocalStorage(category) {
        if(localStorage.getItem(category)) {
            const cardsStats = localStorage.getItem(category)
            const cardsStatsObject = JSON.parse(cardsStats);
            console.log(cardsStatsObject);
        }
    }

}

export default App;