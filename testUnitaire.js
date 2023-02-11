const objet = {
    frenchName: 'toto',
    romanji: '',
    imageURL: 'ti'
}
console.log(objet);
let requests = Object.entries(objet).map(async ([key, value]) => {
    // Exemple de condition
    if (value !== "") {
      return true;
    } else {
      return false;
    }
  });
  
  Promise.all(requests)
    .then(results => {
      // Déterminer le résultat final en fonction des résultats de chaque requête
      let finalResult = results.every(result => result === true);
  
      // Loguer le résultat final
      console.log(finalResult);
    })
    .catch(error => {
      console.error(error);
    });