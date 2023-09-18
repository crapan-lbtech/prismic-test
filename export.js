const { exec } = require('child_process');
const fs = require('fs');
const fetch = require('node-fetch');


exec('npm run build', (err, stdout, stderr) => {

    if (err) {
        console.error(`Exec error: ${err}`);
        return;
    }

    const bannerFiles = fs.readdirSync('./out')
        .filter(file => file.startsWith('banner') && file.endsWith('.html'))

    bannerFiles.forEach(file => {

        const content = fs.readFileSync(`./out/${file}`, 'utf8');

        const url = `https://dev17-na02-fresh.demandware.net/s/-/dw/data/v23_2/libraries/Fresh-SharedLibrary/content/${file}`;

        const ocapiUrl = 'https://account.demandware.com/dw/oauth2/access_token?grant_type=client_credentials';
        const ocapiToken = 'YTMzNGIxYzAtMjZjZi00N2Q1LTllY2YtNWRjZDdhODFlNWU1OlZhbGVyb25Fc3RlQm9zczEyMzQ=';

        fetch(ocapiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${ocapiToken}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials'
        })
            .then(res => res.json())
            .then(data => {

                const body = {
                    "classification_folder_id": "",
                    "classification_folder_link": "",
                    "description": {
                    },
                    "id": file,
                    "link": "",
                    "name": {
                    },
                    "online": {},
                    "page_description": {},
                    "page_keywords": {},
                    "page_title": {},
                    "page_url": {},
                    "searchable": {},
                    "site_map_change_frequency": {},
                    "site_map_included": {},
                    "site_map_priority": {},
                    "template": "",
                    "c_body": {
                        "default": {
                            "_type": "markup_text",
                            "markup": content,
                            "source": content,
                        },
                    }
                }

                fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${data.access_token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                })
                    .then((response) => {
                        return response.json(); // parse the response body as JSON
                    })
                    .then((data) => {
                        console.log(`Updated ${file}`);
                    })
                    .catch((e) => {
                        console.error(e.message);
                    });
            })
            .catch((e) => {
                console.error(e.message);
            });
    });
});