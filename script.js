
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let mode = "encode";

const input = document.getElementById("input");
const output = document.getElementById("output");

const encodeTab = document.getElementById("encodeTab");
const decodeTab = document.getElementById("decodeTab");

const inputLabel = document.getElementById("inputLabel");

const translateBtn = document.getElementById("translateBtn");
const copyBtn = document.getElementById("copyBtn");
const clearBtn = document.getElementById("clearBtn");

// ENGLISH TO TOWSEE CODE

function encode(text) {

    return text.toUpperCase().split("").map(char => {

        const index = alphabet.indexOf(char);

        if (index !== -1) {
            return (index + 1) + ".";
        }

        return char;

    }).join("");
}

// TOWSEE CODE TO ENGLISH

function decode(text) {

    if (!text.trim()) return "";

    return text.trim().split(/\s+/).map(word => {

        const numbers = word.replace(/\.$/, "").split(".");

        return numbers.map(number => {

            if (!/^\d+$/.test(number)) return "?";

            const n = Number(number);

            if (n < 1 || n > 26) return "?";

            return alphabet[n - 1];

        }).join("");

    }).join(" ");
}

// TRANSLATION BUTTON

translateBtn.addEventListener("click", () => {

    const text = input.value;

    if (!text.trim()) {
        output.textContent = "Please enter some text first!";
        return;
    }

    const result = mode === "encode"
        ? encode(text)
        : decode(text);

    output.textContent = result;

});

// MODE SWITCHING

encodeTab.addEventListener("click", () => {

    mode = "encode";

    encodeTab.classList.add("active");
    decodeTab.classList.remove("active");

    inputLabel.textContent = "ENTER ENGLISH TEXT";
    input.placeholder = "Example: I LOVE YOU";

    output.textContent = "Your translation will appear here...";

});

decodeTab.addEventListener("click", () => {

    mode = "decode";

    decodeTab.classList.add("active");
    encodeTab.classList.remove("active");

    inputLabel.textContent = "ENTER TOWSEE CODE";
    input.placeholder = "Example: 9. 12.15.22.5.";

    output.textContent = "Your translation will appear here...";

});

// COPY BUTTON

copyBtn.addEventListener("click", async () => {

    const result = output.textContent;

    if (
        !result ||
        result === "Your translation will appear here..." ||
        result === "Please enter some text first!"
    ) return;

    try {
        await navigator.clipboard.writeText(result);
        alert("Translation copied!");
    } catch {
        alert("Copy failed!");
    }

});

// CLEAR BUTTON

clearBtn.addEventListener("click", () => {

    input.value = "";

    output.textContent = "Your translation will appear here...";

});
