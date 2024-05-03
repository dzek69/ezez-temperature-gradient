import must from "must";

import { getColor, getCSSGradient, recommendedTemperatureColors as myColors } from "./index";

// @TODO more tests

describe("getColor", () => {
    it("should return first color if value less than the range", () => {
        must(getColor(myColors, -40)).equal("#0046B9");
    });

    it("should return last color if value greater than the range", () => {
        must(getColor(myColors, 40)).equal("#FF4D00");
    });
});

describe("getCSSGradient", () => {
    it("must work with values from a single entry", () => {
        must(getCSSGradient(myColors, 21, 25)).equal("linear-gradient(to right, #ffed00 0%, #ffa600 100%)");
    });
});
