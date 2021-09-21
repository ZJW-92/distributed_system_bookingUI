import {MQTT} from './mqtt';
import {variables} from "@/config/variables";
import DentistController from "@/services/dentistController";
import AvailabilityController from '@/services/availabilityController';
import BookingController from "@/services/bookingController";

export default class BrokerListener {
    constructor() {
    }
    listenForMessage() {
        let availabilityController = new AvailabilityController();
        let bookingController = new BookingController()
        MQTT.on('message', function (topic, message) {
            if (topic === variables.DENTIST_TOPIC) {
                const dentistController = new DentistController();
                dentistController.processMessage(message);
            }
            if (topic === variables.AVAILABILITY_TOPIC + "/" + availabilityController.getCurrentClinicID()) {
                availabilityController.addAvailability(message);
            }
            if (topic === variables.RESPONSE_TOPIC + "/" + bookingController.getUserId()) {
                bookingController.checkResponse(message)
            }
            if(topic === variables.AVAILABILITY_PERCENTAGE_TOPIC + "/" + availabilityController.getCurrentDate()) {
                availabilityController.addAvailabilityDate(message);
            }
        })
    }

}

