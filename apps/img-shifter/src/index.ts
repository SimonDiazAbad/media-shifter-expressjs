import { MessageBrokerService, Queues } from "@media-shifter/commons";

import { ConsumeMessage } from "amqplib";

const resizeHandler = (msg: ConsumeMessage | null) => {
  if (msg) {
    const content = JSON.parse(msg.content.toString());
    console.log(`Received resize job: `);
    console.log({
      content,
    });
    // Add your resize handling logic here...
  }
};

async function startConsumer() {
  const messageBroker = MessageBrokerService.getInstance("amqp://rabbitmq");

  await messageBroker.connect();

  // Asserting Queues
  await messageBroker.assertQueue(Queues.IMAGE.RESIZE);
  await messageBroker.assertQueue(Queues.IMAGE.INVERT);
  await messageBroker.assertQueue(Queues.IMAGE.REMOVE_BACKGROUND);
  await messageBroker.assertQueue(Queues.IMAGE.UPSCALE);

  // Consuming Messages
  await messageBroker.consume(Queues.IMAGE.RESIZE, resizeHandler);
  await messageBroker.consume(Queues.IMAGE.INVERT, resizeHandler);
  await messageBroker.consume(Queues.IMAGE.REMOVE_BACKGROUND, resizeHandler);
  await messageBroker.consume(Queues.IMAGE.UPSCALE, resizeHandler);

  console.log("🟢 Consumers are set up and listening to queues");
}

startConsumer();

process.on("uncaughtException", (err) => {
  console.error("There was an uncaught error", err);
  process.exit(1); // mandatory (as per the Node.js docs)
});

process.on("SIGINT", async () => {
  console.log("🟡 Shutting down gracefully...");
  await MessageBrokerService.close();
  process.exit(0);
});
