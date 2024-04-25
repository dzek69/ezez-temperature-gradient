import must from "must";

import { getColor } from "./index";

const myColors = [
    {
        value: -30,
        color: "#0046B9",
    },
    {
        value: 0,
        color: "#00FFFF",
    },
    {
        value: 10,
        color: "#01cc01",
    },
    {
        value: 20,
        color: "#FFFF00",
    },
    {
        value: 30,
        color: "#FF4D00",
    },
];

// @TODO more tests

describe("getColor", () => {
    it("should return first color if value less than the range", () => {
        must(getColor(myColors, -40)).equal("#0046B9");
    });
});
