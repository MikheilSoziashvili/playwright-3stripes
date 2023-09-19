const { test } = require('../fixtures/kafkaFixtures');                                               /** Kafka Fixtures  */

const { expect } = require('@playwright/test');                                             /** Assertion Library */

const Chance = require("chance");                                                           /** Chance module for generating test data */

const chance = new Chance();


test.describe('Validate message sent by Producer is Consumed by the Consumer @TED-34459', () => {

    /** Zookeeper and Kafka setup Options - Implemented as fixtures in kafkaFixtures.js*/
    const KAFKA_SETUP = [
        'Using custom zoo-keeper',
        'Using custom Kafka Image and built in zookeeper',
        'Using built-in zoo-keeper and custom network'
    ]

    let producer, consumer;

    /** Using kafka fixture to create kafka producer and  consumer*/
    test.beforeEach( async ( { kafka } ) => {

        producer = kafka.producer();
        await producer.connect();
        
        consumer = kafka.consumer({ groupId: "test-group" });
        await consumer.connect();
    })


    for(const configuration of KAFKA_SETUP){
        test(`${configuration} - Simple kafka test with Consumer consuming single message at a time `, async({ kafka }) => {

            /** Test data - generating random animal values dynamically using chance module */
            const value = chance.animal();

            const topic = 'animals';

            /** Publishing messages to Kafka cluster */
            await producer.send({
                topic,
                messages: [{ value }],
            })

            await consumer.subscribe({ 
                topic, 
                fromBeginning: true
            });

            /** Consuming messages using eachMessage Handle 
             * consumes single message at a time
            */
            const consumedMessage = await new Promise((resolve) => {
                consumer.run({
                  eachMessage: async ({ message }) => resolve(message.value?.toString()),
                });
              });

            console.log(`Animal message value: ${value}, Consumed by consumer: ${consumedMessage} `)

            /** Validating the communication between producer and consumer */
            await expect(consumedMessage).toEqual(value);


        })

    }

    test.afterEach( async ( {  } ) => {
        console.log(`Stopping Producer and Consumer`)
        await consumer.disconnect();
        await producer.disconnect();
    })

    
})