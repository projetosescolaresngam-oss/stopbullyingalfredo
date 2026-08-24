# 📋 Relatório Geral de Desenvolvimento do Projeto

**Projeto**: **StopBullying: Tecnologia e empatia unidas na prevenção ao bullying na EEMTI Alfredo Machado**  
**Evento**: Ceará Científico 2026 (EEMTI Alfredo Machado — Madalena/CE)  
**Autores**: Enzo Gabriel da Silva Braga e Josué Gomes Pereira | **Orientador**: Prof. Antonio Victor Batista da Silva  
**Área**: Robótica, Automação e Aplicação das TIC | **Categoria**: Categoria I – Ensino Médio (Escola em Tempo Integral)  
**Data do Relatório**: 24 de Agosto de 2026  

---

## 📑 Visão Geral

Desenvolvemos uma solução tecnológica completa e inovadora em conformidade com o Regulamento do **Ceará Científico 2026** e embasada na **Lei Federal nº 13.185/2015**, **Lei nº 14.811/2024** (Programa Escola Mais Segura / Tipificação no Código Penal) e no **ECA (Lei nº 8.069/1990)**. O projeto aborda a subnotificação de casos de bullying e cyberbullying (que afeta **40% dos estudantes brasileiros de 13 a 17 anos** segundo a PeNSE/IBGE 2024, e com **60,5% de vitimizados** identificados no diagnóstico local com $n=38$), oferecendo canais seguros, anônimos e imediatos de acolhimento emocional, triagem por semáforo de gravidade e socorro emergencial com GPS e modo camuflado Pac-Man.

---

## 🚀 Linha do Tempo e Módulos Desenvolvidos

### 1. 📢 Denúncia Anônima Criptografada
- Formulário 100% anônimo com gerador de protocolo único de acompanhamento (ex: `#STP-89F2A`).
- Suporte para anexo e gravação de mídias (foto, vídeo e áudio de até 60s).
- Criptografia e salvamento no banco de dados Supabase com fallback automático no `LocalStorage`.

### 2. 🚦 Triagem Inteligente (Semáforo de Gravidade)
- Algoritmo de classificação automática em:
  - 🟢 **Verde (Leve)**: Conflito pontual, mediação escolar simples.
  - 🟡 **Amarelo (Recorrente)**: Conflito frequente, suporte da psicologia escolar.
  - 🔴 **Vermelho (Grave)**: Risco à integridade, acionamento imediato da gestão escolar e conselho tutelar.

### 3. 💚 Apoio Emocional & Respiração Guiada (4-7-8)
- Exercício de respiração guiada (Técnica 4-7-8) com animações SVG/CSS e temporizador relaxante.
- Gerador de mensagens inspiradoras com síntese por voz e acionamento direto ao CVV (188) e Disque 100.

### 4. 📚 Quiz Educativo & Estatísticas PeNSE / IBGE
- Quiz pedagógico com perguntas e gabarito explicativo baseado na Lei nº 13.185/2015 e Lei nº 14.811/2024.
- Dados do diagnóstico escolar da EEMTI Alfredo Machado (Madalena/CE).

### 5. 🚨 Socorro Emergencial SOS com GPS & Modo Camuflagem (Pac-Man Retro Arcade)
- Transmissão instantânea das coordenadas GPS (Latitude / Longitude).
- **🕹️ Modo Camuflagem (Jogo Pac-Man)**: Transforma instantaneamente a interface do aplicativo em um minigame retrô jogável de **Pac-Man com controles D-Pad touch/mobile**, permitindo privacidade total em situações de risco.

### 6. 🔬 Central Ceará Científico 2026
- Visualizador interativo em alta definição do Banner Oficial de Feira Científica (90 × 120 cm).
- Acesso ao Resumo, Diagnóstico Escolar e Metodologia da EEMTI Alfredo Machado (Madalena/CE).

### 7. 🔒 Painel de Gestão da Equipe Escolar
- Interface para a coordenação e orientador acompanharem denúncias, alterarem status e gerenciarem relatórios.

---

## 🗂️ Estrutura de Arquivos do Repositório (`c:\Projeto Victor`)

```text
c:\Projeto Victor/
├── 📄 index.html                      # Aplicação Principal PWA (SPA)
├── 🎨 styles.css                      # Design System, Animações e Responsividade
├── ⚡ app.js                          # Lógica Interativa, Pac-Man Canvas e GPS
├── 🔌 supabase_client.js              # Conector Supabase + Fallback LocalStorage
├── 🗄️ supabase_schema.sql             # Script SQL com Tabelas e Políticas RLS
├── ⚙️ sw.js                            # Service Worker para Cache e Uso Offline
├── 📋 manifest.json                   # Web App Manifest PWA (Instalação Nativa)
├── 🔒 gestaoequipestop.html           # Painel Gerencial da Equipe Escolar
├── 🖼️ banner_stopbullying_ceara_...html # Visualizador do Banner Científico 90x120cm
├── 📄 RELATORIO_PROJETO.md            # Relatório Geral do Projeto
├── 📖 README.md                       # Guia Principal do Repositório
├── 🖼️ Stop Bullying.jpeg               # Logo e Favicon Oficial
├── 🖼️ Stop Bullying 2.jpeg             # Banner de Topo da Interface
├── 🖼️ Stop Bullying 3.jpeg             # Banner Vertical / Ícone PWA (512x512)
│
└── 📁 elaboracao_projeto/             # MATERIAIS DE ELABORAÇÃO & DOCUMENTAÇÃO
    ├── 📄 PRD_ESPECIFICACAO_TECNICA.md # Requisitos Técnicos e Especificação
    ├── 📄 Olá Somos estudantes.txt     # Apresentação do Projeto e Links
    ├── 📕 Regulamento CEARÁ CIENTÍFICO 2026.pdf # Regulamento Oficial
    └── 📁 StopBullying_CearaCientifico2026_COMPLETO/ # Acervo da Pesquisa
```

---

## ✅ Conclusão

Todos os arquivos estão salvos, atualizados e prontos para apresentação na feira científica, testes em campo e avaliação pelas bancas examinadoras do **Ceará Científico 2026**.
