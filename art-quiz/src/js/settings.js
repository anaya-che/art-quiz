import PageLayout from './pageLayout'

class Settings {

    constructor(page = 'home') {
        this.page = page;
        document.addEventListener('DOMContentLoaded', new PageLayout(this.page));
    }

    static changePage(page) {
        this.page = page;
        new PageLayout(this.page);
    }

}

export default Settings;