const mqtt = require('mqtt');
import {variables} from "@/config/variables";


export const MQTT = mqtt.connect(variables.URL);