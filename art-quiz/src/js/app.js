import PageLayout from './pageLayout';
import Question from './question';
import ScorePage from './scorePage';
import Settings from './settings';

class App {

    constructor(page = 'home') {
        this.getData();
        this.page = page;
        this.fromPage;
        this.data;
        this.questions = {};
        this.firstQuestion;
        this.lastQuestion;
        this.currentQuestion;
        this.quiz;
        document.addEventListener('DOMContentLoaded', PageLayout.init(this.fromPage, this.page));
        document.addEventListener('DOMContentLoaded', this.settings = new Settings);
        document.addEventListener('click', this.changePage.bind(this));
        // document.addEventListener('click', this.checkAnswer.bind(this));
        // document.addEventListener('click', this.nextQuestion.bind(this));
        document.addEventListener('click', this.showCardScoreInfo);
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

        if (target.closest('.score_button')) {
            this.fromPage = this.page;
            let scoreCategory = Number(target.closest('.score_button').id.split('score')[1]);
            this.page = scoreCategory;
            this.getInfoForQuestions();
            ScorePage.setScorePage(scoreCategory, this.questions);
        }

        if (target.closest('.card') && !target.closest('.score_button')) {
            this.fromPage = this.page;
            let quizCategory = Number(target.closest('.card').id.split('card')[1]);
            this.page = quizCategory;
            PageLayout.init(this.fromPage, this.page);
            this.startQuiz();
        }

        if (target.closest('#categories') || target.closest('#next-category')) {
            if(this.fromPage === 'artists') this.page = 'artists';
            if(this.fromPage === 'pictures') this.page = 'pictures';
            PageLayout.init(this.fromPage, this.page);
        }

        if (target.closest('.header-settings') && this.page !== 'settings') {
            this.page = 'settings';
            this.settings.setSettingsPage();
        }
    }

    startQuiz() {
        this.getInfoForQuestions();
        this.quiz = new Question(this.fromPage, this.page, this.data, this.questions, this.settings.time, this.settings.timeValue);
    }

    getInfoForQuestions() {
        let num = this.page * 10;
        this.questions = {};
        this.data.forEach((el, i) => {
            if(i >= num && i < num + 10) this.questions[i] = el;
        });
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

    showCardScoreInfo({ target }) {
        if (target.closest('.score__card-item')) {
            document.querySelectorAll('.score__card-info').forEach(el => {
                if (el.id === `info${target.id}`) el.classList.toggle('show');
                else if (el.classList.contains('show')) el.classList.remove('show');
            })
        }
    }

}

export default App;