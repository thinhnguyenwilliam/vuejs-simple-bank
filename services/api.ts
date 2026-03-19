import axios from 'axios'

const handleLogin = async () => {
  const res = await axios.post('http://localhost:8080/login', {
    email: email.value,
    password: password.value
  })
  console.log(res.data)
}