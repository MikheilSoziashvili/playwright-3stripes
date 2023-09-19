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

    let producer, consumer, messages, topicName;

    test.beforeAll( async() => {
        
        const messageLength = 4

        /**  Test Data
         *   Dynamically generating message using chance node package 
         **/
        messages = Array(messageLength).fill().map((_, i) => {
            const value = chance.animal()
            return { key: `key-${i}`,value: `${value}`}
        })        

    })

    /** Using kafka fixture to create kafka producer and  consumer*/
    test.beforeEach( async ( { kafka } ) => {

        topicName = 'animals'                                                           /** Topic name */

        producer = kafka.producer();                                    

        consumer = kafka.consumer({ groupId: "test-group" });
        
        await Promise.all([producer.connect(), consumer.connect()])

        await consumer.subscribe({ topic: topicName, fromBeginning: true })
    })


    for(const configuration of KAFKA_SETUP){
        test(`${configuration} - Simple kafka test with Consumer consuming messages in Batch`, async({  }) => {

            const producedMessages = [];

            const messagesConsumed = [];

            /** Publishing messages to Kafka cluster */
            for (const each of messages) {
                producedMessages.push(each.value)
                await producer.send({ acks: -1, topic: topicName, messages: [each]})
            }

            
            /** Consuming messages using eachBatch Handle */
            const consumedMessage = await new Promise((resolve) => {        
                consumer.run({
                    eachBatchAutoResolve: true,
                    eachBatch: async ({
                        batch,
                        resolveOffset,
                        heartbeat,
                        commitOffsetsIfNecessary,
                        uncommittedOffsets,
                        isRunning,
                        isStale,
                    }) => {
                        for (let message of batch.messages) {

                            messagesConsumed.push(message.value.toString())
                
                            resolveOffset(message.offset)
                            await heartbeat()
                        }
                        resolve(messagesConsumed)
                    },
                })
            })

            console.log(`Produced message value: ${producedMessages}, Consumed message value: ${consumedMessage}`)
            
            /** Validating the communication between producer and consumer */
            await expect(consumedMessage.length).toBe(producedMessages.length)

            await expect(JSON.stringify(consumedMessage)).toBe(JSON.stringify(producedMessages))
        })
    }

    test.afterEach( async ( {  } ) => {
        console.log(`Stopping Producer and Consumer`)
        await producer.disconnect()
        await consumer.disconnect()
    })
})