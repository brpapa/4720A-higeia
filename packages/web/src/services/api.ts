import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3030',
})

// HTTP Basic Auth
// adiciona o header Authorization com username:password em base64
function addAuthHeader(username: string, password: string) {
  instance.defaults.auth = { username, password }
}

export default instance
export { addAuthHeader }
