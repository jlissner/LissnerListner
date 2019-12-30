module.exports = {
  getCookie: jest.fn().mockImplementation(() => 'cookie'),
  setCookie: jest.fn(),
  deleteCookie: jest.fn(),
}