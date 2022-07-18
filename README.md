## Avant de commencer

Afin que la Dapp fonctionne correctement, il vous faut au préalable : 

* Un compte [Infura](https://infura.io/)
* Un compte [Moralis](https://moralis.io/)
* Un compte **Metamask** sous le réseau Ropsten
* Node.js installé sur votre machine
* [Truffle](https://trufflesuite.com/)

## Installation

Pour commencer, faites un `git clone` du projet dans le répertoire que vous désirez
Puis munissez-vous de :
* L'id de votre compte Infura
* De votre [mnemonic](https://metamask.zendesk.com/hc/en-us/articles/4404722782107) Metamask
* De votre adresse Metamask (par défaut ce sera l'account 1) 
* De l'adresse du contrat que vous pouvez récupérer lors du déploiement du contrat
* Du serveur et de l'id de votre compte Moralis

Ensuite créé un fichier à la racine de votre projet nommé `.env`
Puis renseignez-le comme ceci:

```bash
INFURA_ID= "L'id de votre Infura (sans les '')"
//Les lignes qui suivent devront être entre guillemet
MNEMONIC="Votre mnémonic"
NEXT_PUBLIC_OWNER="Votre adresse Metamask"
NEXT_PUBLIC_CONTRACT_ADDRESS="L'adresse du contrat déployé (disponible une fois que vous aurez déployé votre contrat)"
NEXT_PUBLIC_MORALIS_ID="L'id Moralis"
NEXT_PUBLIC_MORALIS_SERVER="Le serveur Moralis"
```

## Démarrage
Faites un `truffle migrate --network ropsten` puis récupéré l'adresse du contrat et renseigné le dans le `.env`sous `NEXT_PUBLIC_CONTRACT_ADDRESS`

Ensuite entrer la commande `npm install` et lancer le serveur `npm run dev`

### Navigation

Vous pouvez à présent vous rendre sur l'adresse de votre localhost et commencer à tester l'application

Enjoy ! :partying_face:
