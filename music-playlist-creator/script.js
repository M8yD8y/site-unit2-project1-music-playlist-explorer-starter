



fetch("../data/data.json")
  .then(response => response.json())
  .then(data => {
    console.log(data.playlists);
    const container = document.querySelector(".playlist-cards");
    data.playlists.forEach(playlist => {
        const card = createPlaylistCard(playlist);
                   container.appendChild(card); 

    });
  })
  .catch(error => console.error("Error loading JSON:", error));

  function createPlaylistCard(playlist){
    const card = document.createElement("article");
    card.className = "playlist-card";
    card.innerHTML = `
        <img src="${playlist.playlist_art}" alt="${playlist.playlist_name}">
         <h3>${playlist.playlist_name}</h3>
        <p>By ${playlist.playlist_author}</p>
        <div class="likes">
         <span class="heart-icon">&#x2665;</span>
         <span class="like-count">${playlist.likes}</span>
        </div>
        <span class="trash-icon">🗑️</span>
        `;

        card.addEventListener("click", (e)=>{
            if(!e.target.classList.contains("heart-icon")){
                openModal(playlist); 
            }
        })
    
   const heart = card.querySelector(".heart-icon");
   const count = card.querySelector(".like-count");
   const trash = card.querySelector(".trash-icon"); 
   heart.addEventListener("click", (e) => {
    e.stopPropagation();
    let n = parseInt(count.textContent, 10);
    const card = heart.closest(".playlist-card");

    if(heart.classList.contains("liked")){
        heart.classList.remove("liked");
        count.textContent = --n;
    
    }else{
        heart.classList.add("liked");
        count.textContent = ++n; 

        card.classList.add("shake");
        setTimeout(() =>{
          card.classList.remove("shake");
        },400);
    }



   });

   trash.addEventListener("click", (e) =>{
    e.stopPropagation();
    card.remove();
   });
   return card; 

  }

  function openModal(playlist){
    const modal = document.querySelector(".modal-overlay");
    const modalImg = document.querySelector(".modal-playlist-cover");
    const modalTitle = document.querySelector(".modal-playlist-name");
    const modalSongContainer = document.querySelector(".playlist-container");
    const modalAuthor = document.querySelector(".modal-artist-name");



    modalImg.src = playlist.playlist_art;
    modalImg.alt = playlist.playlist_name;
    modalTitle.textContent = playlist.playlist_name;
    modalAuthor.textContent = playlist.playlist_author;
    modalSongContainer.innerHTML = "";

    playlist.songs.forEach(song => {
         const songElement = document.createElement("article"); 
         songElement.className = "song";
         songElement.innerHTML = `
         <p class = "song-title">${song.title}</p>
         <p class = "song-artist">${song.artist}</p>
         <p class = "song-duration">${song.duration}</p>
         `;
         modalSongContainer.appendChild(songElement);
    }

    )

    const shuffleBtn = document.querySelector(".shuffle-btn");

    shuffleBtn.addEventListener("click", () => {
        const shuffled = [...playlist.songs].sort(() => Math.random() - 0.5);
        modalSongContainer.innerHTML = "";
        shuffled.forEach(song=>{
            const songElement = document.createElement("article");
            songElement.className = "song"; 
            songElement.innerHTML = `
            <p class = "song-title">${song.title}</p>
            <p class = "song-artist">${song.artist}</p>
            <p class = "song-duration">${song.duration}</p>
                `;
         modalSongContainer.appendChild(songElement);
            
        })


});


    modal.classList.remove("hidden");


  }

document.addEventListener("DOMContentLoaded", ()=>{



const closeModalBtn = document.querySelector(".modal-close");
const modal = document.querySelector(".modal-overlay");

closeModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

modal.addEventListener("click",(e)=>{
    if(e.target === modal){
        modal.classList.add("hidden"); 
    }
}
);

});


