# Rspress website

## Setup

Install the dependencies:

```bash
npm install
```

## Get started

Start the dev server:

```bash
npm run dev
```

Build the website for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Guthub action workflow 
deploy.yml

edit clerk error:

sed -i 's/setPackageName({packageName})}/setPackageName({packageName:"@clerk\/clerk-react"})}/' doc_build/static/js/async/799.37d8b129.js
