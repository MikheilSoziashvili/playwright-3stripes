/**
 * Kafka Fixtures 
 * Usage - import in test spec.js file
 */
const base = require('@playwright/test')

const { Kafka, logLevel} = require('kafkajs')

const { KafkaContainer, GenericContainer, Network } = require("testcontainers");

/** Harbor images - to spin up containers  */
const DOCKER_PRIVATE_REGISTRY = "registry.tools.3stripes.net/dockerhub-mirror"

const ZOOKEEPER_IMAGE_HARBOR = "confluentinc/cp-zookeeper:6.1.1"

const KAFKA_IMAGE_HARBOR = "confluentinc/cp-kafka:6.1.1"

exports.test = base.test.extend({

    /** Creating kafkaContainer Fixture */
    
    kafkaContainer: async({ }, use, testInfo) => {

        if((testInfo.title).match(/Using custom zoo-keeper/)){
            
            console.log("Connecting using custom zoo-keeper and network")

            const network = await new Network().start();
            let zooKeeperHost = "zookeeper";
            let zooKeeperPort = 2181;

            const zookeeperContainer = await new GenericContainer(`${DOCKER_PRIVATE_REGISTRY}/${ZOOKEEPER_IMAGE_HARBOR}`)
                .withNetwork(network)
                .withNetworkAliases(zooKeeperHost)
                .withEnvironment({ ZOOKEEPER_CLIENT_PORT: zooKeeperPort.toString() })
                .withExposedPorts(zooKeeperPort)
                .start();

            const kafkaContainer = await new KafkaContainer()
                .withNetwork(network)
                .withZooKeeper(zooKeeperHost, zooKeeperPort)
                .withExposedPorts(9093)
                .start();
            
            await use(kafkaContainer);

            await zookeeperContainer.stop();
            await kafkaContainer.stop();
            await network.stop();
        }

        else if ((testInfo.title).match(/Using custom Kafka Image and built in zookeeper/)){

            console.log("Connecting using custom Kafka Image and built in zookeeper")

            const kafkaContainer = await new KafkaContainer(`${DOCKER_PRIVATE_REGISTRY}/${KAFKA_IMAGE_HARBOR}`).withExposedPorts(9093).start();
            
            await use(kafkaContainer);

            await kafkaContainer.stop();
            
        }
        else if ((testInfo.title).match(/Using built-in zoo-keeper and custom network/)){
            
            console.log("Connecting using built-in zoo-keeper and custom network")

            const network = await new Network().start();
            const kafkaContainer = await new KafkaContainer().withNetwork(network).withExposedPorts(9093).start();
            
            await use(kafkaContainer);

            await kafkaContainer.stop();
            await network.stop();
        }
        else{
            console.log("Default - Using custom zoo-keeper")
            const network = await new Network().start();
            let zooKeeperHost = "zookeeper";
            let zooKeeperPort = 2181;

            const zookeeperContainer = await new GenericContainer(`${DOCKER_PRIVATE_REGISTRY}/${ZOOKEEPER_IMAGE_HARBOR}`)
                .withNetwork(network)
                .withNetworkAliases(zooKeeperHost)
                .withEnvironment({ ZOOKEEPER_CLIENT_PORT: zooKeeperPort.toString() })
                .withExposedPorts(zooKeeperPort)
                .start();

            const kafkaContainer = await new KafkaContainer()
                .withNetwork(network)
                .withZooKeeper(zooKeeperHost, zooKeeperPort)
                .withExposedPorts(9093)
                .start();
            
            await use(kafkaContainer);

            await zookeeperContainer.stop();
            await kafkaContainer.stop();
            await network.stop();
        }  
    },


    /** Using {kafkaContainer} fixture created above to create kafka fixture */
    kafka: async({ kafkaContainer }, use) => {

        const kafka = new Kafka({
            logLevel: logLevel.NOTHING,
            // logLevel: logLevel.ERROR,
            brokers: [`${kafkaContainer.getHost()}:${kafkaContainer.getMappedPort(9093)}`],
        })

        await use(kafka); 

        //await kafka.stop();

    },

})

exports.expect = base.expect;
