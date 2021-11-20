import PageLayout from './pageLayout';
import CategoryPage from './categoryPage';

class ScorePage {

    static setScorePage(scoreCategory, cardsInfo) {
        document.querySelector('.categories__buttons-container').innerHTML = `
            <div class="categories__button" id="home">Home</div>
            <div class="categories__title">Score</div>
            <div class="categories__button" id="categories">Categories</div>`
        this.renderCards(scoreCategory, cardsInfo);
    }

    static removeGrayClass() {
        document.querySelectorAll('.card').forEach(el => {
            el.classList.remove('gray-image');
        });
    }

    static renderCards(category, cardsInfo) {
        const cardsStats = CategoryPage.getLocalStorage()[category];
        let out = '';
        for (let key in cardsStats) {
            if(cardsStats[key]) out += `
            <div class="score__card-item" id="${key}">
                <div class="score__card-info" id="info${key}">
                    <div class="score__card-author">${cardsInfo[key].author}</div>
                    <div class="score__card-name">${cardsInfo[key].name}</div>
                    <div class="score__card-year">${cardsInfo[key].year}</div>
                </div>
            </div>`;
            if(!cardsStats[key]) out += `
            <div class="score__card-item gray-image" id="${key}">
                <div class="score__card-info" id="info${key}">
                    <div class="score__card-author">${cardsInfo[key].author}</div>
                    <div class="score__card-name">${cardsInfo[key].name}</div>
                    <div class="score__card-year">${cardsInfo[key].year}</div>
                </div>
            </div>`
        }
        document.querySelector('.cards-container').innerHTML = out;
        this.getImgForCards();
    }

    static getImgForCards() {
        document.querySelectorAll('.score__card-item').forEach(async (el) => {
            let src = `./assets/quiz-img/${(el.id)}.webp`;
            let cardImage = await PageLayout.createImage(src);
            el.style.backgroundImage = `url(${cardImage.src})`;
        })
    }

}

export default ScorePage;