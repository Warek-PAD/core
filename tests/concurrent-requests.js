const url = process.argv[2] ?? "http://localhost:3000";
const count = parseInt(process.argv[3] ?? "3");

async function main() {
  const promises = [];
  const testsStart = Date.now();
  let successCount = 0;
  let failCount = 0;

  console.log(`Running ${count} requests in parallel ...`)
  for (let i = 0; i < count; i++) {
    const promise = fetch(url)
      .then(() => successCount++)
      .catch(() => failCount++);

    promises.push(promise);
  }

  await Promise.allSettled(promises);
  const testsEnd = Date.now();

  console.log(
    `All requests finished in ${(testsEnd - testsStart) / 1000} seconds`,
  );
  console.log(`Success: ${successCount}`)
  console.log(`Fail: ${failCount}`)
}

main();
