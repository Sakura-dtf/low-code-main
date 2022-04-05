import Mock from "mockjs";

Mock.mock("http://localhost:8080/getData", "post", (config) => {
    console.log(config);
    return [
        {
            prop1: "1",
        }
    ];
})
