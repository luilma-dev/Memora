# Product

<!-- impeccable:product-schema 1 -->

## Platform

adaptive

## Users

Estudantes de concursos públicos (como PRF), universitários, estudantes de idiomas e concurseiros da área jurídica que precisam organizar e revisar grandes volumes de conteúdo por meio de repetição espaçada (flashcards) no celular.

## Product Purpose

O Memora permite organizar disciplinas em pastas temáticas e decks de flashcards, priorizando as revisões pendentes do dia com leitura rápida, foco cognitivo e zero distração visual.

## Positioning

Um aplicativo mobile de flashcards com arquitetura utilitária de alta densidade e contraste OLED Dark-First (inspirado no Microsoft Fluent 2 Mobile), substituindo interfaces gamificadas ou poluídas por uma hierarquia documental limpa, rápida e orientada à tarefa.

## Operating Context

Uso diário em sessões curtas e recorrentes no smartphone (iOS e Android), frequentemente em ambientes com pouca luz ou deslocamento, onde o usuário seleciona uma pasta de estudo (ex.: PRF, Faculdade, Idiomas, Direito), verifica quantas revisões estão pendentes hoje e inicia a bateria de flashcards de um deck específico.

## Capabilities and Constraints

- Organização em dois níveis na tela principal de estudo (`Estudar`): Pastas no topo (`PRF`, `Faculdade`, `Idiomas`, `Direito`) e Decks da pasta selecionada abaixo (`Direito Constitucional`, `Legislação de Trânsito`, `Português`, `Direito Administrativo`).
- Bloco de ação imediata para revisões diárias (`Revisões de hoje` — `18 flashcards pendentes` com CTA `Começar revisão`).
- Navegação principal inferior com 3 destinos: `Início`, `Biblioteca` e `Estudar`.
- Escopo atual: interface estática de alta fidelidade da primeira tela (`Estudar`), sem lógica de backend.

## Brand Commitments

- **Design System**: Segue estritamente o `DESIGN.md` (OLED Dark Mode `#000000`, superfícies `#131313`, `#1F1F1F`, `#292929`, `#3D3D3D` e acento `#479EF5`).
- **Tipografia**: Exclusivamente família `Inter` (`400`, `500`, `600`, `700`) com `tabular-nums` em contadores.
- **Iconografia**: Exclusivamente ícones **Microsoft Fluent UI System Icons** (variantes `Regular` para estado inativo e `Filled` para estado ativo).
- **Zero Emojis**: Proibição absoluta de emojis Unicode em qualquer parte da interface ou código.

## Evidence on Hand

- `DESIGN.md` completo extraído de quatro telas de referência Fluent 2 Mobile Dark Mode.
- Conteúdo real da tela `Estudar`:
  - Pastas: `PRF` (8 decks, selecionada), `Faculdade` (5 decks), `Idiomas` (6 decks), `Direito` (4 decks).
  - Decks da PRF: `Direito Constitucional` (45 flashcards), `Legislação de Trânsito` (80 flashcards), `Português` (120 flashcards), `Direito Administrativo` (35 flashcards).
  - Revisões do dia: `Revisões de hoje` (`18 flashcards pendentes`, ação `Começar revisão`).

## Product Principles

1. **Clareza Operacional sobre Decoração**: A estrutura prioriza leitura imediata de pastas, contagens de cartões e pendências de revisão, sem cartões quadrados decorativos com marcas d'água ou gradientes artificiais.
2. **Elevação por Luminância**: Profundidade comunicada pelos degraus de cinza do `DESIGN.md` sobre o canvas `#000000`.
3. **Acento Funcional Único**: O azul `#479EF5` sinaliza apenas seleção ativa, ações primárias e links de expansão.
4. **Rigor Tipográfico e Iconográfico**: Fonte `Inter` em toda a hierarquia e ícones vetoriais Fluent System Icons consistentes em peso e geometria.

