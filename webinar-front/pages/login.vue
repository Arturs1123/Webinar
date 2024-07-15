<template>
  <div class="login-page">
    <Header/>
    <div class="login-container" >
      <h2 class="login-title" >Авторизация</h2>
      <div class="form-row">
        <label class="form-label" for="">Логин:</label>
        <input class="form-input" v-model="login" type="text" @keyup.enter="auth">
      </div>
      <div class="form-row">
        <label class="form-label" for="">Пароль:</label>
        <input class="form-input" v-model="pass" type="password" @keyup.enter="auth">
      </div>
      <button class="btn-login" @click="auth">
        Войти
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "login",
  data() {
    return {
      login: "",
      pass: ""
    }
  },
  async mounted() {
    try {
      const token = localStorage.getItem('token')
      console.log(token)
      if (token) {
        const res = await this.$axios.$post(
          `/auth/check-user-token`
          ,{
            token: token
          })
          if (res && res.id) {
            localStorage.setItem('userId', res.id)
            localStorage.setItem('login', res.login)
            localStorage.setItem('name', res.name)

            await this.$router.push('/webinar-autowebinar')
          }
      }
    } catch(err) {
      console.log(err)
    }
  },
  methods: {
    async auth() {
      try {
        const data = await this.$axios.$post(
          `/auth/login`
          ,{
            login: this.login,
            password: this.pass,
        })
        if (data && data?.token) {
          localStorage.setItem('token', data.token)
          const userData = await this.$axios.$post(
            `/auth/check-user-token`,
            {
              token: data.token,
            }
          )
          if (userData && userData.id) {
            localStorage.setItem('userId', userData.id)
            localStorage.setItem('login', this.login)
            localStorage.setItem('name', userData.name)

            await this.$router.push('/webinar-autowebinar')
          }
        }
      } catch(err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>
.login-page {
  background: rgb(237, 238, 240); 
  min-height: 100vh;
}

.login-container {
  margin-top: 40px; 
  width: 40%; 
  margin-left: 50%; 
  transform: translate(-50%, 0);
  align-items: center;
  background: #FFFFFF;
  border-radius: 10px;
  padding: 50px 40px 30px 40px;
}

.login-title {
  text-align: center;
  font-size: 32px;
  color: #1d1d1d;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  line-height: 27px;
  margin-bottom: 40px;
}

.header-profile-icon {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.form-label {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: #000000;
  float: left;
  margin-top: 25px;
}

.form-input {
  width: 100%;
  height: 43px;
  border: 1px solid #A8ADB8;
  border-radius: 10px;
  margin-top: 15px;
  padding: 10px 10px;
}

.btn-login {
  margin-left: 50%; 
  transform: translate(-50%, 0);
  margin-top: 20px;
  padding: 10px 90px;
  border-radius: 5px;
  color: white;
  background-color: #FE6637;
}

@media (max-width: 1500px) {
  .login-container {
    margin-top: 30px; 
    width: 50%; 
    margin-left: 50%; 
    transform: translate(-50%, 0);
    padding: 40px 30px 20px 30px;
  }
}

@media screen and (max-width: 769px) {
  .login-container {
    margin-top: 30px; 
    width: 50%; 
    margin-left: 50%; 
    transform: translate(-50%, 0);
    padding: 40px 30px 20px 30px;
  }

  .login-title {
    margin-bottom: 10px;
  }

  .form-label {
    margin-top: 15px;
    text-align: left;
    font-size: 16px;
  }
}

@media screen and (max-width: 600px) {
  .login-container {
    margin-top: 30px; 
    width: 70%; 
    padding: 20px;
  }

  .login-title {
    margin-bottom: 10px;
    font-size: 25px;
  }

  .btn-login {
    margin-top: 20px;
    padding: 10px 70px;
    border-radius: 5px;
    color: white;
    background-color: #FE6637;
  }
}

@media screen and (max-width: 350px) {
  .btn-login {
    margin-top: 20px;
    padding: 10px 70px;
    border-radius: 5px;
    color: white;
    background-color: #FE6637;
  }
}
</style>
