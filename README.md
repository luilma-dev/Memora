# Memora 📚

Aplicativo mobile de flashcards e repetição espaçada com foco em alto desempenho, leitura rápida e zero distrações visuais. Projetado com estética utilitária **OLED Dark-First** inspirada nas diretrizes do **Microsoft Fluent 2 Mobile**.

---

## 🎯 Sobre o Projeto

O **Memora** foi desenvolvido para concurseiros, estudantes universitários e de idiomas que precisam gerenciar altos volumes de estudo com rapidez e eficiência cognitiva:

- **Estrutura Hierárquica em 2 Níveis**: Organize seus estudos por **Pastas** (ex: Concursos, OAB, Idiomas) e **Decks** de flashcards associados.
- **Fluent 2 Mobile Design**: Superfícies escuras balanceadas com alto contraste (fundo `#000000`, cartões `#1F1F1F` e detalhes em cinza e azul `#479EF5`).
- **Iconografia Oficial Fluent**: Utiliza a biblioteca oficial Microsoft Fluent UI System Icons (versões Regular para inativo e Filled para ativo).
- **Sem Gamificação Excessiva**: Foco puro no estudo documental, contagem clara de pendências e revisões do dia.
- **Criação Rápida**: Modal inferior (*Bottom Sheet*) integrado para criar pastas e decks instantaneamente pelo botão flutuante.

---

## 🚀 Tecnologias

- **Framework**: [React Native](https://reactnative.dev/) / [Expo SDK 58](https://expo.dev/)
- **Roteamento**: [Expo Router](https://docs.expo.dev/router/introduction/) (File-based routing)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Tipografia**: [Inter Font](https://fonts.google.com/specimen/Inter) com `tabular-nums`
- **Ícones**: SVG paths do Microsoft Fluent System Icons
- **Estilização**: React Native StyleSheet nativo com design tokens estritos

---

## 💻 Como Rodar o Projeto

### Pré-requisitos
- Node.js (v18+)
- Expo Go instalado no smartphone (iOS ou Android)

### Passo a passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/SEU_USUARIO/memora.git
   cd memora
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npx expo start
   ```

4. **Abra no dispositivo:**
   - Escaneie o QR Code exibido no terminal com o aplicativo **Expo Go** (Android) ou com a Câmera (iOS).
   - Para abrir na Web, pressione `w` no terminal.

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
