

const NowPlaying = (props) => {
    if (!props.selected) {
        return (
            <div>
                <h1>Nothing Playing</h1>
            </div>
        );
    }
    return (
        <div>
      <h2>Now Playing</h2>
      <div>
      {props.selected.coverArtUrl && (
          <img 
            src={props.selected.coverArtUrl} 
            alt={`${props.selected.title} cover`}
            style={{ maxWidth: '200px', marginBottom: '10px' }}
          />
      )}
        <h3>{props.selected.title}</h3>
        <p>Artist: {props.selected.artist}</p>
        <p>Album: {props.selected.album}</p>
        {props.selected.soundClipUrl && (
          <audio controls src="src/assets/funny-goat-sound-106396.mp3"></audio>
        )}
      </div>
      <div>
      <button onClick={() => props.handleFormView(props.selected)}>
          Edit Track
        </button>
        <button onClick={() => props.handleDeleteTrack(props.selected._id)}>
          Delete Track
        </button>
      </div>
    </div>
    )
}

export default NowPlaying;