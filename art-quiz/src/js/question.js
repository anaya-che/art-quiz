import MainPage from './mainPage';
import Animation from './animation';
import Sounds from './sounds';

class Question {
  constructor(fromPage, category, data, questions, time, timeValue) {
    this.category = category;
    this.fromPage = fromPage;
    this.data = data;
    this.questions = questions;
    this.time = time;
    this.timeValue = timeValue;
    this.startQuiz();
    this.firstQuestion = this.category * 10;
    this.lastQuestion = this.firstQuestion + 9;
    this.currentQuestion = this.firstQuestion;
    this.dotId = 1;
    this.answersData = {};
    this.countDown = this.timeValue;
    this.body = document.querySelector('body');
    this.quizImgElement = document.querySelector('.quiz__img');
    this.quizQuestionElement = document.querySelector('.quiz__question');
    this.quizAnswerElement = document.querySelectorAll('.quiz__answer');
    this.quizImgAnswerElements = document.querySelectorAll('.quiz__img-answer');
    this.answerImageElement = document.querySelector('.answer__image');
    this.authorElement = document.querySelector('.answer__author');
    this.nameElement = document.querySelector('.answer__name');
    this.yearElement = document.querySelector('.answer__year');
    this.indicatorElement = document.querySelector('.answer__indicator');
    this.timerElement = document.querySelector('.timer');
    this.nextButton = document.querySelector('#next-category');
    this.resultImage = document.querySelector('.result__image');
    this.resultText = document.querySelector('.result__text');
    this.animation = new Animation(this.fromPage, this.category);
    this.interval = {};
    document.addEventListener('click', this.stopTimerOnPage.bind(this));
    this.nextButton.addEventListener('click', this.hidePage.bind(this));
  }

  async startQuiz() {
    this.answersData = {};
    const numberOfQuestions = 10;
    this.firstQuestion = this.category * numberOfQuestions;
    this.lastQuestion = this.firstQuestion + numberOfQuestions - 1;
    this.currentQuestion = this.firstQuestion;
    this.dotId = 1;
    await this.getQuizImg(this.firstQuestion);
    if (this.fromPage === 'artists') this.getAuthorAnswers(this.firstQuestion);
    if (this.fromPage === 'pictures') {
      this.setQuizQuestion(this.firstQuestion);
      this.getImgAnswers(this.firstQuestion);
    }
    this.setAnswerToPopup(this.firstQuestion);
    this.animation.quizShowAnimation();
    this.startTimer();
  }

  async getQuizImg(num) {
    const src = `./assets/quiz-img/${num}.webp`;
    const quizImage = await MainPage.createImage(src);
    this.answerImageElement.style.backgroundImage = `url(${quizImage.src})`;
    if (this.fromPage === 'artists') { this.quizImgElement.style.backgroundImage = `url(${quizImage.src})`; }
  }

  setQuizQuestion(num) {
    this.quizQuestionElement.textContent = `Какую из этих картин написал ${this.questions[num].author}?`;
  }

  setAnswerToPopup(num) {
    this.authorElement.textContent = this.questions[num].author;
    this.nameElement.textContent = this.questions[num].name;
    this.yearElement.textContent = this.questions[num].year;
  }

  getAuthorAnswers(num) {
    const answersArr = [];
    answersArr.push(this.questions[num].author);
    while (answersArr.length < 4) {
      const numberOfAllQuestions = 240;
      const i = Math.floor(Math.random() * numberOfAllQuestions);
      if (!answersArr.includes(this.data[i].author)) { answersArr.push(this.data[i].author); }
    }
    Question.shuffleAnswers(answersArr);
    this.quizAnswerElement.forEach((el, i) => {
      const answerElement = el;
      answerElement.textContent = answersArr[i];
    });
  }

  getImgAnswers(num) {
    const answersArr = [];
    const numberOfAllQuestions = 240;
    answersArr.push(this.questions[num].imageNum);
    while (answersArr.length < 4) {
      const i = Math.floor(Math.random() * numberOfAllQuestions);
      if (
        !answersArr.includes(this.data[i].imageNum)
        && this.data[i].author !== this.questions[num].author
      ) { answersArr.push(this.data[i].imageNum); }
    }
    Question.shuffleAnswers(answersArr);
    this.quizImgAnswerElements.forEach(async (el, i) => {
      const answerElement = el;
      answerElement.id = answersArr[i];
      const src = `./assets/quiz-img/${answersArr[i]}.webp`;
      const quizImage = await MainPage.createImage(src);
      answerElement.style.backgroundImage = `url(${quizImage.src})`;
    });
  }

  static shuffleAnswers(arr) {
    arr.sort(() => Math.random() - 0.5);
  }

  checkAnswer(target) {
    const buttonElement = target;
    if (
      (this.fromPage === 'artists'
        && target.textContent === this.questions[this.currentQuestion].author)
      || (this.fromPage === 'pictures'
        && target.id === this.questions[this.currentQuestion].imageNum)
    ) {
      buttonElement.style.backgroundColor = '#00A170';
      this.correctAnswer();
    } else {
      buttonElement.style.backgroundColor = '#E9897E';
      this.wrongAnswer();
    }
  }

  correctAnswer() {
    this.indicatorElement.style.backgroundColor = '#00A170';
    this.indicatorElement.style.backgroundImage = 'url("../assets/svg/correct.svg")';
    document.querySelector(`#dot${this.dotId}`).style.backgroundColor = '#00A170';
    this.dotId += 1;
    this.animation.popupShowAnimation();
    this.answersData[this.currentQuestion] = true;
    Sounds.correctSound();
  }

  wrongAnswer() {
    this.indicatorElement.style.backgroundColor = '#E9897E';
    this.indicatorElement.style.backgroundImage = 'url("../assets/svg/wrong.svg")';
    document.querySelector(`#dot${this.dotId}`).style.backgroundColor = '#E9897E';
    this.dotId += 1;
    this.animation.popupShowAnimation();
    this.answersData[this.currentQuestion] = false;
    Sounds.errorSound();
  }

  unsetButtonColor() {
    if (this.fromPage === 'artists') {
      this.quizAnswerElement.forEach((el) => {
        const element = el;
        element.style.backgroundColor = 'unset';
      });
    }

    if (this.fromPage === 'pictures') {
      this.quizImgAnswerElements.forEach((el) => {
        const element = el;
        element.style.backgroundColor = 'unset';
      });
    }
  }

  async nextQuestion() {
    if (this.currentQuestion < this.lastQuestion) {
      this.startTimer();
      this.unsetButtonColor();
      this.animation.popupHideAnimation();
      this.currentQuestion += 1;
      await this.getQuizImg(this.currentQuestion);
      if (this.fromPage === 'artists') { this.getAuthorAnswers(this.currentQuestion); }
      if (this.fromPage === 'pictures') {
        this.setQuizQuestion(this.currentQuestion);
        this.getImgAnswers(this.currentQuestion);
      }
      this.setAnswerToPopup(this.currentQuestion);
      this.animation.quizHideAnimation();
      setTimeout(() => this.animation.quizShowAnimation(), 1000);
    } else if (this.currentQuestion === this.lastQuestion) {
      this.setLocalStorage();
      this.getResults();
      this.animation.showResult();
    }
  }

  async getResults() {
    let correctAnswers = 0;
    const numberOfQuestions = 10;
    const obj = Object.values(this.answersData);
    if (obj) {
      obj.forEach((el) => {
        if (el) correctAnswers += 1;
      });
    }
    document.querySelector(
      '.result__score',
    ).textContent = `${correctAnswers} / 10`;
    if (correctAnswers === 0) {
      const src = './assets/svg/champion-cup-failed.svg';
      const image = await MainPage.createImage(src);
      this.resultImage.style.backgroundImage = `url(${image.src})`;
      this.resultText.textContent = 'Failure!';
      Sounds.failOfQuiz();
    } else if (correctAnswers === numberOfQuestions) {
      const src = './assets/svg/stars.svg';
      const image = await MainPage.createImage(src);
      this.resultImage.style.backgroundImage = `url(${image.src})`;
      this.resultText.textContent = 'Grand Result!';
      Sounds.endOfQuiz();
    } else {
      const src = './assets/svg/champion-cup.svg';
      const image = await MainPage.createImage(src);
      this.resultImage.style.backgroundImage = `url(${image.src})`;
      this.resultText.textContent = 'Congratulations!';
      Sounds.endOfQuiz();
    }
  }

  setLocalStorage() {
    let obj = {};
    if (localStorage.getItem('answers')) {
      const cardsStatsJson = localStorage.getItem('answers');
      obj = JSON.parse(cardsStatsJson);
    }
    obj[this.category] = this.answersData;
    const json = JSON.stringify(obj);
    localStorage.setItem('answers', json);
  }

  startTimer() {
    this.countDown = this.timeValue;
    if (this.time === 'on') {
      this.interval = setInterval(this.timer.bind(this), 1000);
    }
  }

  stopTimer() {
    if (this.time === 'on') {
      clearInterval(this.interval);
    }
  }

  stopTimerOnPage({ target }) {
    if (
      target.closest('#home')
      || target.closest('#categories')
      || target.closest('.header-settings')
      || target.closest('.quiz__answer')
      || target.closest('.quiz__img-answer')
    ) {
      this.stopTimer();
    }
  }

  timer() {
    if (this.countDown >= 0) {
      this.timerElement.textContent = `00:${this.countDown
        .toString()
        .padStart(2, '0')}`;
      this.countDown -= 1;
    }

    if (this.countDown < 0) {
      this.stopTimer();
      this.wrongAnswer();
    }
  }

  hidePage() {
    this.animation.popupHideAnimation();
    Animation.pageHideAnimation();
  }
}

export default Question;
