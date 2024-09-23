const url = process.argv[2] ?? "http://localhost:3000/rate-limit";
const requestsCount = parseInt(process.argv[3] ?? 100);
const time = parseInt(process.argv[4] ?? 60_000);

const sleep = (delay) => new Promise((res) => setTimeout(res, delay));

async function main() {
  const delay = time / requestsCount;

  for (let i = 0; i < requestsCount; i++) {
    console.log(`Did ${i} requests`);

    const res = await fetch(url);
    const start = Date.now();

    if (!res.ok) {
      console.log(res.status, res.statusText, await res.text());
      break;
    }
    const elapsed = Date.now() - start;
    await sleep(Math.max(delay - elapsed, 0));
    console.clear();
  }

  console.log("Done");
}

main();
