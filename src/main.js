import './style.css'

const $button = document.querySelector('button')
const $sortie = document.querySelector('.sortie')

const loadCsv = async (file) => {
	try {
		const response = await fetch(file);
		if (!response.ok) {
			throw new Error('Erreur lors du chargement du fichier CSV');
		}
    const myData = {
      sujets: [],
      verbes: [],
      complements: []
    }
		const text = await response.text();
		const rows = text.trim().split(/\r?\n/);
		const data = rows.map(row => row.split(','));
    data.splice(0,1);
    data.forEach(row => {
      myData.sujets.push(row[0])
      myData.verbes.push(row[1])
      myData.complements.push(row[2])
    })
		return myData;
	} catch (error) {
		console.error(error);
    $sortie.innerText = "Erreur système"
		return null;
	}
}


const myArray = await loadCsv('jeu-des-phrases.csv')

console.log(myArray.sujets)

$button.addEventListener('click', e => {
  e.preventDefault();
  generatePhrase()
})

const generatePhrase = () => {
	// Tire au sort un index pour chaque tableau
	const sujet = myArray.sujets[Math.floor(Math.random() * myArray.sujets.length)];
	const verbe = myArray.verbes[Math.floor(Math.random() * myArray.verbes.length)];
	const complement = myArray.complements[Math.floor(Math.random() * myArray.complements.length)];
	const phrase = `${sujet} ${verbe} ${complement}`;
	$sortie.innerText = phrase
	// Tu peux aussi afficher la phrase dans le DOM ici si besoin
}