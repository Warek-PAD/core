const url = process.argv[2] ?? "http://localhost:3000/rate-limit";
const requestsCount = parseInt(process.argv[3] ?? 100);
const time = parseInt(process.argv[4] ?? 60_000);

const sleep = (delay) => new Promise((res) => setTimeout(res, delay));

async function main() {
  const delay = time / requestsCount;
  let successCount = 0;
  let failCount = 0;
  const startTimestamp = Date.now();

  for (let i = 0; i < requestsCount; i++) {
    const requestStartTimestamp = Date.now();
    const res = await fetch(url);
    const requestEndTimestamp = Date.now()

    if (i % 10 === 0) {
      console.clear();
      console.log(`${i} requests complete`)
    }

    if (!res.ok) {
      console.error(res.status, res.statusText, await res.text());
      failCount++;
      break;
    }

    successCount++;
    const elapsed = requestEndTimestamp - requestStartTimestamp;

    if (delay - elapsed > 0) {
      await sleep(delay - elapsed);
    }
  }

  console.log(`Done in ${(Date.now() - startTimestamp) / 1000} seconds`);
  console.log(`Success: ${successCount}`);
  console.log(`Fail: ${failCount}`);
}

main();
