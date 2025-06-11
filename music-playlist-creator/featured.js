
fetch("../data/data.json")
  .then(response => response.json())
  .then(data => {
    const playlists = data.playlists; 
    const randomNum = Math.floor(Math.random() * playlists.length); 
    const playlist = playlists[randomNum]; 

    const container = document.getElementById("featured-playlist");
    container.innerHTML = `
      <div class="featured-card">
        <img src="${playlist.playlist_art}" alt="${playlist.playlist_name}">
        <h3>${playlist.playlist_name}</h3>
        <p>By ${playlist.playlist_author}</p>
        <div class="playlist-container"></div>
      </div>
    `;

    const songList = container.querySelector(".playlist-container");

    playlist.songs.forEach(song => {
      const songElement = document.createElement("article"); 
      songElement.className = "song";
      songElement.innerHTML = `
        <p class="song-title">${song.title}</p>
        <p class="song-artist">${song.artist}</p>
        <p class="song-duration">${song.duration}</p>
      `;
      songList.appendChild(songElement); 
    });
  })
  .catch(error => console.error("Error loading JSON:", error));


