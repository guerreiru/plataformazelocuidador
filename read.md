# Plataforma Zelo - PROFISSIONAL

lembrar que para a publicação em DEV ou TESTE deve ser utilizado o parâmetro
--no-publish


## Gerar build local (APK)

- Verificar se está em Homologação `/src/config/index`
- (Android) > `eas build --profile preview --platform android`


## Publicar na loja

- Verificar se está em produção `/src/config/index`
- Mudar as versões: `package.json` e `app.json`
- mudar a versão do codigo em `[app.json].versionCode` incrementar +1

### Codigo:
(Android)
- `eas build --platform android`

