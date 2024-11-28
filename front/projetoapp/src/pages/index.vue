<template>
  <v-app>
    <!-- Apresentação do site -->
    <v-container class="app-idea-container" fluid>
      <v-row class="align-center justify-center">
        <v-col cols="12" md="8" class="text-center">
          <h1 class="display-1 font-weight-bold app-title">
            Liberte-se da gestão manual de clientes e foque no que importa.
          </h1>
          <p class="app-description">
            Gerencie sua carteira de clientes com inteligência. Nossa plataforma
            completa oferece tudo o que você precisa para otimizar seus
            processos de vendas, desde o cadastro de clientes até a análise de
            resultados. Com relatórios personalizados, ferramentas de automação
            e insights valiosos, você terá mais tempo para focar no que
            realmente importa: construir relacionamentos duradouros e aumentar
            seus lucros. Comece agora sua jornada rumo ao sucesso!
          </p>
          <v-btn color="primary" large class="mt-4">
            <RouterLink to="/Login">Login</RouterLink>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <!-- Rodapé -->
    <v-footer color="indigo-accent-1" app>
      <v-col class="text-center mt-4" cols="12">
        {{ new Date().getFullYear() }} —
        <strong>developed by Rodrigo Vasconselos and Joao Rosa</strong>
      </v-col>
    </v-footer>
    <RouterView></RouterView>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped>
/* Garante que o rodapé fique alinhado corretamente no final da página */

.app-idea-container {
  padding: 40px 16px;
  background: linear-gradient(135deg, #e3f2fd, #bbdefb);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.app-title {
  color: #1a237e;
  margin-bottom: 16px;
}

.app-description {
  font-size: 1.2rem;
  color: #424242;
  line-height: 1.6;
}
</style>
