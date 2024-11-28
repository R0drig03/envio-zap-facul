<template>
  <v-container>
    <v-row class="justify-center align-center min-vh-100">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card>
          <v-card-title class="text-h5 text-center">Cadastro</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <!-- Nome -->
              <v-text-field
                v-model="form.nome"
                label="Nome"
                :rules="[rules.required]"
                outlined
                required
              ></v-text-field>

              <!-- Email -->
              <v-text-field
                v-model="form.email"
                label="E-mail"
                :rules="[rules.required, rules.email]"
                outlined
                required
              ></v-text-field>

              <!-- Senha -->
              <v-text-field
                v-model="form.password"
                label="Senha"
                type="password"
                :rules="[rules.required, rules.password]"
                outlined
                required
              ></v-text-field>

              <!-- Confirmar Senha -->
              <v-text-field
                v-model="form.confirmPassword"
                label="Confirmar Senha"
                type="password"
                :rules="[rules.required, confirmPasswordRule]"
                outlined
                required
              ></v-text-field>
            </v-form>
          </v-card-text>

          <v-card-actions class="justify-center">
            <v-btn color="primary" block :disabled="!valid" @click="register">
              Cadastrar
            </v-btn>
          </v-card-actions>

          <v-card-actions class="justify-center">
            <RouterLink to="/Login" class="text-decoration-none">
              Já possui uma conta? Faça login
            </RouterLink>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      valid: false,
      form: {
        nome: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      rules: {
        required: (value) => !!value || "Campo obrigatório",
        email: (value) =>
          /^\S+@\S+\.\S+$/.test(value) || "Formato de e-mail inválido",
        password: (value) =>
          value.length >= 6 || "A senha deve ter no mínimo 6 caracteres",
      },
    };
  },
  computed: {
    confirmPasswordRule() {
      return (value) =>
        value === this.form.password || "As senhas não coincidem";
    },
  },
  methods: {
    async register() {
      if (this.valid) {
        // Simulação de envio ao backend
        try {
          const response = await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(this.form),
          });

          if (response.ok) {
            this.$router.push("/Login"); // Redireciona para a página de login
          } else {
            console.error("Erro ao cadastrar usuário");
          }
        } catch (error) {
          console.error("Erro de conexão:", error);
        }
      }
    },
  },
};
</script>

<style scoped>
.min-vh-100 {
  min-height: 100vh;
}

.text-decoration-none {
  text-decoration: none;
  color: #1a73e8;
}

.text-decoration-none:hover {
  text-decoration: underline;
}
</style>
