module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
        'jest-transform-stub',
    '^.+\\.(js|jsx)?$': '<rootDir>/node_modules/babel-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  snapshotSerializers: ['jest-serializer-vue'],
  setupFilesAfterEnv: ["<rootDir>/tests/unit/index.js"],
  transformIgnorePatterns: ["/node_modules/(?!(leaflet)/)"],
  "collectCoverage": true,
  "collectCoverageFrom": ['src/**/*.{js,vue}', "!**/node_modules/**"]
};

