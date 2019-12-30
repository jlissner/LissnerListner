module.exports = jest.fn().mockImplementation(({
  body
}) => new Promise((res) => {
  setTimeout(() => {
    res({ data: 'default success' })
  }, 1000);
}))