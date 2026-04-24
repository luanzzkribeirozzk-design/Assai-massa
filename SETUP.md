# Açaíteria Massa - Site e Painel Admin

## 📋 Descrição

Sistema completo para a Açaíteria Massa com dois sites integrados:

1. **Site Cliente** - Cardápio interativo com pedidos via WhatsApp
2. **Painel Admin** - Gerenciamento completo de produtos, preços e imagens

## 🚀 Configuração Inicial

### 1. Instalar Dependências

```bash
pnpm install
```

### 2. Configurar Firebase

O projeto já está configurado com as credenciais do Firebase. As credenciais estão em:
- `client/src/lib/firebase.ts`

### 3. Popular Banco de Dados (Seed)

Para adicionar os produtos iniciais ao Firebase:

```bash
node seed-products.mjs
```

Este comando criará 10 produtos de exemplo no Firestore.

### 4. Iniciar Servidor de Desenvolvimento

```bash
pnpm dev
```

O servidor iniciará em `http://localhost:3000` (ou porta disponível)

## 🌐 Acessar os Sites

### Site Cliente
- **URL**: `http://localhost:3000/`
- **Funcionalidades**:
  - Visualizar cardápio por categorias
  - Selecionar produtos e componentes
  - Adicionar ao carrinho
  - Finalizar pedido via WhatsApp

### Painel Admin
- **URL**: `http://localhost:3000/admin`
- **Credenciais de Teste**:
  - Email: `admin@acaiteria.com`
  - Senha: `Açaíteria203`
- **Funcionalidades**:
  - Criar, editar e deletar produtos
  - Upload de imagens
  - Ativar/desativar produtos
  - Gerenciar componentes
  - Configurar endereço e WhatsApp

## 📦 Estrutura do Projeto

```
client/
├── src/
│   ├── components/        # Componentes React
│   │   ├── Header.tsx
│   │   ├── ProductCatalog.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductModal.tsx
│   │   ├── Cart.tsx
│   │   ├── CheckoutForm.tsx
│   │   ├── AdminLogin.tsx
│   │   ├── AdminDashboard.tsx
│   │   ├── ProductForm.tsx
│   │   └── ProductList.tsx
│   ├── contexts/          # React Contexts
│   │   ├── CartContext.tsx
│   │   └── ThemeContext.tsx
│   ├── lib/
│   │   ├── firebase.ts    # Configuração Firebase
│   │   └── types.ts       # Tipos TypeScript
│   ├── pages/
│   │   ├── Home.tsx       # Site Cliente
│   │   ├── Admin.tsx      # Painel Admin
│   │   └── NotFound.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
└── index.html

seed-products.mjs          # Script para popular banco
```

## 🎨 Design

O projeto utiliza:
- **Tailwind CSS 4** para estilização
- **shadcn/ui** para componentes
- **Gradientes** com cores: Roxo (#4A1A5C) e Laranja (#FF6B35)
- **Design Tropical Vibrant** com elementos modernos

## 🔐 Autenticação

- **Admin**: Usa Firebase Authentication
- **Cliente**: Sem autenticação (acesso público)

## 📸 Imagens de Produtos

As imagens estão hospedadas no Firebase Storage e CDN. Cada produto tem uma imagem única e de alta qualidade.

## 💬 Integração WhatsApp

Os pedidos são enviados automaticamente para WhatsApp com:
- Nome do cliente
- Endereço de entrega
- Produtos e componentes selecionados
- Valor total

## 🛠️ Tecnologias

- **React 19** - Framework
- **TypeScript** - Tipagem
- **Tailwind CSS 4** - Estilos
- **Firebase** - Backend (Auth, Firestore, Storage)
- **Wouter** - Roteamento
- **Sonner** - Notificações

## 📝 Notas Importantes

1. **Firebase**: Certifique-se de que as regras do Firestore permitem leitura pública e escrita autenticada
2. **Imagens**: Use o Firebase Storage para armazenar imagens de produtos
3. **WhatsApp**: O número padrão é `5587988203203` - configure no Admin conforme necessário
4. **Endereço**: Padrão: `R. José Benício de Araújo, 203, Massaranduba - PB, 58120-000`

## 🚢 Deploy

Para fazer deploy:

1. Build do projeto:
```bash
pnpm build
```

2. Fazer upload para um servidor (Vercel, Netlify, Firebase Hosting, etc.)

## 📞 Suporte

Para dúvidas sobre o projeto, consulte a documentação do Firebase e React.

---

**Desenvolvido com ❤️ para Açaíteria Massa**
