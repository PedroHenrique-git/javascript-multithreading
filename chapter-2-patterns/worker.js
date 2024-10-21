const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

function asyncOnMessageWrap(fn) {
  return async (msg) => {
    postMessage(await fn(msg.data));
  };
}

const commands = {
  async square_sum(max) {
    await sleep(Math.random() * 100);

    let sum = 0;

    for (let i = 0; i < max; i++) sum += Math.sqrt(i);

    return sum;
  },
  async fibonacci(limit) {
    await sleep(Math.random() * 100);

    let prev = 1n,
      next = 0n,
      swap;

    while (limit) {
      swap = prev;
      prev = prev + next;
      next = swap;
      limit--;
    }

    return String(next);
  },
};

self.onmessage = asyncOnMessageWrap(async (rpc) => {
  const { method, params, id } = rpc;

  if (commands.hasOwnProperty(method)) {
    const result = await commands[method](...params);

    return { result, id };
  }

  return {
    error: {
      code: -32601,
      message: `method ${method} not found`,
    },
    id,
  };
});
