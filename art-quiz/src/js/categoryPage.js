import MainPage from './mainPage';
import Animation from './animation';

class CategoryPage {
  static setArtistsPage(toPage) {
    document.querySelector('body').style.backgroundImage = 'unset';
    document.querySelector('.main').innerHTML = `
            <div class="categories-container">
                <div class="categories__buttons-container">
                    <div class="categories__button" id="home">Home</div>
                    <div class="categories__title">Categories</div>
                    <div class="plug"></div>
                </div>
                <div class="cards-container"></div>
            </div>`;

    if (toPage === 'artists') {
      const firstCardId = 0;
      const lastCardId = 11;
      const firstCardBgImg = 0;
      const lastCardBgImg = 110;

      this.renderCards(firstCardId, lastCardId);
      this.getCategoryBg(firstCardBgImg, lastCardBgImg);
    }

    if (toPage === 'pictures') {
      const firstCardId = 12;
      const lastCardId = 23;
      const firstCardBgImg = 120;
      const lastCardBgImg = 230;

      this.renderCards(firstCardId, lastCardId);
      this.getCategoryBg(firstCardBgImg, lastCardBgImg);
    }

    Animation.pageShowAnimation();
  }

  static renderCards(num, max) {
    const cardContainerElement = document.querySelector('.cards-container');
    const categoryLength = 2;
    for (let i = num; i <= max; i += 1) {
      const score = this.setCartsResults(i);
      let out = '';
      if (score || score === 0) {
        out = `
                    <div class="card" id="card${i}">
                        <div class="card-title">
                            <div class="card-number">${(i + 1)
    .toString()
    .padStart(categoryLength, '0')}</div>
                            <div class="card-score">${score} / 10</div>
                        </div>
                        <div class="score_button" id="score${i}">Score</div>
                    </div>`;
      } else {
        out = `
                <div class="card gray-image" id="card${i}">
                    <div class="card-title">
                        <div class="card-number">${(i + 1)
    .toString()
    .padStart(categoryLength, '0')}</div>
                        <div class="card-score"></div>
                    </div>
                </div>`;
      }

      cardContainerElement.innerHTML += out;
    }
  }

  static getCategoryBg(imgNum, maxImgNum) {
    let num = imgNum;
    const nextNumOfImage = 10;
    const cardElements = document.querySelectorAll('.card');
    const imagesArray = [];
    while (num <= maxImgNum) {
      const src = `./assets/quiz-img/${(num)}.webp`;
      imagesArray.push(MainPage.createImage(src));
      num += nextNumOfImage;
    }
    Promise.all(imagesArray).then((values) => {
      values.forEach((el, i) => {
        cardElements[i].style.backgroundImage = `url(${el.src})`;
      });
    });
  }

  static setCartsResults(id) {
    if (localStorage.getItem('answers')) {
      const cardsStatsJson = localStorage.getItem('answers');
      const cardsStats = JSON.parse(cardsStatsJson);
      let correctAnswers = 0;
      if (cardsStats[id]) {
        const obj = Object.values(cardsStats[id]);
        if (obj) {
          obj.forEach((el) => {
            if (el) correctAnswers += 1;
          });
        }
        return correctAnswers;
      }
    }
    return null;
  }
}

export default CategoryPage;
