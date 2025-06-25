const bcrypt = require('bcrypt');

const motDePasseClair = 'premiervraicomptetest';

bcrypt.hash(motDePasseClair, 10)
  .then(hash => {
    console.log('🔐 Mot de passe hashé :', hash);
  })
  .catch(err => console.error(err));
