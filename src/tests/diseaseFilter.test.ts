import { Case, Diagnosis, DiseaseFilter } from '../core/diseaseFilter';

describe('Disease filter', () => {
  it('filters cases when several diagnosis filters are applied together', () => {
    const expectedName1 = 'Chupito';
    const expectedName2 = 'Juliana';
    const cases = [createCase(1, expectedName1), createCase(2, expectedName2), createCase(3, 'irrelevant-name')];
    const searchCriteria1 = 'Vías respiratorias altas';
    const searchCriteria2 = 'Cerebro';
    const diagnoses = [
      createDiagnosis(1, searchCriteria1),
      createDiagnosis(2, searchCriteria2),
      createDiagnosis(3, 'irrelevant-location'),
    ];
    const diseaseFilter = DiseaseFilter.create(cases, diagnoses);
    diseaseFilter.addFilter(searchCriteria2);
    diseaseFilter.addFilter(searchCriteria1);

    const result = diseaseFilter.casesFiltered;

    expect(result.length).toBe(2);
    expect(result[1].patientName).toBe(expectedName1);
    expect(result[0].patientName).toBe(expectedName2);
  });
});

function createCase(diagnosisId: number, patientName: string): Case {
  return {
    id: 0,
    patientName: patientName,
    diagnosisId: diagnosisId,
    diagnosisName: 'irrelevant_diagnosisName',
    publicNotes: [],
    privateNotes: [],
  };
}

function createDiagnosis(id: number, location: string): Diagnosis {
  return {
    id: id,
    name: 'irrelevant-name',
    location: location,
    system: 'irrelevant-system',
    origin: 'irrelevant-origin',
    specie: 'irrelevant-specie',
  };
}
