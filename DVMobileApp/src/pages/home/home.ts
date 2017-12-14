import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController, Platform } from 'ionic-angular';
import { Geolocation, Keyboard } from 'ionic-native';
import { VachanasAPI, VachanaVM, TodaysVachana } from '../../providers/Vachanas';
//import { LocalNotifications } from 'ionic-native/local-notifications';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage {

    day: string = "";
    date: any = Date.now();
    vachanaOftheDay: VachanaVM;

    constructor(
        public alertController: AlertController,
        public loadingCtrl: LoadingController,
        public nav: NavController,
        public platform: Platform,
        public vachanasAPI: VachanasAPI,
        public todaysVachana: TodaysVachana
        //private localNotifications: LocalNotifications
    ) {

        //this.localNotifications.schedule({

        //    id: 1,
        //    text: 'Single ILocalNotification'
        //});

        this.getFormattedDate(new Date());
    }

    ionViewDidLoad() {

        //Once the main view loads
        //and after the platform is ready...
        this.platform.ready().then(() => {

            //Setup a resume event listener
            document.addEventListener('resume', () => {

                //Get the local weather when the app resumes
                this.getVachanaForToday();
            });

            //Populate the form with the current location data
            this.getVachanaForToday();
        });
    }

    getVachanaForToday() {

        if (1 == 1) {

            this.vachanaOftheDay = new VachanaVM(1234, "ಬ ಎಂಬಲ್ಲಿ ಎನ್ನ ಭಾವ ಹಿಂಗಿತ್ತು ಸ ಎಂಬಲ್ಲಿ ಸರ್ವಜ್ಞ ನಾದೆನು ವ ಎಂದು ವಾಚಿಸುವವೊಡೆ ವಸ್ತು ಚೈತನ್ಯಾತ್ಮಕನಾದೆನು ಇಂತಿ ಬಸವಾಕ್ಷರ ತ್ರಯಗಳೆನ್ನ ಸರ್ವತಂಗಗಳಲ್ಲಿ ತೊಲಗಿ ಬೆಳಗುವುದನ್ನು ಕಂಡು ನಾನು ನೀನು ಬಸವ ಬಸವ ಎನುತಿದ್ದೇವಯ್ಯ ಗುಹೇಶ್ವರ", "ವಿಶ್ವಗುರು ಬಸವಣ್ಣ", "ಲ ರು ಗೊಳಸಂಗಿ", "ಬ ಎಂಬಲ್ಲಿ ಎನ್ನ ಭಾವ ಹಿಂಗಿತ್ತು ಸ ಎಂಬಲ್ಲಿ ಸರ್ವಜ್ಞ ನಾದೆನು ವ ಎಂದು ವಾಚಿಸುವವೊಡೆ ವಸ್ತು ಚೈತನ್ಯಾತ್ಮಕನಾದೆನು ಇಂತಿ ಬಸವಾಕ್ಷರ ತ್ರಯಗಳೆನ್ನ ಸರ್ವತಂಗಗಳಲ್ಲಿ ತೊಲಗಿ ಬೆಳಗುವುದನ್ನು ಕಂಡು ನಾನು ನೀನು ಬಸವ ಬಸವ ಎನುತಿದ್ದೇವಯ್ಯ ಗುಹೇಶ್ವರ");
            this.todaysVachana.setTodaysVachana(this.vachanaOftheDay);
            return;
        }

        //Create the loading indicator
        let loader = this.loadingCtrl.create({
            content: "ನಿಮಗಾಗಿ ಸಮಂಜಸ ವಚನದ ಅನ್ವೇಷಣೆ ನಡೆಯುತ್ತಿದೆ..!"
        });

        //Show the loading indicator
        loader.present();

        this.vachanasAPI.getVachanas(new Date()).then(
            data => {

                //Hide the loading indicator
                loader.dismiss();

                //Now, populate the array with data from the API
                if (data && data._id !== undefined) {

                    //set the value to be used in html
                    this.vachanaOftheDay = new VachanaVM(data._id, data.Vachana, data.Author, data.Contributor, data.Summary);
                    //set the value to be used in other pages
                    this.todaysVachana.setTodaysVachana(this.vachanaOftheDay);

                } else {

                    //This really should never happen
                    this.vachanasAPI.LogMessage(
                        {
                            level: 'warn',
                            source: 'Mobile App Home : getVachanas',
                            message: 'Error retrieving Vachanas data: Data object is empty',
                            data: { Date: new Date() }

                        }).then(

                        data => { },
                        error => { }

                        );

                    this.showAlert("ದಯವಿಟ್ಟು ಕ್ಷಮಿಸಿ, ಈ ದಿನದ ವಚನ ನಿಮ್ಮ ಮನಸ್ಸಿನಲ್ಲಿದೆ!");
                }
            },
            error => {

                //Hide the loading indicator
                loader.dismiss();

                this.vachanasAPI.LogMessage(
                    {
                        level: 'error',
                        source: 'Mobile App Home : getVachanas',
                        message: 'Error retrieving Vachanas',
                        data: { Error: error }

                    }).then(

                    data => { },
                    error => { }
                    );

                this.showAlert("ದಯವಿಟ್ಟು ಕ್ಷಮಿಸಿ, ಅಡಚಣೆಗಾಗಿ ವಿಷಾದಿಸುತ್ತೇವೆ!");
            }
        );
    }

    showAlert(message: string) {

        let alert = this.alertController.create({
            //title: 'Error',
            //subTitle: 'Source: Weather Service',
            message: message,
            buttons: [{ text: 'ಧನ್ಯವಾದ' }]
        });

        alert.present();
    }

    getFormattedDate(today: Date) {

        //var week = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
        var week = new Array('ರವಿವಾರ', 'ಸೋಮವಾರ', 'ಮಂಗಳವಾರ', 'ಬುಧುವಾರ', 'ಗುರುವಾರ', 'ಶುಕ್ರವಾರ', 'ಶನಿವಾರ');
        var day = week[today.getDay()];
        let dd = today.getDate();
        let mm: number = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        var hour = today.getHours();
        let minu: number = today.getMinutes();

        var dd1, mm1, minu1: string;

        if (dd < 10) { dd1 = '0' + dd }
        if (mm < 10) { mm1 = '0' + mm }
        if (minu < 10) { minu1 = '0' + minu }

        this.day = day;
        this.date = dd + '/' + mm + '/' + yyyy;

        //return day + '      ' + dd1 + '/' + mm1 + '/' + yyyy;// + ' ' + hour + ':' + minu1;
    }

}