# Tarefas do projeto

> Usado para controle do desenvolvimento

## Guide

- [Development Guide](https://github.com/ipetinate/clingon/blob/main/doc/DEVELOPMENT_README.md)
- [Contribution Guide](https://github.com/ipetinate/clingon/blob/main/doc/CONTRIBUTION_GUIDE.md)
- [Templates Variants](https://github.com/ipetinate/clingon/blob/main/doc/TEMPLATES.md)
- [Development Taks](https://github.com/ipetinate/clingon/blob/main/doc/TASKS.md)

## Tecnologias utilizadas

- Node.js
- Node Test Runner para testes
- Inquirer.js para prompt de perguntas no console
- Commander.js para gerenciamento dos comandos de terminal e helper da lib

## Funcionalidades a serem desenvolvidas

- [x] Instalação de ferramental necessário (inquirer, commander, etc)
- [x] Configuração inicial dos testes de unidade (node:test)
- [x] Configuração inicial do commander.js
- [x] Ferramental para lidar com arquivos
- [x] Ferramental para lidar com diretórios
- [x] Utilitários para texto (conversores de case, extensões de arquivos, etc)
- [x] Utilitários para configuração global
- [x] Utilitários para execução de callbacks com variações
- [x] Gerador de componentes (versão básica)
- [x] Templates iniciais de Vue
- [x] Templates iniciais de React
- [x] Templates iniciais de funções TS
- [x] Templates iniciais de funções JS
- [ ] Templates iniciais de stories TS
- [ ] Templates iniciais de stories JS
- [x] Templates iniciais de testes TS (Vitest)
- [x] Templates iniciais de testes JS (Vitest)
- [x] Templates iniciais de testes TS (Jest)
- [x] Templates iniciais de testes JS (Jest)
- [ ] Ação do fluxo guiado - Em andamento
- [ ] Perguntar e Salvar predefinições do prompt executado localmente na pasta `/.clingon`
- [ ] Ação do fluxo avançado - Em espera
- [ ] Oferecer templates locais no fluxo avançado
- [ ] Utilizar config global para parametrizar a ferramenta (caso omitido, usar a embarcada na raiz do projeto)

## Funcionalidades para o futuro ou para analise de necessidade

- [ ] Adicionar novos frameworks como Solid, Svelte, Astro, etc
- [ ] Permitir templates de qualquer tipo lendo os arquivos na pasta `/.clingon`
- [ ] Geração completa de projetos
- [ ] Adicionar opções de estilos em componentes (tailwind, css-in-js, css modules, etc)

## Necessidades do projeto

- [ ] Configurar algum bundler (webpack, esbuild, sei lá qual, o que resolver o problema e tornar a ferramenta simples de operar)
- [ ] Verificar a necessidade de migrar para typescript (não sei se precisa, mas podemos ver isso)
- [ ] Mockar alguns recursos nos testes de unidade que usam métodos do sistema (path, fs, etc)
- [ ] Implementar testes para os fluxos (vai ser mais complicado e precisa dos mocks para evitar criar coisas dentro do projeto)
