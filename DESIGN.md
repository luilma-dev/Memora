# Memora — Design System (Dark Mode)

Este documento define o Design System oficial do aplicativo **Memora**. Toda a interface opera sob uma arquitetura **Dark-First (OLED Dark Mode)** inspirada no **Microsoft Fluent 2 Mobile**, combinando alto contraste sobre fundo preto puro (`#000000`) na tela principal, uma escada precisa de elevação por luminância (`#000000` -> `#131313` / `#141414` -> `#1F1F1F` -> `#292929` -> `#3D3D3D`), tipografia **Inter**, iconografia estritamente padronizada com **Microsoft Fluent UI System Icons** e **ausência total de traçados/bordas artificiais** nos componentes.

---

## 1. Princípios Diretores

1. **Zero Emojis (Regra Estrita)**: É estritamente proibido o uso de emojis em qualquer parte da interface (títulos, listas, cards, menu lateral, configurações, estados vazios, badges, notificações ou feedbacks). Toda representação visual simbólica deve utilizar exclusivamente ícones do pacote **Microsoft Fluent UI System Icons**.
2. **Zero Traçados / Bordas Artificiais (Stroke-Free Design - Regra Estrita)**: É proibido o uso de contornos, bordas ou traçados artificiais (`borderWidth: 1`, `border: 1px solid`, `outline`) para delinear cards, botões, modais, pílulas, inputs ou containers. A separação, hierarquia e profundidade visual são geradas exclusivamente pela **diferença tonal das superfícies (luminância)** sobre o fundo `#000000`. Elementos visuais se sustentam por suas formas e cores de preenchimento contínuas, garantindo um visual limpo, moderno e sem ruído visual.
3. **Hierarquia por Escada de Luminância (Fluent Dark Elevation)**: A profundidade no modo Dark é comunicada pela progressão exata de cinzas, sem sombras pesadas nem traçados de contorno:
   * **Nível 0 (Main Canvas)**: `#000000` (Fundo principal OLED para listas, telas de estudo e feeds)
   * **Nível 1 (Bottom Nav & Grouped Sheet Canvas)**: `#131313` / `#141414` (Barra de navegação inferior e fundo de telas modais)
   * **Nível 2 (Drawer, Modal Header & Card Surface)**: `#1F1F1F` (Menu lateral, cartões de decks, cards de pastas e superfície de modais)
   * **Nível 3 (Main Header, Inset Groups, Pills & Icon Boxes)**: `#292929` (Cabeçalho principal, pílulas inativas, caixas de ícones e blocos agrupados)
   * **Nível 4 (Input Fill & Hover)**: `#3D3D3D` (Fundo de campos de texto, busca e estado pressionado)
4. **Geometria Híbrida (Pills + Cards Arredondados)**: Controles interativos de navegação, busca, filtros, switches, avatares e ação flutuante utilizam formato pílula/circular (`border-radius: 9999px`), enquanto cards, grupos de configurações e caixas de ícones utilizam cantos arredondados suaves (`8px` a `14px`).
5. **Acento Funcional Focado**: O azul primário (`#479EF5`) é reservado exclusivamente para indicar seleção ativa, switches ligados (`Toggle On`), botões de ação principal, botão flutuante (FAB) e aba ativa.

---

## 2. Paleta de Cores (Dark Mode Tokens)

### 2.1 Superfícies e Fundos (`Backgrounds & Surfaces`)

| Token CSS | Hex / Valor | Função na Interface |
| :--- | :--- | :--- |
| `--bg-canvas` | `#000000` | Fundo principal da aplicação (canvas OLED de rolagem e estudo). |
| `--bg-nav-solid` | `#131313` | Fundo sólido da barra de navegação inferior sobre o canvas preto. |
| `--bg-sheet-canvas` | `#141414` | Fundo principal de telas modais e configurações. |
| `--bg-drawer` | `#1F1F1F` | Superfície elevada da gaveta de navegação lateral. |
| `--bg-sheet-header` | `#1F1F1F` | Superfície de folhas modais e sheets inferiores (*Bottom Sheets*). |
| `--bg-card` | `#1F1F1F` | Superfície sólida de cards de pastas e decks (sem traçados). |
| `--bg-surface-disabled` | `#222222` | Fundo de elementos ou botões inativos/desabilitados. |
| `--bg-header` | `#292929` | Superfície elevada do cabeçalho principal. |
| `--bg-settings-group` | `#292929` | Superfície de caixas de ícones e grupos agrupados. |
| `--bg-surface-pill` | `#292929` | Fundo de chips e pílulas inativas sobre o canvas `#000000`. |
| `--bg-surface-hover` | `#333333` | Estado `pressed` / `active` de cards e botões. |
| `--bg-input` | `#141414` / `#222222` | Fundo de campos de texto e barra de busca (sem borda). |
| `--bg-backdrop-scrim` | `rgba(0, 0, 0, 0.70)` | Película escura sobre a tela quando um modal está aberto. |

### 2.2 Cores de Acento e Marca (`Brand & Accent`)

| Token CSS | Hex / Valor | Função na Interface |
| :--- | :--- | :--- |
| `--accent-primary` | `#479EF5` | Azul primário Fluent Dark (chip ativo, FAB `+`, abas ativas, botões de ação). |
| `--accent-primary-hover` | `#62ABF5` | Estado `hover` de componentes com preenchimento primário. |
| `--accent-primary-pressed` | `#2886DE` | Estado `pressed` de botões primários e FAB. |
| `--accent-subtle-bg` | `rgba(71, 158, 245, 0.15)` | Fundo translúcido para destaques secundários. |

### 2.3 Tipografia e Ícones (`Foregrounds & Text`)

| Token CSS | Hex / Valor | Função na Interface |
| :--- | :--- | :--- |
| `--text-primary` | `#FFFFFF` | Títulos principais, nomes de decks, rótulos de pastas e cabeçalhos. |
| `--text-secondary` | `#9E9E9E` | Subtítulos, contadores de flashcards, metadados e abas inativas. |
| `--text-disabled` | `#5E5E5E` | Texto e ícones em estado desabilitado. |
| `--text-on-accent` | `#000000` | Texto e ícones sobre fundo `--accent-primary` (`#479EF5`). |
| `--text-link` | `#479EF5` | Links de ação direta e atalhos. |
| `--text-danger` | `#D15E69` | Ações destrutivas ou avisos. |

### 2.4 Semânticas, Presença e Avatares (`Status & Avatars`)

| Token CSS | Hex / Valor | Função na Interface |
| :--- | :--- | :--- |
| `--status-danger-bg` | `#B10E1C` | Fundo do badge de notificação numérico. |
| `--status-danger-text` | `#FFFFFF` | Texto do contador dentro do badge de notificação. |
| `--presence-available` | `#3DB838` | Verde de status online/ativo no avatar. |
| `--avatar-plum-bg` | `#341A51` | Fundo ameixa escuro para avatares de iniciais (`KM`). |
| `--avatar-plum-text` | `#E2D5F0` | Texto de iniciais sobre `--avatar-plum-bg`. |

---

## 3. Tipografia (`Inter`)

### 3.1 Configuração da Fonte

* **Família Tipográfica Única**: `'Inter', -apple-system, BlinkMacSystemFont, sans-serif`
* **Renderização**: Alta nitidez sem serrilhado (*antialiased*).
* **Números Tabulares**: Ativar `font-variant: ['tabular-nums']` em contadores, estatísticas e badges numéricos.

### 3.2 Escala Tipográfica

| Token / Estilo | Tamanho (`px`) | Peso (`font-weight`) | Altura de Linha (`line-height`) | Aplicação na UI |
| :--- | :--- | :--- | :--- | :--- |
| **Title 1 (Page Header)** | `24px` | `700` (Bold) | `30px` | Título principal de telas. |
| **Title 2 (Section Header)** | `18px` | `600` (SemiBold) | `24px` | Títulos de seção (`Pastas`, `Decks da Pasta`). |
| **Body 1 (Card Title)** | `15px` | `600` (SemiBold) | `20px` | Nomes de pastas e decks em cards. |
| **Body 2 (Item / Button)** | `14px` | `500` (Medium) | `18px` | Textos de botões, chips e linhas. |
| **Caption 1 (Metadata)** | `12px` | `400` (Regular) | `16px` | Contagem de flashcards, métricas e subtítulos. |
| **Caption 2 (Tab Label)** | `11px` | `500` (Medium) | `14px` | Rótulos da barra de navegação inferior. |
| **Badge Count** | `11px` | `700` (Bold) | `14px` | Contador numérico em badges. |

---

## 4. Iconografia (Microsoft Fluent UI System Icons)

* **Biblioteca Oficial**: `@fluentui/react-icons` ou SVG paths do Microsoft Fluent System Icons.
* **Proibição Absoluta de Emojis**: Nenhuma imagem de emoji Unicode é admitida na interface.
* **Convenção de Estados**:
  * **Inativo / Padrão**: Variante **Regular**, cor `--text-secondary` (`#9E9E9E`) ou branca `#FFFFFF`.
  * **Ativo / Selecionado**: Variante **Filled** ou preenchimento com cor de acento.

---

## 5. Espaçamento e Geometria

### 5.1 Escala de Espaçamento (Base `4px`)
* `--space-1`: `4px`
* `--space-2`: `8px`
* `--space-3`: `12px`
* `--space-4`: `16px` (margem horizontal padrão das telas: `paddingHorizontal: 16`)
* `--space-5`: `20px`
* `--space-6`: `24px`

### 5.2 Tokens de Arredondamento (`Border Radius`)
* `--radius-sm`: `8px` (caixas compactas de ícones)
* `--radius-md`: `12px` (inputs e campos de texto)
* `--radius-card`: `14px` (cards de pastas e decks)
* `--radius-sheet`: `24px` (cantos superiores de *Bottom Sheets*)
* `--radius-pill`: `9999px` (chips, botões de ação primária, FAB e avatares)

---

## 6. Diretrizes de Construção de Componentes (Sem Traçados)

1. **Cards de Pastas e Decks**:
   - Fundo sólido `#1F1F1F`.
   - Raio de canto `14px`.
   - **Sem bordas (`borderWidth: 0`)**. O contraste entre a superfície `#1F1F1F` e o canvas `#000000` delimita a silhueta com total clareza.
   - Detalhe vertical da pasta: linha sólida suave (`#191919`, `width: 5px`, sem bordas internas).

2. **Chips e Pílulas de Seleção**:
   - Inativo: fundo sólido `#1C1C22` ou `#292929`, **sem borda**.
   - Ativo: fundo sólido `--accent-primary` (`#479EF5`) ou `#0F6CBD`, **sem borda**.

3. **Bottom Sheets e Modais**:
   - Superfície `#1E1E1E` com raio superior de `24px`.
   - **Sem traçados no topo ou laterais**.
   - Puxador central (*drag handle*) em `#3E3E3E` para indicar gestualidade.

4. **Inputs e Campos de Texto**:
   - Fundo escuro integrado `#141414`, **sem contorno/borda**.
   - Foco indicado pelo contraste do texto e cursor, sem borda luminosa externa.

---

## 7. Variáveis CSS / Tokens de Referência

```css
:root {
  /* Tipografia */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

  /* Superfícies Sólidas (Zero Traçados / Escada de Luminância) */
  --bg-canvas: #000000;
  --bg-nav-solid: #131313;
  --bg-sheet-canvas: #141414;
  --bg-card: #1F1F1F;
  --bg-drawer: #1F1F1F;
  --bg-sheet-header: #1E1E1E;
  --bg-header: #292929;
  --bg-settings-group: #292929;
  --bg-surface-pill: #292929;
  --bg-surface-hover: #333333;
  --bg-input: #141414;
  --bg-backdrop-scrim: rgba(0, 0, 0, 0.70);

  /* Acento e Marca */
  --accent-primary: #479EF5;
  --accent-primary-hover: #62ABF5;
  --accent-primary-pressed: #2886DE;

  /* Texto e Controles */
  --text-primary: #FFFFFF;
  --text-secondary: #9E9E9E;
  --text-disabled: #5E5E5E;
  --text-on-accent: #000000;
  --text-link: #479EF5;

  /* Raios de Borda */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-card: 14px;
  --radius-sheet: 24px;
  --radius-pill: 9999px;

  /* Espaçamento */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
}
```
