
import Sounds from './sounds';
import Animation from './animation';

class Settings {

    constructor() {
        this.volume = 1;
        this.muted = 'false';
        this.time = 'on';
        this.timeValue = 15;
        this.tempSettings = {
            volume: this.volume,
            muted: this.muted,
            time: this.time,
            timeValue: this.timeValue
        };
        this.musicSwitch;
        this.volumeSwitch;
        this.volumeBar;
        this.volumeBarPercentage;
        this.volumeButton;
        this.timeSwitch;
        this.timeValueInput;
        this.timeContainer;
        this.soundEffects = document.querySelector('.soundEffects');
        document.addEventListener('click', this.volumeSettings.bind(this));
        window.addEventListener('load', this.getLocalStorage())
    }

    setSettingsPage() {
        document.querySelector('body').style.backgroundImage = `unset`;
        document.querySelector('.main').innerHTML = `
        
        <div class="settings-container">
            <div class="settings-title-container">
                <div class="categories__button" id="home">Home</div>
                <div class="settings-main-title">Settings</div>
                <div class="plug"></div>
            </div>
            <div class="settings-inner-container">
                <div class="settings-volume-container">
                    <div class="settings-title">Change Volume</div>
                    <div class="volume-container">
                        <div class="volume"></div>
                        <div class="volume-bar">
                            <div class="volume-bar-percentage"></div>
                        </div>
                    </div>
                    <div class="settings-title">Volume Off / On</div>
                    <input type="checkbox" id="volume-switch">
                    <label for="volume-switch" class="switch">
                        <span class="volume-switch-handle switch-handle"></span>
                        <span class="volume-switch-label switch-label" data-on="On" data-off="Off"></span>
                    </label>
                </div>
                <div class="settings-timer-container">
                    <div class="settings-title">Change Time</div>
                    <div class="time-container">
                        <button class="time-button" id="stepDown" type="button" onclick="this.nextElementSibling.stepDown()">−</button>
                        <input class="time__number" id="time-value" type="number" min="5" max="30" readonly step="5" value="15">
                        <button class="time-button" id="stepUp" type="button" onclick="this.previousElementSibling.stepUp()">+</button>
                    </div>
                    <div class="settings-title">Time Off / On</div>
                    <input type="checkbox" id="time-switch">
                    <label for="time-switch" class="switch">
                        <span class="time-switch-handle switch-handle"></span>
                        <span class="time-switch-label switch-label" data-on="On" data-off="Off"></span>
                    </label>
                </div>
            </div>
            <div class="settings-button-container">
                <div class="categories__button" id="save">Save</div>
                <div class="categories__button" id="default">Default</div>
            </div>
        </div>`

        this.volumeSwitch = document.querySelector('#volume-switch');
        this.volumeBar = document.querySelector('.volume-bar');
        this.volumeBarPercentage = document.querySelector('.volume-bar-percentage');
        this.volumeButton = document.querySelector('.volume');
        this.timeSwitch = document.querySelector('#time-switch');
        this.timeValueInput = document.querySelector('#time-value');
        this.timeContainer = document.querySelector('.time-container');
        this.stepDownButton = document.querySelector('#stepDown');
        this.stepUpButton = document.querySelector('#stepUp');
        this.getLocalStorage();
        this.showValuesOnPage();
        Animation.pageShowAnimation();
    }

    
    volumeSettings(event) {
        if (event.target.closest('#music-switch')) {
            if (this.musicSwitch.checked) {
                this.music = 'true';
                Sounds.playMusic();
            }
            if (!this.musicSwitch.checked) {
                this.music = 'false';
                Sounds.stopMusic();
            }
        }
            
        if (event.target.closest('#volume-switch')) {
            this.muteVolumeOnPage();
        }

        if (event.target.closest('.volume-bar')) {
            this.updateVolumeOnPage(event);
        }

        if (event.target.closest('#time-switch')) {
            this.switchTimeOnPage();
        }

        if (event.target.closest('.time-button')) {
            this.changeTimeValueOnPage();
        }

        if (event.target.closest('#save')) {
            this.saveSettings();
        }

        if (event.target.closest('#default')) {
            this.setDefaultValues();
        }
    }

    muteVolumeOnPage() {
        if (this.tempSettings.muted === 'false') {
            this.tempSettings.muted = 'true';
            this.muteVolume();
        }
        else {
            this.tempSettings.muted = 'false';
            this.unmuteVolume();
        }
    }

    muteVolume() {
        this.volumeButton.classList.add('muted');
        this.volumeBar.classList.add('volume-muted');
        this.volumeSwitch.checked = false;
    }

    unmuteVolume() {
        this.volumeButton.classList.remove('muted');
        this.volumeBar.classList.remove('volume-muted');
        this.volumeSwitch.checked = true;
    }

    updateVolumeOnPage(event) {
        if (this.tempSettings.muted === 'false') {
            const sliderWidth = window.getComputedStyle(this.volumeBar).width;
            let newVolume = Math.abs(event.offsetX / parseInt(sliderWidth));
            if (newVolume < 0.02) newVolume = 0;
            this.volumeBarPercentage.style.width = `${newVolume * 100}%`;
            if (newVolume === 0) {
                this.tempSettings.muted = 'true';
                this.muteVolume();
            }
            this.tempSettings.volume = newVolume;
        }
    }

    switchTimeOnPage() {
        if (this.tempSettings.time === 'on') {
            this.tempSettings.time = 'off';
            this.timeSwitch.checked = false;
            this.timeContainer.classList.add('inactive');
            this.stepDownButton.setAttribute('onclick', "event.preventDefault()");
            this.stepUpButton.setAttribute('onclick', "event.preventDefault()");
        }
        else {
            this.tempSettings.time = 'on';
            this.timeSwitch.checked = true;
            this.timeContainer.classList.remove('inactive');
            this.stepDownButton.setAttribute('onclick', "this.nextElementSibling.stepDown()");
            this.stepUpButton.setAttribute('onclick', "this.previousElementSibling.stepUp()");
        }
    }

    changeTimeValueOnPage() {
        this.tempSettings.timeValue = this.timeValueInput.value;
    }

    saveSettings() {
        this.muted = this.tempSettings.muted;
        this.volume = this.tempSettings.volume;
        this.time = this.tempSettings.time;
        this.timeValue = this.tempSettings.timeValue;

        this.setLocalStorage();
        this.applySettings();
    }

    setLocalStorage() {
        localStorage.setItem('volume', this.volume);
        localStorage.setItem('muted', this.muted);
        localStorage.setItem('time', this.time);
        localStorage.setItem('timeValue', this.timeValue);
    }

    getLocalStorage() {
        if (localStorage.getItem('volume')) {
            this.volume = localStorage.getItem('volume');
        }
        if (localStorage.getItem('muted')) {
            this.muted = localStorage.getItem('muted');
        }
        if (localStorage.getItem('time')) {
            this.time = localStorage.getItem('time');
        }
        if (localStorage.getItem('timeValue')) {
            this.timeValue = localStorage.getItem('timeValue');
        }
        this.applySettings();
        this.tempSettings = { muted: this.muted, volume: this.volume, time: this.time, timeValue: this.timeValue }
    }

    showValuesOnPage() {
        this.volumeBarPercentage.style.width = `${this.tempSettings.volume * 100}%`;
        if (this.tempSettings.muted === 'true') this.muteVolume();
        if (this.tempSettings.muted === 'false') this.unmuteVolume();
        if (this.tempSettings.time === 'on') {
            this.timeSwitch.checked = true;
            this.timeContainer.classList.remove('inactive');
            this.stepDownButton.setAttribute('onclick', "this.nextElementSibling.stepDown()");
            this.stepUpButton.setAttribute('onclick', "this.previousElementSibling.stepUp()");
        }
        if (this.tempSettings.time === 'off') {
            this.timeSwitch.checked = false;
            this.timeContainer.classList.add('inactive');
            this.stepDownButton.setAttribute('onclick', "event.preventDefault()");
            this.stepUpButton.setAttribute('onclick', "event.preventDefault()");
        }
        this.timeValueInput.value = this.tempSettings.timeValue;
    }

    applySettings() {
        if (this.muted === 'true') this.soundEffects.muted = true;
        else this.soundEffects.muted = false;
        this.soundEffects.volume = this.volume;
    }

    stopDefaultAction(event) {
        event.preventDefault();
    }

    setDefaultValues() {
        this.tempSettings = { muted: 'false', volume: 1, time: 'on', timeValue: 15 };
        this.showValuesOnPage();
    }
}

export default Settings;