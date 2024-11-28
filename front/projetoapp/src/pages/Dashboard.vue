<template>
  <v-container>
    <!-- Cabeçalho com título e botão de logout -->
    <v-row>
      <v-col cols="12" class="d-flex justify-between align-center mb-4">
        <h1 class="text-h4">Gestão de Cadastros</h1>
      </v-col>
    </v-row>

    <!-- Botão de adicionar novo cadastro -->
    <v-row>
      <v-col cols="12" class="text-center">
        <v-btn color="primary" @click="openDialog">
          Adicionar Novo Cadastro
        </v-btn>
      </v-col>
    </v-row>

    <!-- Tabela -->
    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="cadastros"
          item-value="id"
          class="elevation-1"
          dense
          disable-pagination
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Cadastros</v-toolbar-title>
            </v-toolbar>
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <v-btn icon color="blue" @click="editCadastro(item)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon color="red" @click="deleteCadastro(item.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <!-- Diálogo para Adicionar/Editar -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{
            editMode ? "Editar Cadastro" : "Novo Cadastro"
          }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="form.nome"
                  label="Nome"
                  :rules="[rules.required]"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="form.email"
                  label="Email"
                  :rules="[rules.required, rules.email]"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="form.telefone"
                  label="Telefone"
                  :rules="[rules.required, rules.telefone]"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">
            Cancelar
          </v-btn>
          <v-btn 
            color="primary"
            @click="handleSave"
          >
            {{ editMode ? 'Atualizar' : 'Salvar' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-btn color="red" dark @click="logout">
      Logout
      <v-icon right>mdi-logout</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      dialog: false,
      editMode: false,
      valid: false,
      form: {
        id: null,
        nome: "",
        email: "",
        telefone: "",
      },
      headers: [
        { text: "Nome", value: "nome" },
        { text: "Email", value: "email" },
        { text: "Telefone", value: "telefone" },
        { text: "Ações", value: "actions", sortable: false },
      ],
      cadastros: [], // Dados carregados do banco
      rules: {
        required: (value) => !!value || "Campo obrigatório",
        email: (value) => {
          const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          return pattern.test(value) || 'E-mail inválido'
        },
        telefone: (value) => /^\d+$/.test(value) || "Somente números",
      },
    };
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch("http://192.168.2.22:3000/contatos");
        if (!response.ok) throw new Error('Erro ao carregar dados');
        this.cadastros = await response.json();
      } catch (error) {
        console.error('Erro:', error);
      }
    },
    openDialog() {
      this.resetForm();
      this.dialog = true;
      this.editMode = false;
    },
    closeDialog() {
      this.dialog = false;
    },
    resetForm() {
      this.form = { 
        id: null, 
        nome: "", 
        email: "", 
        telefone: "" 
      };
    },
    editCadastro(item) {
      this.form = { ...item };
      this.dialog = true;
      this.editMode = true;
    },
    handleSave() {
      console.log('Botão clicado');
      this.saveCadastro();
    },
    async saveCadastro() {
      console.log('Iniciando saveCadastro');
      
      try {
        console.log('Dados do formulário:', this.form);
        const url = this.editMode 
          ? `http://192.168.2.22:3000/contatos/${this.form.id}`
          : 'http://192.168.2.22:3000/contatos';
        
        console.log('URL da requisição:', url);
        
        const response = await fetch(url, {
          method: this.editMode ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nome: this.form.nome,
            email: this.form.email,
            telefone: this.form.telefone,
            fk_user: 1
          }),
        });

        console.log('Resposta do servidor:', response);

        if (!response.ok) throw new Error('Erro ao salvar contato');

        await this.fetchData();
        this.closeDialog();
      } catch (error) {
        console.error('Erro detalhado:', error);
      }
    },
    async deleteCadastro(id) {
      // Excluir cadastro do banco de dados
      await fetch(`http://192.168.2.22:3000/contatos/${id}`, {
        method: "DELETE",
      });
      this.fetchData();
    },
    logout() {
      // Remove informações de autenticação e redireciona para login
      localStorage.removeItem("authToken");
      sessionStorage.clear();
      this.$router.push("/Login");
    },
    testeClick() {
      console.log('Botão clicado');
      alert('Botão clicado');
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
h1 {
  color: #1a237e;
}

.v-btn {
  margin-bottom: 20px;
}

.mb-4 {
  margin-bottom: 20px;
}
</style>
