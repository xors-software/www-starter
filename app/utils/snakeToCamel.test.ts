import { snakeToCamel } from './snakeToCamel'

describe('snakeToCamel', () => {
  it('should convert snake_case object keys to camelCase', () => {
    const input = {
      first_name: 'John',
      last_name: 'Doe',
      age: 30,
    }
    const expectedOutput = {
      firstName: 'John',
      lastName: 'Doe',
      age: 30,
    }
    expect(snakeToCamel(input)).toEqual(expectedOutput)
  })

  it('should convert snake_case array keys to camelCase', () => {
    const input = [{ snake_case_key: 'value1' }, { another_snake_case_key: 'value2' }]
    const expectedOutput = [{ snakeCaseKey: 'value1' }, { anotherSnakeCaseKey: 'value2' }]
    expect(snakeToCamel(input)).toEqual(expectedOutput)
  })

  it('should convert snake_case nested object keys to camelCase', () => {
    const input = {
      user_info: {
        first_name: 'John',
        last_name: 'Doe',
        age: 30,
      },
      address: {
        street_name: '123 Main St',
        city: 'New York',
        state: 'NY',
      },
    }
    const expectedOutput = {
      userInfo: {
        firstName: 'John',
        lastName: 'Doe',
        age: 30,
      },
      address: {
        streetName: '123 Main St',
        city: 'New York',
        state: 'NY',
      },
    }
    expect(snakeToCamel(input)).toEqual(expectedOutput)
  })

  it('should convert snake_case nested object keys to camelCase three levels deep', () => {
    const input = {
      level1: {
        level2: {
          level3: {
            snake_case_key: 'value',
          },
        },
      },
    }
    const expectedOutput = {
      level1: {
        level2: {
          level3: {
            snakeCaseKey: 'value',
          },
        },
      },
    }
    expect(snakeToCamel(input)).toEqual(expectedOutput)
  })

  it('should convert snake_case nested object keys to camelCase in an array of objects', () => {
    const input = [
      {
        snake_case_key: 'value1',
        nested_object: {
          another_snake_case_key: 'value2',
        },
      },
      {
        third_snake_case_key: 'value3',
        nested_object: {
          fourth_snake_case_key: 'value4',
        },
      },
    ]
    const expectedOutput = [
      {
        snakeCaseKey: 'value1',
        nestedObject: {
          anotherSnakeCaseKey: 'value2',
        },
      },
      {
        thirdSnakeCaseKey: 'value3',
        nestedObject: {
          fourthSnakeCaseKey: 'value4',
        },
      },
    ]
    expect(snakeToCamel(input)).toEqual(expectedOutput)
  })

  it('should convert snake_case object keys with dates to camelCase', () => {
    const input = {
      created_at: new Date('2022-01-01'),
      updated_at: new Date('2022-01-02'),
    }
    const expectedOutput = {
      createdAt: new Date('2022-01-01'),
      updatedAt: new Date('2022-01-02'),
    }
    expect(snakeToCamel(input)).toEqual(expectedOutput)
  })
})
