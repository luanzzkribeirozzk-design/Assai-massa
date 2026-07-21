# Academia Fitness — Site

Site institucional da Academia Fitness, construído em React + Vite. Pronto para subir
no GitHub e publicar na Vercel.

## Rodando localmente

```bash
npm install
npm run dev
```

Abra o endereço mostrado no terminal (geralmente http://localhost:5173).

## Build de produção

```bash
npm run build
npm run preview
```

## Publicando no GitHub

```bash
git init
git add .
git commit -m "Site Academia Fitness"
git branch -M main
git remote add origin <URL_DO_SEU_REPOSITORIO>
git push -u origin main
```

## Publicando na Vercel

1. Acesse vercel.com e faça login com sua conta do GitHub.
2. Clique em "Add New Project" e selecione o repositório que você acabou de criar.
3. A Vercel detecta automaticamente que é um projeto Vite — não precisa mudar nada.
4. Clique em "Deploy". Em poucos minutos o site estará no ar com um link público.

## Onde editar as informações

Quase todo o conteúdo (telefone, planos, preços, horários, links de Instagram e mapa)
fica centralizado em `src/constants.js` — para atualizar valores ou horários, edite
esse arquivo.

As imagens da academia ficam em `public/images`. Para trocar ou adicionar fotos, basta
substituir os arquivos dessa pasta e ajustar os nomes referenciados em
`src/components/Hero.jsx`, `About.jsx` e `Gallery.jsx`.

## Fluxo de planos pelo WhatsApp

Ao clicar em "Escolher plano", abre-se um formulário pedindo o nome da pessoa. Ao
confirmar, o site monta uma mensagem com nome, plano e valor, e abre o WhatsApp já
com a mensagem preenchida, pronta para enviar ao número da academia.
