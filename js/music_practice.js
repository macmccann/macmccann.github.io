const notes = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "G#", "A", "Bb", "B"];
const stringRanges = ["Top", "Bottom"];
const fretRanges = [
  "0-3",
  "1-4",
  "2-5",
  "3-6",
  "4-7",
  "5-8",
  "6-9",
  "7-10",
  "8-11",
  "9-12",
];

const majorScaleCheckbox = document.getElementById("majorScale");
const minorScaleCheckbox = document.getElementById("minorScale");
const majorPentatonicScaleCheckbox = document.getElementById("majorPentatonic");
const minorPentatonicScaleCheckbox = document.getElementById("minorPentatonic");
const majorChordCheckbox = document.getElementById("majorChord");
const minorChordCheckbox = document.getElementById("minorChord");
const stringRangesCheckbox = document.getElementById("stringRanges");
const fretRangesCheckbox = document.getElementById("fretRanges");
const autoCheckbox = document.getElementById("auto");
const bpmInput = document.getElementById("bpm");

const generateNew = () => {
  const note = notes[Math.floor(Math.random() * notes.length)];
  const validTypes = [
    majorScaleCheckbox.checked ? "Major scale" : null,
    minorScaleCheckbox.checked ? "Minor scale" : null,
    majorPentatonicScaleCheckbox.checked ? "Major pentatonic" : null,
    minorPentatonicScaleCheckbox.checked ? "Minor pentatonic" : null,
    majorChordCheckbox.checked ? "Major chord" : null,
    minorChordCheckbox.checked ? "Minor chord" : null,
  ].filter((type) => type !== null);
  console.log(validTypes);
  const type = validTypes[Math.floor(Math.random() * validTypes.length)];
  const stringRange = stringRangesCheckbox.checked
    ? stringRanges[Math.floor(Math.random() * stringRanges.length)]
    : null;
  const fretRange = fretRangesCheckbox.checked
    ? fretRanges[Math.floor(Math.random() * fretRanges.length)]
    : null;
  return { note, type, stringRange, fretRange };
};

document.getElementById("note").addEventListener("click", () => {
  const { note, type, stringRange, fretRange } = generateNew();
  document.getElementById("note").innerText = note;
  document.getElementById("notes-type").innerText = type == null ? "" : type;
  document.getElementById("string-range").innerText =
    stringRange == null ? "" : `String range: ${stringRange}`;
  document.getElementById("fret-range").innerText =
    fretRange == null ? "" : `Fret range: ${fretRange}`;
});

let intervalId = null;

document.getElementById("auto").addEventListener("click", () => {
  if (intervalId != null) {
    clearInterval(intervalId);
    intervalId = null;
  }
  if (autoCheckbox.checked) {
    const bpm = bpmInput.value;
    const interval = 60000 / bpm;
    intervalId = setInterval(() => {
      const { note, type, stringRange, fretRange } = generateNew();
      document.getElementById("note").innerText = note;
      document.getElementById("notes-type").innerText =
        type == null ? "" : type;
      document.getElementById("string-range").innerText =
        stringRange == null ? "" : `String range: ${stringRange}`;
      document.getElementById("fret-range").innerText =
        fretRange == null ? "" : `Fret range: ${fretRange}`;
    }, interval);
    document.getElementById("auto").addEventListener("click", () => {
      clearInterval(intervalId);
    });
  }
});

document.getElementById("bpm").addEventListener("input", () => {
  if (intervalId != null) {
    clearInterval(intervalId);
    intervalId = null;
  }
  if (autoCheckbox.checked) {
    const bpm = bpmInput.value;
    console.log(bpm);
    const interval = 60000 / bpm;
    intervalId = setInterval(() => {
      const { note, type, stringRange, fretRange } = generateNew();
      document.getElementById("note").innerText = note;
      document.getElementById("notes-type").innerText =
        type == null ? "" : type;
      document.getElementById("string-range").innerText =
        stringRange == null ? "" : `String range: ${stringRange}`;
      document.getElementById("fret-range").innerText =
        fretRange == null ? "" : `Fret range: ${fretRange}`;
    }, interval);
    document.getElementById("auto").addEventListener("click", () => {
      clearInterval(intervalId);
    });
  }
});
