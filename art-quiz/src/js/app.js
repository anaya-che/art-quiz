import MainPage from './mainPage';
import Question from './question';
import ScorePage from './scorePage';
import Settings from './settings';
import CategoryPage from './categoryPage';
import QuizPage from './quizPage';
import Animation from './animation';

class App {
  constructor(page = 'home') {
    this.page = page;
    this.fromPage = '';
    this.data = {};
    this.questions = {};
    this.quiz = {};
    document.addEventListener('DOMContentLoaded', MainPage.setMainPage());
    document.addEventListener(
      'DOMContentLoaded',
      (this.settings = new Settings()),
    );
    document.addEventListener('click', this.changePage.bind(this));
    document.addEventListener('click', this.checkAnswer.bind(this));
    document.addEventListener('click', this.nextQuestion.bind(this));
    document.addEventListener('click', App.showCardScoreInfo);
  }

  async getData() {
    const imagesData = './data/images.json';
    const res = await fetch(imagesData);
    this.data = await res.json();
  }

  async changePage({ target }) {
    if (target.closest('#artists')) {
      this.fromPage = 'home';
      this.page = 'artists';
      Animation.pageHideAnimation();
      setTimeout(() => CategoryPage.setArtistsPage(this.page), 1000);
    }
    if (target.closest('#pictures')) {
      this.fromPage = 'home';
      this.page = 'pictures';
      Animation.pageHideAnimation();
      setTimeout(() => CategoryPage.setArtistsPage(this.page), 1000);
    }
    if (target.closest('#home')) {
      this.fromPage = this.page;
      this.page = 'home';
      Animation.pageHideAnimation();
      setTimeout(() => MainPage.setMainPage(), 1000);
    }
    if (target.closest('.score_button')) {
      this.fromPage = this.page;
      const scoreCategory = Number(
        target.closest('.score_button').id.split('score')[1],
      );
      this.page = scoreCategory;
      this.getInfoForQuestions();
      Animation.pageHideAnimation();
      setTimeout(
        () => ScorePage.setScorePage(scoreCategory, this.questions),
        1000,
      );
    }
    if (target.closest('.card') && !target.closest('.score_button')) {
      this.fromPage = this.page;
      const quizCategory = Number(target.closest('.card').id.split('card')[1]);
      this.page = quizCategory;
      Animation.pageHideAnimation();
      setTimeout(() => QuizPage.setQuizPage(this.fromPage), 1000);
      setTimeout(() => this.startQuiz(), 1000);
    }
    if (target.closest('#categories') || target.closest('#next-category')) {
      if (this.fromPage === 'artists') this.page = 'artists';
      if (this.fromPage === 'pictures') this.page = 'pictures';
      if (!target.closest('#next-category')) Animation.pageHideAnimation();
      setTimeout(() => CategoryPage.setArtistsPage(this.page), 1000);
    }
    if (target.closest('.header-settings') && this.page !== 'settings') {
      this.page = 'settings';
      Animation.pageHideAnimation();
      setTimeout(() => this.settings.setSettingsPage(), 1000);
    }
  }

  startQuiz() {
    this.getInfoForQuestions();
    this.quiz = new Question(
      this.fromPage,
      this.page,
      this.data,
      this.questions,
      this.settings.time,
      this.settings.timeValue,
    );
  }

  getInfoForQuestions() {
    const numberOfQuestions = 10;
    const num = this.page * numberOfQuestions;
    this.questions = {};
    this.data.forEach((el, i) => {
      if (i >= num && i < num + numberOfQuestions) this.questions[i] = el;
    });
  }

  checkAnswer({ target }) {
    if (
      target.closest('.quiz__answer')
      || target.closest('.quiz__img-answer')
    ) {
      this.quiz.checkAnswer(target);
    }
  }

  nextQuestion({ target }) {
    if (target.closest('.answer__next-button')) {
      this.quiz.nextQuestion();
    }
  }

  static showCardScoreInfo({ target }) {
    if (target.closest('.score__card-item')) {
      document.querySelectorAll('.score__card-info').forEach((el) => {
        if (el.id === `info${target.id}`) el.classList.toggle('show');
        else if (el.classList.contains('show')) el.classList.remove('show');
      });
    }
  }
}

export default App;
