import PageLayout from './pageLayout';
import Settings from './settings'

class MainPage {

    constructor() {
        this.body = document.querySelector('body');
        this.mainElement = document.querySelector('.main');
        this.getMainPage();
        document.addEventListener('click', this.chooseCategory);
    }

    async getMainPage() {
        const src = `./assets/img/background.jpg`;
        const bgImage = await PageLayout.createImage(src);
        this.body.style.backgroundImage = `url(${bgImage.src})`;
        this.mainElement.innerHTML = `
            <div class="button-container">
                <div class="main__button" id="artists">Artists</div>
                <div class="main__button" id="pictures">Pictures</div>
            </div>`;
    }

    chooseCategory({ target }) {
        if (target.closest('#artists')) 
        Settings.changePage('artists');

        if (target.closest('#pictures')) 
        Settings.changePage('pictures');
    }

}

export default MainPage;