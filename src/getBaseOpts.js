export default (options = {}) => ({
  persistHeaders: true,
  parseResponse: ({ data }) => data.data,
  ...options,
})
