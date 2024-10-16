import * as http from "http";
import * as jdenticon from "jdenticon";

function main() {
    const portStr = process.env["JDENTICON_SERVER_PORT"] || "16043";
    const port = Number.parseInt(portStr);

    const server = http.createServer(async (req, res) => {
        // Only handle POST requests
        if (req.method === "POST") {
            let body = "";

            // Collect the request data
            req.on("data", chunk => {
                body += chunk.toString();
            });

            // Process the request once data is fully received
            req.on("end", () => {
                try {
                    const { value, size, type } = JSON.parse(body);

                    // Validate the request body parameters
                    if (!value || !size || !type) {
                        res.statusCode = 400;
                        res.setHeader("Content-Type", "application/json");
                        res.end(JSON.stringify({ error: "Invalid request body: missing value, size, or type" }));
                        return;
                    }

                    // Generate the icon based on the file type
                    let icon;
                    switch (type.toLowerCase()) {
                        case "png":
                            icon = jdenticon.toPng(value, size);
                            res.setHeader("Content-Type", "image/png");
                            break;
                        case "svg":
                            icon = Buffer.from(jdenticon.toSvg(value, size), "utf-8");
                            res.setHeader("Content-Type", "image/svg+xml");
                            break;
                        default:
                            res.statusCode = 400;
                            res.setHeader("Content-Type", "application/json");
                            res.end(JSON.stringify({ error: "Unsupported file type" }));
                            return;
                    }

                    // Return the generated icon
                    res.statusCode = 200;
                    res.end(icon);
                } catch (error) {
                    res.statusCode = 500;
                    res.setHeader("Content-Type", "application/json");
                    res.end(JSON.stringify({ error: "Error processing request", details: error.message }));
                }
            });
        } else {
            res.statusCode = 405;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Method not allowed" }));
        }
    });

    server.listen(port, () => {
        console.log(`Jdenticon server is running on http://localhost:${port}`);
    });
}

// Start the server
main();
