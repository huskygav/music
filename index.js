let container = document.querySelector(`.albums`);

for (let i=0; i<albums.length;i++)
    container.innerHTML += `
    <div class="col">
        <div class="card">
            <a href="album.html?i=${i}" class="text-decoration-none">
                <img src="${albums[i].img}" class="card-img-top" height="300px">
            <div class="card-body">
                <p class="card-title">${albums[i].title}</p>
            </div>
            </a>
        </div>
    </div>
    `