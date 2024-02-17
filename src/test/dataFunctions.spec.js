import {
  sortData,
  transformToCamelCase,
  filterData,
  // computeStats,
} from "../lib/dataFunctions.js";
import { data as fakeData } from "../test/data.js";

const namesPersonaAsc = [
  "Aventureiro Viajante",
  "Chef Criativo",
  "Enfermeira Amigável",
  "Historiador Curioso",
  "Poeta Inspirador",
];

describe("transformToCamelCase", () => {
  it("transforms kebab-case to camelCase", () => {
    const inputString = "some-example-string";
    const expectedResult = "someExampleString";
    const result = transformToCamelCase(inputString);
    expect(result).toEqual(expectedResult);
  });

  it("transforms another-example-string to anotherExampleString", () => {
    const inputString = "another-example-string";
    const expectedResult = "anotherExampleString";
    const result = transformToCamelCase(inputString);
    expect(result).toEqual(expectedResult);
  });
});

describe("sortData", () => {
  const sortBy = "name";
  const getNames = (personas) => personas.map((persona) => persona.name);

  it("Should return a list sorted in ascending order", () => {
    const sortedData = sortData(fakeData, sortBy, "asc");
    const sortedByName = getNames(sortedData);
    const expectedOrder = namesPersonaAsc;

    expect(sortedByName).toEqual(expectedOrder);
  });

  it("Should return a list sorted in descending order", () => {
    const sortedData = sortData(fakeData, sortBy, "desc");
    const sortedByName = getNames(sortedData);
    const expectedOrder = namesPersonaAsc.reverse();
    expect(sortedByName).toEqual(expectedOrder);
  });
});

describe("filterData", () => {
  const filterBy = "pais-nascimento-persona";
  const expectedValue = 3;
  const getPaisNascimentoPersonas = (personas) =>
    personas.map((persona) => persona.facts.paisNascimentoPersona);
  it("Should return a list filted", () => {
    const filtedData = filterData(fakeData, filterBy, "italia");
    const filteredByPaisNascimentoPersona =
      getPaisNascimentoPersonas(filtedData);
    const count = filteredByPaisNascimentoPersona.length;
    expect(count).toEqual(expectedValue);
  });
});

// describe("computeStats", () => {
//   const expectedValue = [
//     ["Theater", 1],
//     ["Novel", 3],
//     ["Movie", 1],
//   ];
//   const resultValues = computeStats(fakeData);
//   expect(resultValues).toEqual(expectedValue);
// });
