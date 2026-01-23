const axios = jest.fn();

axios.create = () => axios;
axios.get = jest.fn();
axios.post = jest.fn();
axios.put = jest.fn();
axios.delete = jest.fn();
axios.patch = jest.fn();

module.exports = axios;
module.exports.default = axios;
