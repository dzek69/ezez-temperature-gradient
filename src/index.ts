/* eslint-disable @typescript-eslint/no-magic-numbers */

// TODO add some jsdoc

const hexToRgb = (hex: string) => {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return { r, g, b };
};

const HEX = 16;

const rgbToHex = (r: number, g: number, b: number): `#${string}` => {
    const rHex = r.toString(HEX).padStart(2, "0");
    const gHex = g.toString(HEX).padStart(2, "0");
    const bHex = b.toString(HEX).padStart(2, "0");
    return `#${rHex}${gHex}${bHex}`;
};

type Colors = { value: number; color: `#${string}` }[];

/**
 * Returns a hex color based on the value and the provided colors.
 * @param colors
 * @param value
 */
const getColor = (colors: Colors, value: number) => { // eslint-disable-line max-statements
    if (colors.length === 0) {
        throw new TypeError("Colors array is empty");
    }

    if (colors.length === 1) {
        return colors[0]!.color;
    }

    if (value <= colors[0]!.value) {
        return colors[0]!.color;
    }

    if (value >= colors.at(-1)!.value) {
        return colors.at(-1)!.color;
    }

    const exactMatch = colors.find(color => color.value === value);
    if (exactMatch) {
        return exactMatch.color;
    }

    const lowerColorIdx = colors.findIndex((color, index) => {
        return value >= color.value && value < colors[index + 1]!.value;
    });

    const higherColorIdx = lowerColorIdx + 1;
    const lowerColor = colors[lowerColorIdx]!;
    const higherColor = colors[higherColorIdx]!;

    const distance = higherColor.value - lowerColor.value;
    const progress = (value - lowerColor.value) / distance;

    const lowerColorRGB = hexToRgb(lowerColor.color);
    const higherColorRGB = hexToRgb(higherColor.color);

    return rgbToHex(
        Math.round(((higherColorRGB.r - lowerColorRGB.r) * progress) + lowerColorRGB.r),
        Math.round(((higherColorRGB.g - lowerColorRGB.g) * progress) + lowerColorRGB.g),
        Math.round(((higherColorRGB.b - lowerColorRGB.b) * progress) + lowerColorRGB.b),
    );
};

const round = (num: number, precision = 0) => {
    const factor = 10 ** precision;
    return Math.round(num * factor) / factor;
};

/**
 * Returns a CSS gradient based on the from-to values and the provided colors.
 * @param colors
 * @param from
 * @param to
 */
const getCSSGradient = (colors: Colors, from: number, to: number) => {
    const fromIndex = colors.findLastIndex(color => color.value <= from);
    const toIndex = colors.findIndex(color => color.value >= to) - 1;

    const filteredColors = colors.slice(fromIndex, toIndex + 1);

    if (filteredColors.length === 0) {
        throw new TypeError("No colors in the range");
    }
    if (filteredColors[0]!.value !== from) {
        filteredColors.unshift({ value: from, color: getColor(colors, from) });
    }
    if (filteredColors.at(-1)!.value !== to) {
        filteredColors.push({ value: to, color: getColor(colors, to) });
    }

    const firstValue = filteredColors[0]!.value;
    const lastValue = filteredColors.at(-1)!.value;
    const gradient = filteredColors.map(color => {
        const distance = lastValue - firstValue;
        const progressPerc = ((color.value - firstValue) / distance) * 100;
        if (progressPerc < 0) {
            return "";
        }

        return `${color.color} ${round(progressPerc, 2)}%`;
    }).filter(Boolean).join(", ");

    return `linear-gradient(to right, ${gradient})`;
};

const recommendedTemperatureColors: Colors = [
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

export {
    getColor,
    getCSSGradient,
    recommendedTemperatureColors,
};

export type {
    Colors,
};
