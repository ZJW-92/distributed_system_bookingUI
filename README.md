## Introduction
Our teeth are one of our most precious tools. We often don’t appreciate them enough until we lose them, for instance due to bad dental care. Doing annual checks with a dentist is therefore recommended. For someone moving to Sweden, or within Sweden, it is not always easy to get a dentist appointment as many practices are working on full capacity already and will reject you as a new care-taker. As a consequence, as of today, you are required to do a manual search online, and additional time-taking calls with little chance of success
## Task
You will create a service that allows citizens of Gothenburg to book dentist appointments. Through a graphical user interface, a user shall be able to find available times in user-specified time-windows. Your solution will be based on a distributed system that combines various architectural styles. You will keep track of the availability of free time-slots for a number of fictive dentists (Dentist Repository, found ​here​) which you graphically signal to the user. A user is able to book appointments and receives a confirmation/rejection through the system. Find a conceptual overview of the system below. 

## Requirements 

●	A middleware based on the Message Queue Telemetry Transport (MQTT) protocol must be used. \
●	It must be clear that distributed communication takes place. \
●	Components communicating via middleware have no knowledge about the physical location of other components, and don’t depend on other components residing at a specific physical location. (Distribution Transparency) \
●	All members of the team shall understand all components; this is particularly important in the demonstrations and assessments. \
●	The toleration of failures will play a role in the final hand-in, and what exactly will be required will be part of the requirement updates later during the course. To be considered from the get-go: \
○	All components must be capable of appropriately handling standard failures, such as wrongly formatted data inputs or out of bounds inputs for the defined interfaces. \
○	Resource-handling shall be mindful, e.g. stopped components must unsubscribe from the MQTT broker fulfilling the contract (More on that in lecture 2).


## Set up

### Broker
- Install Mosquitto Ecliplse 
https://mosquitto.org/download/
- Configure the broker to accept websockets on port 1884.  
### Steps:
  run the following commands in macOS system:
  ```
  vim /usr/local/etc/mosquitto/mosquitto.conf
  ```
  then run``` cd /usr/local/sbin/``` 
  and ```  ./mosquitto -c ../etc/mosquitto/mosquitto.conf```
  and add the following lines to the mosquitto.conf file.
  ```
  port 1883
  listener 1884
  protocol websockets
  ```
  In addition add the following line to enable the authentication of client if broker doesn't connect
  ```
  allow_anonymous true
  ```
 
 ### Install dependency package and compile 

  ```
  npm install
  cd src
  npm run serve
  npm run build
  npm run lint
  ```
