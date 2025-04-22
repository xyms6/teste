# Backend do Sistema de Achados e Perdidos

Este é o backend do sistema de Achados e Perdidos, desenvolvido com Spring Boot.

## Requisitos

- Java 17
- Maven
- PostgreSQL
- Conta Gmail (para envio de emails)
- Projeto configurado no Google Cloud Console (para autenticação com Google)

## Configuração

1. Clone o repositório
2. Configure o banco de dados PostgreSQL
3. Crie um banco de dados chamado `achados_perdidos`
4. Configure as variáveis de ambiente no arquivo `application.properties`:

```properties
# Database
spring.datasource.url=jdbc:postgresql://localhost:5432/achados_perdidos
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha

# JWT
jwt.secret=sua_chave_secreta_muito_longa_e_segura_aqui
jwt.expiration=86400000

# Email (Gmail)
spring.mail.username=seu_email@gmail.com
spring.mail.password=sua_senha_de_app

# Google OAuth2
google.client.id=seu_client_id_do_google
google.client.secret=seu_client_secret_do_google
```

### Configuração do Gmail

1. Acesse sua conta Google
2. Vá em Gerenciar sua Conta Google > Segurança
3. Ative a verificação em duas etapas
4. Gere uma senha de app para o sistema
5. Use esta senha no `application.properties`

### Configuração do Google OAuth2

1. Acesse https://console.cloud.google.com
2. Crie um novo projeto
3. Configure as credenciais OAuth2
4. Adicione as URIs de redirecionamento autorizadas
5. Copie o Client ID e Client Secret para o `application.properties`

## Executando o Projeto

1. Instale as dependências:
```bash
mvn install
```

2. Execute o projeto:
```bash
mvn spring-boot:run
```

O servidor estará disponível em `http://localhost:8080/api`

## Endpoints

### Autenticação

- `POST /users/register` - Registro de usuário
- `POST /users/login` - Login
- `POST /users/google` - Login com Google
- `POST /users/forgot-password` - Solicitar redefinição de senha
- `POST /users/reset-password` - Redefinir senha
- `POST /users/send-email` - Enviar email

## Segurança

- Autenticação JWT
- Senhas criptografadas com BCrypt
- CORS configurado
- Proteção contra CSRF desativada (para APIs REST) 