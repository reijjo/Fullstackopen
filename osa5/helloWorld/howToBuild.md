# Frontend kansioon =>
npm run build

## Kopioidaan build kansio backendin root
cp -r build ../server

## Lisaa index.js (tai app.js) fileen:
app.use(express.static('build'))

## Vaihda baseUrl frontin services kansiossa axios fileista
const baseUrl = 'http://localhost:3001/api/notes' => <br />
const baseUrl = '/api/notes'

# Tee uus build!

## mee backend kansioon ja 'npm run start'
