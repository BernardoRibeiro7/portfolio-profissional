# Deploy do Portfólio na Vercel

## Antes de começar

Confirme que os arquivos do projeto estão no repositório:

`https://github.com/BernardoRibeiro7/portfolio-profissional`

## Deploy

1. Entre em https://vercel.com/ e faça login com o GitHub.
2. Clique em **Add New** e depois **Project**.
3. Localize `portfolio-profissional` e clique em **Import**.
4. Mantenha o **Root Directory** como `./`.
5. Se a Vercel perguntar o framework, selecione **Other**.
6. Não é necessário configurar Build Command para este projeto.
7. Clique em **Deploy**.
8. Abra o endereço gerado pela Vercel e teste:
   - menu;
   - alternância PT/EN;
   - timeline de projetos;
   - links externos;
   - tema claro/escuro;
   - responsividade no celular;
   - formulário de contato.

## Envio direto de e-mail (opcional)

Sem configuração extra, o formulário abre o aplicativo de e-mail do visitante. Para enviar diretamente pelo site:

1. Crie uma conta no Resend e gere uma API key.
2. No projeto da Vercel, abra **Settings → Environment Variables**.
3. Adicione:

```text
RESEND_API_KEY = sua_chave_do_resend
CONTACT_TO_EMAIL = ribeiromachadobernardo@gmail.com
CONTACT_FROM_EMAIL = Portfolio Bernardo <onboarding@resend.dev>
```

4. Faça um novo deploy.

> Para produção real, o ideal é verificar um domínio no Resend e substituir `onboarding@resend.dev` por um remetente do seu domínio.

## Depois do deploy

Atualize o `README.md` e substitua:

`ADICIONE_AQUI_O_LINK_DA_VERCEL_APÓS_O_DEPLOY`

pelo endereço real da Vercel.
