import PageLayout from './pageLayout'
import Question from './question'

class App {

    constructor(page = 'home') {
        this.page = page;
        document.addEventListener('DOMContentLoaded', PageLayout.init(this.page));
        document.addEventListener('click', this.changePage);
        // document.addEventListener('click', this.chooseCategory.bind(this));
    }

    changePage({ target }) {

        if (target.closest('#artists')) {
            this.page = 'artists';
            PageLayout.init(this.page);
        }
        
        if (target.closest('#pictures')) {
            this.page = 'pictures';
            PageLayout.init(this.page);
        }

        if (target.closest('#home')) {
            this.page = 'home';
            PageLayout.init(this.page);
        }

        if (target.closest('.card')) {
            let quizCategory = Number(target.closest('.card').id.split('card')[1]);
            this.page = quizCategory;
            PageLayout.init(this.page);
            // const question = new Question(quizCategory);
            // console.log(question);
        }

        if (target.closest('#categories')) {
            if(this.page < 12) this.page = 'artists';
            if(this.page > 12) this.page = 'pictures';
            PageLayout.init(this.page);
        }

    }

}

export default App;