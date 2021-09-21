import {variables} from "@/config/variables";
const {MQTT} = require("./mqtt")

export default class Publisher {
    constructor() {
    }

    publishBookingRequest(request){
        MQTT.publish(variables.REQUEST_TOPIC, JSON.stringify(request), {qos:1});
    }
}
