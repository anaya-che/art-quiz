import MainPage from './mainPage';
import Animation from './animation';

class ScorePage {
  static setScorePage(scoreCategory, cardsInfo) {
    document.querySelector('.categories__buttons-container').innerHTML = `
            <div class="categories__button" id="home">Home</div>
            <div class="categories__title">Score</div>
            <div class="categories__button" id="categories">Categories</div>`;
    this.renderCards(scoreCategory, cardsInfo);
    Animation.pageShowAnimation();
  }

  static removeGrayClass() {
    document.querySelectorAll('.card').forEach((el) => {
      el.classList.remove('gray-image');
    });
  }

  static renderCards(category, cardsInfo) {
    const cardsStatsJson = localStorage.getItem('answers');
    const cardsStats = JSON.parse(cardsStatsJson);
    const obj = Object.entries(cardsStats[category]);
    let out = '';
    obj.forEach((el) => {
      if (el[1]) {
        out += `
            <div class="score__card-item" id="${el[0]}">
                <div class="score__card-info" id="info${el[0]}">
                    <div class="score__card-author">${cardsInfo[el[0]].author}</div>
                    <div class="score__card-name">${cardsInfo[el[0]].name}</div>
                    <div class="score__card-year">${cardsInfo[el[0]].year}</div>
                </div>
            </div>`;
      }
      if (!el[1]) {
        out += `
            <div class="score__card-item gray-image" id="${el[0]}">
                <div class="score__card-info" id="info${el[0]}">
                    <div class="score__card-author">${cardsInfo[el[0]].author}</div>
                    <div class="score__card-name">${cardsInfo[el[0]].name}</div>
                    <div class="score__card-year">${cardsInfo[el[0]].year}</div>
                </div>
            </div>`;
      }
    });
    document.querySelector('.cards-container').innerHTML = out;
    this.getImgForCards();
  }

  static getImgForCards() {
    document.querySelectorAll('.score__card-item').forEach(async (el) => {
      const src = `./assets/quiz-img/${el.id}.webp`;
      const cardImage = await MainPage.createImage(src);
      const cardElement = el;
      cardElement.style.backgroundImage = `url(${cardImage.src})`;
    });
  }
}

export default ScorePage;
