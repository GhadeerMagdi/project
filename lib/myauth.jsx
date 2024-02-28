
const myauth = {};

myauth.login = function(email, password) {
    const users = [
        { id: 1, name: 'Ghadeer Magdy', email: 'ghadeer@gmail.com', password: '123', role: 'user' , userid:'55'},
        { id: 2, name: 'Mostafa Magdy', email: 'mostafa@gmail.com', password: '456', role: 'admin'  , userid:'66'},
      ];
      const user = users.find((user) => user.email === email && user.password === password);
      return user
}

export default myauth;