module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    // Caso queira testar com ECMAScript modules, configure aqui
    // moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
  };
  