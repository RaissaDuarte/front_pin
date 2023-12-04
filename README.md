Equipe: Arthur Espindola da Cruz e Raissa Duarte

Trabalho(https://docs.google.com/document/d/1ZAKqanPCrHwztSUINk_aclFTPTNWCAGoonmFj5f2wKc/edit?usp=sharing)

Para iniciar a aplicação primeiramente no arquivo do Back-end: \Connect_v3, mude o diretório para TotalConnect_v2 através do comando no terminal: cd ./TotalConnect_v2. Seu path deve estar da seguinte forma:
\Connect_v3\TotalConnect_v2.

Uma vez que o seu path esteja configurado vá até \Connect_v3\TotalConnect_v2\src\main\resources\application.properties, e informe o seu username e password do seu Postgres, um exemplo seria assim:

-----------------------------------------------------------------------------------
spring.datasource.url = jdbc:postgresql://localhost:5432/db_TotalConnect-PIN2

spring.datasource.username=postgres <- Seu Usuário
spring.datasource.password=root <- Sua Senha

spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

spring.jpa.hibernate.ddl-auto=update

logging.level.org.hibernate.SQL=DEBUG

spring.thymeleaf.prefix=classpath:/templates/
spring.thymeleaf.suffix=.html

-----------------------------------------------------------------------------------

Uma vez que o seu path esteja configurado e o seu banco também, rode a aplicação do backend com o seguinte comando: mvn spring-boot:run, caso você tenha seguido esse passo a passo, a seguinte mensagem deve aparecer no terminal: 
-----------------------------------------------------------------------------------
2023-12-04T20:31:40.073-03:00  INFO 2108 --- [  restartedMain] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8080 (http) with context path '' <- Porta 8080 sendo utilizada
2023-12-04T20:31:40.214-03:00  INFO 2108 --- [  restartedMain] c.P.T.TotalConnectApplication            : Started TotalConnectApplication in 19.551 seconds (process running for 20.275) <- Aplicação está rodando
-----------------------------------------------------------------------------------

Agora no front-end seu path deve estar da seguinte maneira: \front_pin , agora para iniciar o front, execute esse comando no terminal: npm start, essa deve ser a sua mensagem no terminal: 
------------------------------------------------------------------------------------
Files successfully emitted, waiting for typecheck results...
Issues checking in progress...
No issues found.
------------------------------------------------------------------------------------

No seu navegador deve ter uma guia aberta com a url: http://localhost:3000/ .A sua aplicação está rodando perfeitamente.

Contudo, conforme conversado com o professor, os funcionários serão cadastrados por outros funcionários, ou seja não há nenhum campo de cadastre-se, onde um funcionário novo pode se auto-cadastrar, por isso o funcionário já deve estar salvo no banco previamente. Dessa forma para que você consiga realizar o login de maneira correta, vá até a url:http://localhost:3000/cadastroFuncionario e preencha os campos corretamente e salve esse funcionário, dessa forma o funcionário estará salvo no banco e você poderá realizar o login com base no CPF e Senha cadastrados nesse funcionário.

Seguindo esse passo a passo você estará apto para utilizar o sistema como um todo.