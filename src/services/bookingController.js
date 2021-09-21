import store from "../store";
import bookingId from "@/services/bookingIdObtainer";
import Publisher from "@/services/publisher";
import Subscriber from "@/services/subscriber";
import {variables} from "@/config/variables";

export default class BookingController {
    constructor() {
    }
    checkResponse(message){
        const buffer = message.toString('utf-8');
        let responseObject = JSON.parse(buffer);
        let subscriber = new Subscriber();
        subscriber.topicUnSubscriber(variables.RESPONSE_TOPIC + '/'+ this.getUserId());
        if (responseObject.time){
            store.dispatch('booking/addBooking', responseObject);
        }else {
            store.dispatch('booking/addUnsuccessfulBooking', responseObject);
        }
    }
    async generateRequest(clinic, date, time, user){
        return await bookingId.generateId(user).then(userID => {
            return {
                "userid": userID._id,
                "requestid": userID.requestsIdCounter,
                "dentistid": clinic.id,
                "issuance": Date.now(),
                "time": date + " " + time.split(" ", 1) //split the timeslot string and only keep start time.
            };
        });
    }
    sendRequest(request){
        let publisher = new Publisher()
        let subscriber = new Subscriber()
        publisher.publishBookingRequest(request)
        subscriber.subscribeToTopic(variables.RESPONSE_TOPIC + '/' + request.userid);
    }
    getUserId() {
        return store.getters["booking/getBooking"].request.userid;
    }

}