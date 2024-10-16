import fs from "fs/promises";

async function getNum(filename) {
  return Number(await fs.readFile(filename, "utf8"), 10);
}

(async () => {
  try {
    const numberPromises = [1, 2, 3].map((i) => getNum(`${i}.txt`));
    const numbers = await Promise.all(numberPromises);

    console.log(numbers.at(0) + numbers.at(1) + numbers.at(2));
  } catch (err) {
    console.error("Something went wrong");
    console.error(err);
  }
})();
