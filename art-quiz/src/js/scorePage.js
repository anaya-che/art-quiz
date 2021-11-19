import PageLayout from './pageLayout';
import CategoryPage from './categoryPage';

class ScorePage {

    static setScorePage() {
        document.querySelector('.categories__buttons-container').innerHTML = `
            <div class="categories__button" id="home">Home</div>
            <div class="categories__title">Score</div>
            <div class="categories__button" id="categories">Categories</div>`
     
        this.removeGrayClass();
        this.removeCardScore();
    }

    static removeGrayClass() {
        document.querySelectorAll('.card').forEach(el => {
            el.classList.remove('gray-image');
        });
    }

    static removeCardScore() {
        document.querySelectorAll('.card-score').forEach(el => {
            el.textContent = '';
        });
    }

    static renderCards(category, cards) {
        document.querySelector('.cards-container').classList.add('score-container');
        let out = '';
        cards.forEach(el => {
            out += `<div class="score_card-item" id="${el}"></div>`
        })
        document.querySelector('.score-container').innerHTML = out;

        this.getImgForCards();
    }

    static getImgForCards() {
        document.querySelectorAll('.score_card-item').forEach(async (el) => {
            let src = `./assets/quiz-img/${(el.id)}.webp`;
            let cardImage = await PageLayout.createImage(src);
            el.style.backgroundImage = `url(${cardImage.src})`;
        })
    }

}

export default ScorePage;