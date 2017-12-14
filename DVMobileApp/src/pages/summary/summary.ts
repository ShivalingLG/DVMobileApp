import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController, Platform} from 'ionic-angular';
import { Geolocation, Keyboard } from 'ionic-native';
import { VachanasAPI, VachanaVM, TodaysVachana } from '../../providers/Vachanas';
//import { LocalNotifications } from 'ionic-native/local-notifications';

@Component({
    selector: 'page-summary',
    templateUrl: 'summary.html'
})


export class SummaryPage {

    vachanaOftheDay: VachanaVM;

    constructor(public navCtrl: NavController,
        public platform: Platform,
        public alertController: AlertController,
        public loadingCtrl: LoadingController,
        public vachanasAPI: VachanasAPI,
        public todaysVachana: TodaysVachana
        //private localNotifications: LocalNotifications
    ) {

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

        if (this.todaysVachana.getTodaysVachana() != null && this.todaysVachana.getTodaysVachana() != undefined
            && this.todaysVachana.getTodaysVachana().Id > 0) {

            this.vachanaOftheDay = this.todaysVachana.getTodaysVachana();

        } else {

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
                                source: 'Mobile App Summary : getVachanas',
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
                            source: 'Mobile App Summary : getVachanas',
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
}
