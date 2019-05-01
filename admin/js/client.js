const clientsArea = document.querySelector('.clients');

async function getData(url) {
	const response = await fetch(url, {
		method: 'GET',
		headers: new Headers({
			'Authorization': window.location.search.split("=")[1].toString()
		})
	});
	return await response.json();
}

async function patchUser(url) {
	const response = await fetch(url, {
		method: 'PATCH',
		headers: new Headers({
			'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
			'Authorization': window.location.search.split("=")[1].toString()
		})
	});
	return await response.json();
}

function displayClients() {
	getData('http://localhost:3000/api/v1/users')
	.then(data => {
		if (Object.prototype.toString.call(data.data) === '[object Array]') {
			const dat = data.data;
			for (let i = 0; i < dat.length; i++) {
				clientsArea.insertAdjacentHTML('beforeend',
				`
				<li class="clients-card">
				<div class="card-text">
				<h5 class="user_name">${dat[i].firstname.toUpperCase()} ${dat[i].lastname.toUpperCase()}</h5>
				<h5 class="user_name">${dat[i].email}</h5>
				</div>
				<div class="description">
					<h6 class="work_address"><span class="work_address_text">Work Address: </span><span class="work_address_">${dat[i].workaddress}</span></h6>
				</div>
				<div class="description">
					<h6 class="home_address"><span class="home_address_text">Home Address: </span><span class="home_address_">${dat[i].homeaddress}</span></h6>
				</div>
				<div class="description">
					<h6 class="created_at"><span class="created_text">Created at: </span><span class="data">${dat[i].createdOn}</span></h6>
				</div>
				<div class="description">
					<h6 class="verified"><span class="status_text">Status: </span><span class="status_value">${dat[i].status}</span></h6>
				</div>
				<div class="description">
					<h6 class="actions_verify"><span class="action_text">Verify Client: </span><span class="yes">Yes</span> </h6>
				</div>
				</li>
				`)
			}
			verifyUser();
			const status_value = document.querySelectorAll('.status_value');
			status_value.forEach(function(e) {
				if (e.textContent === 'verified') {
					e.style.backgroundColor = '#4CAF50'
					e.parentElement.parentElement.parentElement.lastElementChild.style.display = 'none'
				}

				if (e.textContent === 'unverified') {
					e.style.backgroundColor = '#F44336'
				}
			})
		} else {
			clientsArea.insertAdjacentHTML('beforeend', '<h4> No Data </h4');
		}
		console.log(data)
	})
	.catch(error => console.error(error));
}

function verifyUser() {
	const yes = document.querySelectorAll('.yes');
	yes.forEach(function (l) {
		l.onclick = function (e) {
			const email = e.target.parentElement.parentElement.parentElement.children[0].children[1].textContent
			patchUser(`http://localhost:3000/api/v1/users/${email}/verify`)
			.then(data => {
				data
			})
			.catch(error => error);
			window.location.reload(true);
		}
	})
}

displayClients();
