# Memora — Design System (Dark Mode)

Este documento define o Design System extraído das referências visuais para construção do aplicativo **Memora**. Toda a interface opera sob uma arquitetura **Dark-First (OLED Dark Mode)** inspirada no **Microsoft Fluent 2 Mobile**, combinando alto contraste sobre fundo preto puro (`#000000`) na tela principal, fundo grafite escuro (`#141414`) em telas agrupadas de configurações/sheets, uma escada precisa de elevação por luminância (`#000000` -> `#131313` / `#141414` -> `#1F1F1F` -> `#292929` -> `#3D3D3D`), tipografia **Inter** e iconografia estritamente padronizada com **Microsoft Fluent UI System Icons**.

---

## 1. Princípios Diretores

1. **Zero Emojis (Regra Estrita)**: É estritamente proibido o uso de emojis em qualquer parte da interface (títulos, listas, cards, menu lateral, configurações, estados vazios, badges, notificações ou feedbacks). Toda representação visual simbólica deve utilizar exclusivamente ícones do pacote **Microsoft Fluent UI System Icons**.
2. **Hierarquia por Escada de Luminância (Fluent Dark Elevation)**: Em vez de sombras projetadas pesadas, a profundidade no modo Dark é comunicada pela progressão exata de cinzas:
   * **Nível 0 (Main Canvas)**: `#000000` (Fundo principal OLED para feeds, arquivos e mídia)
   * **Nível 1 (Bottom Nav & Grouped Sheet Canvas)**: `#131313` / `#141414` (Barra de navegação inferior e fundo de telas modais agrupadas como `Privacy Settings`)
   * **Nível 2 (Drawer, Modal Header & Card Surface)**: `#1F1F1F` (Menu lateral `Navigation Drawer`, cabeçalho de sheets modais e rodapé dos cards em carrossel)
   * **Nível 3 (Main Header, Inset Groups, Pills & Overlay Controls)**: `#292929` (Cabeçalho principal, blocos agrupados `Inset Grouped Cards` de configurações, pílulas inativas e botão flutuante `...`)
   * **Nível 4 (Input Fill)**: `#3D3D3D` (Barra de busca interna ao cabeçalho e trilho de controles inativos)
3. **Geometria Híbrida (Pills + Cards Arredondados)**: Controles interativos de navegação, busca, filtros, switches, avatares e ação flutuante utilizam formato pílula/circular (`border-radius: 9999px`), enquanto cards em destaque, grupos de configurações (`Inset Grouped Lists`) e miniaturas de mídia utilizam cantos arredondados suaves (`8px` a `12px`).
4. **Acento Funcional Focado**: O azul primário (`#479EF5`) é reservado exclusivamente para indicar seleção ativa, switches ligados (`Toggle On`), links de ação (`See More`, `View all`, `Add or switch accounts`), botão de ação flutuante (FAB) e aba ativa.

---

## 2. Paleta de Cores (Dark Mode Tokens)

### 2.1 Superfícies e Fundos (`Backgrounds & Surfaces`)

| Token CSS | Hex / Valor | Função na Interface |
| :--- | :--- | :--- |
| `--bg-canvas` | `#000000` | Fundo principal da aplicação (área de rolagem, listas de arquivos, seção de mídia e fundo do carrossel). |
| `--bg-nav-solid` | `#131313` | Fundo sólido da barra de navegação inferior sobre o canvas preto. |
| `--bg-nav-translucent` | `rgba(19, 19, 19, 0.85)` | Fundo da barra de navegação inferior com `backdrop-filter: blur(20px)` quando há mídia sob a barra. |
| `--bg-sheet-canvas` | `#141414` | Fundo principal de telas modais e de configurações agrupadas (ex.: `Privacy Settings`). |
| `--bg-drawer` | `#1F1F1F` | Superfície elevada da gaveta de navegação lateral (`Navigation Drawer`). |
| `--bg-sheet-header` | `#1F1F1F` | Cabeçalho superior de telas modais/sheets (`Back` + `Privacy Settings`). |
| `--bg-card` | `#1F1F1F` | Superfície de fundo e barra inferior (footer de metadados) dos Cards de Destaque (`Featured Cards`). |
| `--bg-surface-disabled` | `#222222` | Fundo de elementos ou chips desabilitados (ex.: chip `"Notes"`). |
| `--bg-header` | `#292929` | Superfície elevada do cabeçalho principal (Status Bar + App Bar + container da busca). |
| `--bg-settings-group` | `#292929` | Superfície dos blocos agrupados (`Inset Grouped Cards`) em telas de configurações sobre o fundo `#141414`. |
| `--bg-surface-pill` | `#292929` | Fundo de chips de filtro inativos sobre o canvas `#000000`. |
| `--bg-card-overlay-btn` | `rgba(41, 41, 41, 0.90)` | Fundo do botão de ação rápida (`...`) sobreposto no canto superior direito da imagem do Card de Destaque (`#292929`). |
| `--bg-surface-hover` | `#333333` | Estado `hover` / `pressed` para linhas de lista, linhas de configurações, itens do menu lateral, cards e chips inativos. |
| `--bg-input` | `#3D3D3D` | Fundo da barra de busca em formato pílula dentro do cabeçalho e trilho de `Toggle Switch` desligado. |
| `--bg-backdrop-scrim` | `rgba(0, 0, 0, 0.60)` | Película escura (scrim) sobre a tela principal quando o `Navigation Drawer` ou modal está aberto. |

### 2.2 Cores de Acento e Marca (`Brand & Accent`)

| Token CSS | Hex / Valor | Função na Interface |
| :--- | :--- | :--- |
| `--accent-primary` | `#479EF5` | Azul primário Fluent Dark (chip ativo `"All"`, trilho de `Toggle Switch` ativo, FAB `+`, ícone de aba ativa, filtro ativo e links de ação). |
| `--accent-primary-hover` | `#62ABF5` | Estado `hover` de componentes com preenchimento primário. |
| `--accent-primary-pressed` | `#2886DE` | Estado `active` / `pressed` de botões primários e FAB. |
| `--accent-sheet-peek` | `#2F69A3` | Borda superior da tela subjacente em apresentações de modal empilhado (`Stacked Sheet Peek`). |
| `--accent-subtle-bg` | `rgba(71, 158, 245, 0.15)` | Fundo translúcido para estados selecionados secundários. |

### 2.3 Tipografia e Ícones (`Foregrounds & Text`)

| Token CSS | Hex / Valor | Função na Interface |
| :--- | :--- | :--- |
| `--text-primary` | `#FFFFFF` | Títulos principais (`Files`, `Privacy Settings`), rótulos de configurações (`Optional Connected Experiences`), nome no Drawer, cabeçalhos de seção, títulos de cards e nomes de arquivos. |
| `--text-secondary` | `#9E9E9E` | Botão `"Back"`, títulos e textos explicativos de grupos de configurações (`Connected experiences`, `M365 has several...`), chevrons (`>`), e-mails, subtítulos de listas/cards e abas inativas. |
| `--text-disabled` | `#5E5E5E` | Texto e ícones em estado desabilitado (ex.: label `"Notes"`). |
| `--text-on-accent` | `#000000` | Texto e ícone sobre fundo `--accent-primary` (`#479EF5`), garantindo contraste elevado (ex.: texto `"All"` no chip ativo e ícone `+` no FAB). |
| `--text-link` | `#479EF5` | Links de ação direta (`"See More"`, `"View all"`, `"Add or switch accounts"`). |
| `--text-danger` | `#D15E69` | Texto de ações destrutivas em listas agrupadas (ex.: `"Clear Search History"` sobre superfície `#292929`). |
| `--toggle-thumb` | `#FFFFFF` | Círculo indicador interno (knob) do componente `Toggle Switch`. |

### 2.4 Semânticas, Presença, Avatares e Divisores (`Status, Avatars & Borders`)

| Token CSS | Hex / Valor | Função na Interface |
| :--- | :--- | :--- |
| `--status-danger-bg` | `#B10E1C` | Fundo do badge de notificação numérico (ex.: contador `"2"` na aba Groups). |
| `--status-danger-text` | `#FFFFFF` | Texto do contador dentro do badge de notificação. |
| `--presence-available` | `#3DB838` | Verde semântico de status online/disponível (badge no canto inferior direito do avatar secundário `"KM"`). |
| `--avatar-plum-bg` | `#341A51` | Fundo roxo/ameixa escuro para avatares de iniciais (`"KM"` no topo do Drawer). |
| `--avatar-plum-text` | `#E2D5F0` | Cor do texto de iniciais sobre `--avatar-plum-bg`. |
| `--indicator-unread` | `#FFFFFF` | Ponto indicador de novidade (dot de `6px` dentro do chip `"Media"`). |
| `--filetype-doc-blue` | `#185ABD` | Cor semântica para documentos de texto. |
| `--filetype-slide-orange` | `#D24726` | Cor semântica para apresentações (lista e card `FY24 Picker`). |
| `--filetype-sheet-green` | `#107C41` | Cor semântica para planilhas e matrizes de dados. |
| `--filetype-mail-blue` | `#0078D4` | Cor semântica primária para itens de comunicação/notas/e-mail (card `1:1 Ku...`). |
| `--filetype-mail-cyan` | `#28A8EA` | Cor semântica secundária (detalhe luminoso do ícone de comunicação/e-mail). |
| `--border-subtle` | `#1A1A1A` | Linha divisória horizontal de `1px` entre seções no canvas `#000000`. |
| `--border-nav-top` | `#1B1B1B` | Borda superior sutil de `1px` da barra de navegação inferior. |
| `--border-drawer-divider` | `#2A2A2A` | Linha divisória horizontal de `1px` dentro do `Navigation Drawer` (`#1F1F1F`). |
| `--border-group-inner` | `#2E2E2E` | Linha divisória horizontal interna (`1px` com recuo esquerdo de `16px`) entre itens de um mesmo card de configurações (`#292929`). |

---

## 3. Tipografia (`Inter`)

### 3.1 Configuração da Fonte

* **Família Tipográfica Única**: `'Inter', -apple-system, BlinkMacSystemFont, sans-serif`
* **Renderização**: `-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`
* **Números Tabulares**: Ativar `font-variant-numeric: tabular-nums` em datas, contadores de badges e horários.

### 3.2 Escala Tipográfica

| Token / Estilo | Tamanho (`px` / `rem`) | Peso (`font-weight`) | Altura de Linha (`line-height`) | Tracking (`letter-spacing`) | Aplicação na UI |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Title 1 (Page Header)** | `24px` (`1.5rem`) | `700` (Bold) | `30px` (`1.25`) | `-0.02em` | Título principal no cabeçalho (`Files`). |
| **Title 2 (Section / Modal Header)** | `16px` (`1.0rem`) | `600` (SemiBold) | `22px` (`1.375`) | `-0.01em` | Títulos de seção (`Recent Files`, `Media`), título central de modal (`Privacy Settings`) e nome de perfil (`Krystal McKinney`). |
| **Body 1 (Primary Item / Row)** | `15px` (`0.9375rem`) | `400` (Regular) / `500` (Medium) | `20px` (`1.33`) | `-0.005em` | Nomes de arquivos, linhas de configurações (`Optional Connected Experiences`, `Privacy Statement`, `Clear Search History`), botão `Back`, itens do Drawer, link `See More`, input `Search`. |
| **Card Title (Featured)** | `14px` (`0.875rem`) | `500` (Medium) | `18px` (`1.28`) | `-0.005em` | Título no rodapé do Card de Destaque (`FY24 Picker`, `1:1 Ku...`). |
| **Body 2 (Chip / Email)** | `13px` (`0.8125rem`) | `400` (Regular) / `500` (Medium) | `18px` (`1.38`) | `0em` | Rótulos das pílulas de filtro (`All`, `Files`) e e-mail do usuário (`k.mckinney@...`, `cballinger@constoso.com`). |
| **Caption 1 (Metadata / Group Info)** | `12px` (`0.75rem`) | `400` (Regular) / `500` (Medium) | `16px` (`1.33`) | `0em` | Cabeçalhos e descrições de rodapé de grupos de configurações (`Connected experiences`, `More`, `Search`, texto explicativo `M365 has several...`), subtítulos de arquivos/cards e link `"Add or switch accounts"`. |
| **Caption 2 (Tab / Initials)** | `10px`–`11px` | `500` (Medium) / `600` (SemiBold) | `12px` (`1.20`) | `0.01em` | Rótulos da Bottom Navigation (`Home`, `Groups`, `Actions`) e iniciais de avatar (`KM`). |
| **Badge Count** | `10px` (`0.625rem`) | `700` (Bold) | `12px` (`1.00`) | `0em` | Contador numérico em badges de notificação (`2`). |

---

## 4. Iconografia (Microsoft Fluent UI System Icons)

### 4.1 Diretrizes Gerais
* **Biblioteca Oficial**: `@fluentui/react-icons` ou `@fluentui/svg-icons` (Microsoft Fluent System Icons).
* **Proibição de Emojis**: Nenhum emoji Unicode deve ser renderizado na aplicação.
* **Convenção de Estados**:
  * **Estado Inativo / Padrão**: Variante **Regular** (traço de `1.5px` a `2px`), cor `--text-secondary` (`#9E9E9E`) ou `--text-primary` (`#FFFFFF`).
  * **Estado Ativo / Selecionado**: Variante **Filled** (preenchimento sólido) ou **Regular** colorido com `--accent-primary` (`#479EF5`).

### 4.2 Mapeamento Completo de Ícones da Interface

| Contexto / Componente | Ícone Fluent UI (React / SVG) | Tamanho | Cor Token |
| :--- | :--- | :--- | :--- |
| **Header — Ação Adicionar** | `Add24Regular` | `24px` | `--text-secondary` / `--text-primary` |
| **Header — Ação Buscar** | `Search24Regular` | `24px` | `--text-secondary` / `--text-primary` |
| **Search Input — Lupa** | `Search20Regular` | `18px`–`20px` | `--text-secondary` (`#9E9E9E`) |
| **Search Input — Voz** | `Mic20Regular` | `18px`–`20px` | `--text-secondary` (`#9E9E9E`) |
| **Drawer — Tagged** | `Tag24Regular` / `Tag20Regular` | `22px` | `--text-secondary` (`#9E9E9E`) |
| **Drawer — Starred** | `Star24Regular` / `Star20Regular` | `22px` | `--text-secondary` (`#9E9E9E`) |
| **Drawer — Liked** | `ThumbLike24Regular` / `ThumbLike20Regular` | `22px` | `--text-secondary` (`#9E9E9E`) |
| **Drawer — Help and feedback** | `QuestionCircle24Regular` / `QuestionCircle20Regular` | `22px` | `--text-secondary` (`#9E9E9E`) |
| **Drawer — Settings** | `Settings24Regular` / `Settings20Regular` | `22px` | `--text-secondary` (`#9E9E9E`) |
| **Drawer — Presence Check** | `Checkmark12Filled` (dentro de círculo verde) | `10px` | `#000000` sobre `--presence-available` (`#3DB838`) |
| **Settings — Drill-down Chevron** | `ChevronRight16Regular` / `ChevronRight20Regular` | `16px`–`18px` | `--text-secondary` (`#9E9E9E`) |
| **Card — Menu Sobreposto** | `MoreHorizontal20Regular` | `18px` | `--text-primary` (`#FFFFFF`) sobre `#292929` |
| **Card — Ícone de Tipo (Footer)** | `SlideLayout20Filled`, `Mail20Filled`, `DocumentText20Filled` | `24px` | Cores semânticas (`#D24726`, `#0078D4`, `#185ABD`) |
| **Seção — Alternar Grade** | `Grid20Regular` | `20px` | `--text-secondary` (`#9E9E9E`) |
| **Seção — Alternar Lista/Filtro** | `Filter20Regular` / `TextBulletListLtr20Regular` | `20px` | `--accent-primary` (`#479EF5`) |
| **Item de Lista — Menu Mais** | `MoreHorizontal20Regular` | `20px` | `--text-secondary` (`#9E9E9E`) |
| **Item de Lista — Ícone Arquivo** | `DocumentText24Filled`, `SlideLayout24Filled`, `Table24Filled` | `36px` (container) | Cores semânticas (`#185ABD`, `#D24726`, `#107C41`) |
| **FAB — Ação Principal** | `Add24Regular` | `24px` | `--text-on-accent` (`#000000`) |
| **Tab Bar — Home (Ativo)** | `Home24Filled` | `24px` | `--accent-primary` (`#479EF5`) |
| **Tab Bar — Groups (Inativo)** | `PeopleCommunity24Regular` | `24px` | `--text-secondary` (`#9E9E9E`) |
| **Tab Bar — Actions (Inativo)** | `AddCircle24Regular` | `24px` | `--text-secondary` (`#9E9E9E`) |

---

## 5. Espaçamento, Grid e Border Radius

### 5.1 Escala de Espaçamento (Base `4px`)
* `--space-1`: `4px` (distância entre linhas do bloco de perfil; distância entre título e metadado)
* `--space-2`: `8px` (gap entre chips de filtro; distância entre cabeçalho/rodapé de grupo e o card agrupado)
* `--space-3`: `12px` (padding interno do rodapé do card; distância entre avatar e texto)
* `--space-4`: `16px` (margem horizontal padrão da tela `padding-inline: 16px`; padding interno de linhas de configurações)
* `--space-5`: `20px` (espaçamento vertical entre grupos de configurações e seções principais)
* `--space-6`: `24px` (respiro superior/inferior de blocos principais)

### 5.2 Tokens de Arredondamento (`Border Radius`)
* `--radius-xs`: `4px` (detalhes internos de ícones de documentos)
* `--radius-sm`: `6px` (botão quadrado de ação rápida `...` sobreposto no card de destaque)
* `--radius-md`: `8px` (thumbnails da grade de mídia 3x2)
* `--radius-group`: `10px` (blocos agrupados `Inset Grouped Cards` de configurações)
* `--radius-lg`: `12px` (Cards de Destaque do carrossel horizontal e cantos superiores de `Stacked Modal Sheets`)
* `--radius-pill`: `9999px` (barra de busca, chips de filtro, `Toggle Switch`, avatares, badges e FAB)

---

## 6. Especificação de Componentes

### 6.1 Top App Bar & Search Header
* **Superfície**: Fundo `--bg-header` (`#292929`), ocupando toda a largura superior até a base da barra de busca, com `padding: 8px 16px 12px 16px`.
* **Linha Superior (Title Bar)**:
  * Altura: `44px`, alinhamento `flex`, `justify-content: space-between`, `align-items: center`.
  * **Esquerda**: Botão de Avatar circular do usuário (`32px x 32px`, `border-radius: 9999px`, abre o `Navigation Drawer` ao toque) + Título da página (`Files`, `24px` Inter Bold, `#FFFFFF`, `margin-left: 12px`).
  * **Direita**: Dois botões de ícone (`Add24Regular` e `Search24Regular`), área de toque de `40px x 40px`, espaçados em `8px`.
* **Barra de Busca (Search Pill)**:
  * Altura: `36px` a `40px`, `border-radius: 9999px`, fundo `--bg-input` (`#3D3D3D`), `padding: 0 12px`.
  * Esquerda: `Search20Regular` (`#9E9E9E`) + Placeholder `"Search"` (`15px` Inter Regular, `#9E9E9E`).
  * Direita: `Mic20Regular` (`#9E9E9E`). Quando em foco, pode exibir botão textual `"Cancel"` (`15px` Inter Regular, `#9E9E9E`) à direita do input.

### 6.2 Gaveta de Navegação Lateral (`Navigation Drawer / Account Sheet`)
* **Estrutura e Overlay**:
  * Painel lateral deslizante à esquerda (`position: fixed`, `top: 0`, `left: 0`, `bottom: 0`, `z-index: 50`), largura de `86%` a `88%` da viewport (`max-width: 340px`), fundo sólido `--bg-drawer` (`#1F1F1F`), sobre backdrop `--bg-backdrop-scrim` (`rgba(0, 0, 0, 0.60)`).
* **Cabeçalho de Conta (`Account Header`)**:
  * **Switcher Secundário (Topo Direito)**: Avatar circular `30px x 30px`, fundo `--avatar-plum-bg` (`#341A51`), iniciais `"KM"` em `--avatar-plum-text` (`#E2D5F0`), com badge de presença `10px x 10px` em `--presence-available` (`#3DB838`) e `Checkmark12Filled` (`#000000`).
  * **Bloco Principal de Perfil**: Avatar de `44px x 44px` + Nome (`16px` Inter SemiBold, `#FFFFFF`) + E-mail (`13px` Inter Regular, `#9E9E9E`) + Link `"Add or switch accounts"` (`12px` Inter Medium, `#479EF5`).
* **Divisor e Menu**: Divisor `1px solid #2A2A2A` seguido por linhas de `48px` de altura (`padding: 0 18px`, `gap: 18px`) com ícones Fluent Regular `22px` (`#9E9E9E`) e rótulos em `15px` Inter Regular (`#FFFFFF`).

### 6.3 Telas Modais e Configurações Agrupadas (`Stacked Modal Sheet & Inset Grouped Settings`)
* **Apresentação de Sheet Empilhado (`Stacked Sheet`)**:
  * A tela modal apresenta cantos superiores arredondados (`border-radius: 12px 12px 0 0`), revelando no topo uma faixa de `6px` a `8px` do card/sheet anterior (`--accent-sheet-peek: #2F69A3`) sobre o fundo `#000000`.
  * **Barra de Topo do Modal (`Modal Navigation Bar`)**:
    * Altura: `48px` a `52px`, fundo `--bg-sheet-header` (`#1F1F1F`), `padding: 0 16px`, `display: grid`, `grid-template-columns: 1fr auto 1fr`, `align-items: center`.
    * **Esquerda**: Botão de texto `"Back"` (`15px` Inter Regular, `--text-secondary` `#9E9E9E`).
    * **Centro**: Título da tela modal (`"Privacy Settings"`, `16px` Inter SemiBold, `#FFFFFF`, centralizado).
  * **Corpo da Tela (`Sheet Body`)**:
    * Fundo contínuo `--bg-sheet-canvas` (`#141414`), `padding: 16px 0 32px 0`.
* **Identificador de Conta Contextual (`Account Context Row`)**:
  * Linha compacta no topo do corpo (`padding: 4px 28px 16px 28px`, `display: flex`, `align-items: center`, `gap: 10px`).
  * Mini avatar circular (`20px x 20px`) + e-mail da conta (`13px` Inter Regular, `#9E9E9E`, ex.: `"cballinger@constoso.com"`).
* **Grupos de Configurações (`Inset Grouped Section`)**:
  * **Rótulo de Cabeçalho do Grupo (`Group Header`)**: Texto acima do card (`padding: 0 28px 8px 28px`), `12px` Inter Regular (`#9E9E9E`). Ex.: `"Connected experiences"`, `"More"`, `"Search"`.
  * **Container do Grupo (`Inset Card`)**:
    * `margin: 0 16px`, `border-radius: 10px` (`--radius-group`), fundo `--bg-settings-group` (`#292929`), `overflow: hidden`.
    * Quando possui múltiplas linhas, utiliza um divisor horizontal interno de `1px solid #2E2E2E` (`--border-group-inner`) com `margin-left: 16px`.
  * **Texto Explicativo de Rodapé (`Group Footer Description`)**:
    * Posicionado abaixo do card (`padding: 8px 28px 4px 28px`), `12px` Inter Regular (`#9E9E9E`), `line-height: 16px`.
* **Variantes de Linha de Configuração (`Settings Row Variants`)**:
  * Altura mínima de `48px`, `padding: 12px 16px`, `display: flex`, `align-items: center`, `justify-content: space-between`, `gap: 12px`.
  * **Variante 1 — Linha com Switch (`Toggle Row`)**:
    * Esquerda: Rótulo em `15px` Inter Regular (`#FFFFFF`, ex.: `"Optional Connected Experiences"`).
    * Direita: **Componente `Toggle Switch`**:
      * Dimensões do trilho (track): `50px x 30px`, `border-radius: 9999px`.
      * Estado Ativo (`checked`): Trilho em `--accent-primary` (`#479EF5`), knob circular de `26px x 26px` em `--toggle-thumb` (`#FFFFFF`) deslocado à direita (`right: 2px`).
      * Estado Inativo (`unchecked`): Trilho em `--bg-input` (`#3D3D3D`), knob circular de `26px x 26px` em `#FFFFFF` deslocado à esquerda (`left: 2px`).
  * **Variante 2 — Linha de Navegação (`Drill-down Row`)**:
    * Esquerda: Rótulo em `15px` Inter Regular (`#FFFFFF`, ex.: `"View Diagnostic Data on Windows"`, `"Privacy Statement"`).
    * Direita: Ícone `ChevronRight16Regular` em `--text-secondary` (`#9E9E9E`).
  * **Variante 3 — Linha de Ação Destrutiva (`Destructive Row`)**:
    * Esquerda: Rótulo em `15px` Inter Regular na cor semântica `--text-danger` (`#D15E69`, ex.: `"Clear Search History"`).
    * Direita: Ícone `ChevronRight16Regular` em `--text-secondary` (`#9E9E9E`).

### 6.4 Carrossel Horizontal de Cards de Destaque (`Featured File Cards`)
* **Container**: `display: flex`, `overflow-x: auto`, `scroll-snap-type: x mandatory`, `padding: 14px 16px 8px 16px`, `gap: 10px`.
* **Card (`Featured Card`)**: Largura `68%`–`72%` da viewport (`border-radius: 12px`, fundo `#1F1F1F`).
  * **Preview Superior**: Thumbnail (`~68%` da altura) com botão sobreposto (`top: 8px`, `right: 8px`, `28px x 28px`, `border-radius: 6px`, fundo `rgba(41, 41, 41, 0.90)`, ícone `MoreHorizontal20Regular` em `#FFFFFF`).
  * **Footer Inferior**: Fundo `#1F1F1F`, `padding: 10px 12px`, ícone semântico `24px` + Título (`14px` Inter Medium, `#FFFFFF`) + Subtítulo (`12px` Inter Regular, `#9E9E9E`).

### 6.5 Barra de Filtros Horizontais (`Filter Chips`)
* **Container**: `display: flex`, `overflow-x: auto`, `padding: 12px 16px`, `gap: 8px`, fundo `#000000`.
* **Chips**: Altura `32px`, `padding: 0 16px`, `border-radius: 9999px`. Ativo em `#479EF5` com texto `#000000` (`600`); Inativo em `#292929` com texto `#9E9E9E` (`500`); Desabilitado em `#222222` com texto `#5E5E5E`.

### 6.6 Cabeçalho de Seção e Lista de Arquivos (`Section Header & File List`)
* **Cabeçalho de Seção**: Título `16px` Inter SemiBold (`#FFFFFF`) à esquerda; ícones `Grid20Regular` (`#9E9E9E`) e `Filter20Regular` (`#479EF5`) ou link `"View all"` (`#479EF5`) à direita.
* **Linha de Arquivo**: `min-height: 60px`, `padding: 10px 16px`, ícone semântico `36px x 36px` à esquerda, título `15px` (`#FFFFFF`) + metadado `12px` (`#9E9E9E`) ao centro, e `MoreHorizontal20Regular` (`#9E9E9E`) à direita. Rodapé `"See More"` em `#479EF5` e divisor `1px solid #1A1A1A`.

### 6.7 Grade de Mídia (`Media Grid`), FAB e Bottom Tab Bar
* **Grade de Mídia**: Grid 3 colunas (`repeat(3, 1fr)`), `gap: 6px`, `padding: 0 16px 24px 16px`, thumbnails `1:1` com `border-radius: 8px`.
* **FAB**: `52px x 52px`, circular, fixo em `right: 16px`, `bottom: 76px`, fundo `#479EF5`, ícone `Add24Regular` em `#000000`.
* **Bottom Tab Bar**: Altura `56px`, fundo `#131313` / `rgba(19, 19, 19, 0.85)` com `blur(20px)`, borda superior `1px solid #1B1B1B`, 3 abas (`Home` ativo em `#479EF5`, `Groups` com badge `#B10E1C` e `Actions` em `#9E9E9E`).

---

## 7. Variáveis CSS Prontas para Uso (`:root`)

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

:root {
  /* Tipografia */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

  /* Superfícies (Escada de Luminância Dark Mode) */
  --bg-canvas: #000000;
  --bg-nav-solid: #131313;
  --bg-nav-translucent: rgba(19, 19, 19, 0.85);
  --bg-sheet-canvas: #141414;
  --bg-drawer: #1F1F1F;
  --bg-sheet-header: #1F1F1F;
  --bg-card: #1F1F1F;
  --bg-surface-disabled: #222222;
  --bg-header: #292929;
  --bg-settings-group: #292929;
  --bg-surface-pill: #292929;
  --bg-card-overlay-btn: rgba(41, 41, 41, 0.90);
  --bg-surface-hover: #333333;
  --bg-input: #3D3D3D;
  --bg-backdrop-scrim: rgba(0, 0, 0, 0.60);

  /* Acento e Marca */
  --accent-primary: #479EF5;
  --accent-primary-hover: #62ABF5;
  --accent-primary-pressed: #2886DE;
  --accent-sheet-peek: #2F69A3;
  --accent-subtle-bg: rgba(71, 158, 245, 0.15);

  /* Texto, Controles e Ícones */
  --text-primary: #FFFFFF;
  --text-secondary: #9E9E9E;
  --text-disabled: #5E5E5E;
  --text-on-accent: #000000;
  --text-link: #479EF5;
  --text-danger: #D15E69;
  --toggle-thumb: #FFFFFF;

  /* Semânticas, Presença, Avatares e Divisores */
  --status-danger-bg: #B10E1C;
  --status-danger-text: #FFFFFF;
  --presence-available: #3DB838;
  --avatar-plum-bg: #341A51;
  --avatar-plum-text: #E2D5F0;
  --indicator-unread: #FFFFFF;
  --filetype-doc-blue: #185ABD;
  --filetype-slide-orange: #D24726;
  --filetype-sheet-green: #107C41;
  --filetype-mail-blue: #0078D4;
  --filetype-mail-cyan: #28A8EA;
  --border-subtle: #1A1A1A;
  --border-nav-top: #1B1B1B;
  --border-drawer-divider: #2A2A2A;
  --border-group-inner: #2E2E2E;

  /* Raios de Borda */
  --radius-xs: 4px;
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-group: 10px;
  --radius-lg: 12px;
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
