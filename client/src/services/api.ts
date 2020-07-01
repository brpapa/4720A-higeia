import axios from 'axios'

// depois de logado, essa instancia do axios é alterada (recebe o headers Authorization com username:password em base64)
export default axios.create({
  baseURL: 'http://localhost:3030',
})

