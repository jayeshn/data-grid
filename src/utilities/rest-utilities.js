import "isomorphic-fetch";

export function httpPost(url, body, config) {
	return new Promise(
		function(resolve, reject) {
			if(!config){
				config = {};
			}
			let fetchConfig = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json, text/javascript, */*; q=0.01',
					'X-Requested-With': 'XMLHttpRequest'
				},
				/*credentials: config.credentials || 'same-origin',
				mode: config.mode || 'cors',
				cache: config.cache || 'no-cache',*/
				body: JSON.stringify(body)
			};
			fetch(url, fetchConfig).then(function(response){
                if(response.ok) {
                    response.json().then(function(jsonResponse) {
                        resolve(jsonResponse);
                    });
                } else {
                    reject(response);
                }
                //throw new Error('Network response was not ok.');
				
			});
		}
	)
}

export function httpGet(url, body, config) {
	return new Promise(
		function(resolve, reject) {
			if(!config){
				config = {};
			}
			let fetchConfig = {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json, text/javascript, */*; q=0.01',
					'X-Requested-With': 'XMLHttpRequest'
				},
				/*credentials: config.credentials || 'same-origin',
				mode: config.mode || 'cors',
				cache: config.cache || 'no-cache'*/
			};
			fetch(url, fetchConfig).then(function(response){
				if(response.ok) {
                    response.json().then(function(jsonResponse) {
                        resolve(jsonResponse);
                    });
                } else {
                    reject(response);
                }
			});
		}
	)
}

export function httpDelete(url, config) {
	return new Promise(
		function(resolve, reject) {
			if(!config){
				config = {};
			}
			let fetchConfig = {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json, text/javascript, */*; q=0.01',
					'X-Requested-With': 'XMLHttpRequest'
				},
				/*credentials: config.credentials || 'same-origin',
				mode: config.mode || 'cors',
				cache: config.cache || 'no-cache',*/
			};
			fetch(url, fetchConfig).then(function(response){
                if(response.ok) {
                    response.json().then(function(jsonResponse) {
                        resolve(jsonResponse);
                    });
                } else {
                    reject(response);
                }
                //throw new Error('Network response was not ok.');
				
			});
		}
	)
}

