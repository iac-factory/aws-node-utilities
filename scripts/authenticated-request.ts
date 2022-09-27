( async () => {
    await import("dotenv/config");

    const JWT = await import("jsonwebtoken").then((module) => module.default);

    const endpoint = "http://0.0.0.0:8443/api/...";

    const signature = JWT.sign({}, process.env?.["SECRET"]!, {
        expiresIn: "10 minutes"
    }, (exception) => {
        if (exception) {
            console.group("Exception (JWT Signing)");
            console.error(exception);
            console.groupEnd();
        }
    });

    await fetch(endpoint, {
        method: "GET",
        headers: {
            "Authorization": [ "Bearer", signature ].join(" ")
        }, credentials: "omit",
        mode: "cors"
    }).catch(console.trace);
} )();
