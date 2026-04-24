# 🍇 Açaíteria Massa - Site Cliente

Site profissional de cardápio e pedidos via WhatsApp.

## 🚀 Início Rápido

```bash
# 1. Instalar dependências
pnpm install

# 2. Iniciar servidor
pnpm dev

# 3. Acessar em http://localhost:3000
```

## ✨ Funcionalidades

- ✅ Cardápio completo com categorias
- ✅ Seleção de componentes personalizáveis
- ✅ Carrinho de compras
- ✅ Pedidos via WhatsApp
- ✅ Design responsivo
- ✅ Imagens profissionais dos produtos

## 🔗 Integração Firebase

O site se conecta ao Firebase para buscar produtos em tempo real:

```javascript
// client/src/lib/firebase.ts
const firebaseConfig = {
  apiKey: "AIzaSyBDFQVFQGXvP6CISwo8kgwauAcSCHIQ_ek",
  authDomain: "assaiteria-f2597.firebaseapp.com",
  projectId: "assaiteria-f2597",
  // ...
};
```

## 📱 Como Funciona

1. **Visualizar Cardápio** - Produtos carregados do Firebase em tempo real
2. **Selecionar Produto** - Clique no produto para abrir modal
3. **Escolher Componentes** - Selecione ingredientes extras
4. **Adicionar ao Carrinho** - Produto adicionado com preço total
5. **Finalizar Pedido** - Preencha dados e envie via WhatsApp

## 🌐 Compartilhado com Admin

- Mesma base de dados Firebase
- Produtos adicionados no Admin aparecem aqui automaticamente
- Preços e disponibilidade sincronizados em tempo real

## 📞 Contato

WhatsApp: 5587988203203 (configurável no Admin)

---

**Desenvolvido para Açaíteria Massa**
