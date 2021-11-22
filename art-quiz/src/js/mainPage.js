import Animation from './animation';

class MainPage {

    static createImage = (src) => new Promise((res, rej) => {
        const img = new Image();
        img.onload = () => res(img);
        img.onerror = rej;
        img.src = src;
    });

    static async setMainPage() {
        document.querySelector('.main').innerHTML = `
            <div class="button-container">
                <div class="main__button" id="artists">Artists</div>
                <div class="main__button" id="pictures">Pictures</div>
            </div>`;
        const src = `./assets/img/background.jpg`;
        const bgImage = await this.createImage(src);
        document.querySelector('body').style.backgroundImage = `url(${bgImage.src})`;
        Animation.pageShowAnimation();
    }

}

export default MainPage;