import {MQTT} from './mqtt';

export default class Subscriber {
    constructor() {
    }
    connectToBroker() {
        MQTT.on('connect',  ()  => {
            console.log('Connected to Broker');
        })
    }

    subscribeToTopic(topic) {
        // console.log(topic)
        MQTT.subscribe(topic,  ()  => {
            console.log('Subscribed to ' + topic)
        })
    }
    topicUnSubscriber(topic) {
        MQTT.unsubscribe(topic, () => {
            console.log("Unsubscribed from " + topic)
        })
    }


}

