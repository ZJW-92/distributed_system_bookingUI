import Subscriber from "@/services/subscriber";
import BrokerListener from "@/services/brokerListener";
import {variables} from "@/config/variables";

export default class BrokerConnector {
    constructor() {
    }
    establishConnection() {
        const subscriber = new Subscriber();
        const brokerListener = new BrokerListener();
        subscriber.connectToBroker();
        subscriber.subscribeToTopic(variables.DENTIST_TOPIC);
        brokerListener.listenForMessage();
    }

}