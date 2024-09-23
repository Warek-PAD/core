// Sends a very slow POST request to the specified url, intended for testing 408 request timeout

const url = process.argv[2] ?? "http://localhost:3000";
const delay = parseInt(process.argv[3] ?? "200");

const http = require("http");

async function main() {
  const req = http.request(
    url,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Transfer-Encoding": "chunked",
      },
    },
    (res) => {
      console.log(`STATUS: ${res.statusCode}`);
      res.setEncoding("utf8");

      res.on("data", (chunk) => console.log(`BODY: ${chunk}`));
      res.on("end", () => {
        console.log("No more data in response.");
        process.exit();
      });
    },
  );

  req.on("error", (e) => {
    console.error(`Problem with request: ${e.message}`);
    process.exit();
  });

  const sendDataChunk = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        req.write(data);
        console.log(`Sent chunk: ${data}`);
        resolve();
      }, delay);
    });
  };

  const start = Date.now();
  const data = JSON.stringify({ data: "Hello, world!" });

  for (const c of data) {
    await sendDataChunk(c);
  }

  req.end();

  const elapsed = (Date.now() - start) / 1000;
  console.log(`Request took ${elapsed.toFixed(2)} seconds`);
}

main();
