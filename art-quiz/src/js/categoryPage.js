import PageLayout from './pageLayout';

class CategoryPage {

    static setArtistsPage(page) {
        document.querySelector('body').style.backgroundImage = `unset`;
        document.querySelector('.main').innerHTML = `
            <div class="categories-container">
                <div class="categories__buttons-container">
                    <div class="categories__button" id="home">Home</div>
                    <div class="categories__title">Categories</div>
                    <div class="categories__button" id="score">Score</div>
                </div>
                <div class="cards-container"></div>
            </div>`

        if (page === 'artists') {
            this.renderCards(0, 12);
            this.getCategoryBg(0, 112, 0);
        }

        if (page === 'pictures') {
            this.renderCards(12, 24);
            this.getCategoryBg(120, 232, 12);
        }
    }

    static renderCards(num, max) {
        const cardContainerElement = document.querySelector('.cards-container');
        for(let i = num; i < max; i++) {
            cardContainerElement.innerHTML += `
                <div class="card" id="card${i}">
                    <div class="card-title">
                        <div class="card-number">${(i + 1).toString().padStart(2, "0")}</div>
                        <div class="card-score"></div>
                    </div>
                </div>`
        }
    }

    static async getCategoryBg(imgNum, maxImgNum, id) {
        while(imgNum < maxImgNum) {
            let src = `./assets/quiz-img/${(imgNum)}.webp`;
            let cardImage = await PageLayout.createImage(src);
            if (document.querySelector(`#card${(id)}`)) {
                this.setCategoryBg(cardImage.src, id);
            }
            imgNum += 10;
            id += 1;
        }
    }

    static setCategoryBg(src, id) {
            const cardElement = document.querySelector(`#card${(id)}`);
            cardElement.style.backgroundImage = `url(${src})`;
    }

}

export default CategoryPage;