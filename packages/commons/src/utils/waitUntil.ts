import { delay } from "./delay";

type WaitUntilConfig = {
  interval: number;
  timeout: number;
  initialDelay?: number;
  throwTimeout?: boolean;
  retryOnError?: boolean;
};

export async function waitUntil<T>(
  callback: () => Promise<T>,
  config: WaitUntilConfig = {
    interval: 500,
    timeout: 5000,
  }
): Promise<T | null> {
  if (config.initialDelay) {
    await delay(config.initialDelay);
  }

  const startTime = Date.now();

  while (Date.now() - startTime < config.timeout) {
    await delay(config.interval);

    try {
      return await callback();
    } catch (err) {
      if (!config.retryOnError) {
        throw err;
      }
    }
  }

  if (config.throwTimeout) {
    throw new Error("Timeout reached");
  }

  return null;
}
