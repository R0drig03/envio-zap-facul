<template>
  <v-container class="login-container" fluid>
    <v-row class="align-center justify-center">
      <v-col cols="12" md="6" lg="4">
        <v-card elevation="2">
          <v-card-title class="text-center">Faça seu Login</v-card-title>
          <v-card-text>
            <v-form ref="loginForm" v-model="valid">
              <v-text-field
                v-model="form.email"
                label="E-mail"
                type="email"
                :rules="emailRules"
                required
              ></v-text-field>
              <v-text-field
                v-model="form.password"
                label="Senha"
                type="password"
                :rules="passwordRules"
                required
              ></v-text-field>
              <v-btn
                :disabled="!valid"
                color="primary"
                block
                class="mt-4"
                @click="handleLogin"
              >
                Login
              </v-btn>
              <v-btn>
                <RouterLink to="/Cadastro"
                  >Não tem um cadastro? Clique aqui!</RouterLink
                >
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      valid: false,
      emailRules: [
        (v) => !!v || "E-mail é obrigatório",
        (v) => /.+@.+\..+/.test(v) || "E-mail inválido",
      ],
      passwordRules: [(v) => !!v || "Senha é obrigatória"],
    };
  },
  methods: {
    handleLogin() {
      // Simulação de autenticação (aqui você pode integrar com uma API real)
      if (
        this.form.email === "admin@exemplo.com" &&
        this.form.password === "1234"
      ) {
        this.$router.push("/dashboard");
      } else {
        alert("E-mail ou senha inválidos!");
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
}

v-card {
  padding: 20px;
}

v-card-title {
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
