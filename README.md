Smart City TecnoVille - APIAPI RESTful desenvolvida em Django e Django Rest Framework para o monitoramento de sensores urbanos da escola TecnoVille.  
Credenciais de TesteO sistema possui controle de permissões baseado no perfil do usuário:  
Administrador (CRUD Completo):Usuário: senai   Senha: 123   
Usuário Comum (Apenas Visualização / Read-Only):Usuário: julinhaSenha: 123

Como testar: 
Git clone: https://github.com/juhreisss/smartcity.git
cd smartycity
cd backend 
pip install -r requirements.txt

Configure o banco MySQL no arquivo settings.py.  
Execute as migrações e popule o banco:
Bashpython manage.py migrate
python manage.py populate_db


Como testar com frontend: 
cd frontend 
npm install 
npm run dev


