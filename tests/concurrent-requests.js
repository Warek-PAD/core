const url = process.argv[2] ?? "http://localhost:3000";
const parallelCount = parseInt(process.argv[3] ?? "3");

async function main() {
  const promises = [];

  for (let i = 0; i < parallelCount; i++) {
    const promise = fetch(url).then(async (res) =>
      console.log(i, res.status, res.statusText, await res.json?.()),
    );

    promises.push(promise);
    console.log(`${i} requests made`)
  }

  await Promise.allSettled(promises);

  console.log("All requests finished");
}

main();
