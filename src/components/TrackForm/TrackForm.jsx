import { useState } from 'react';

const TrackForm = (props) => {
  const initialState = {
    title: '',
    artist: ''
  }
  const [formData, setFormData] = useState(
    props.selected ? props.selected : initialState
  )

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (props.selected) {
      props.handleUpdateTrack(formData);
    } else {
      props.handleAddTrack(formData);
    }
    setFormData(initialState);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title"> Title </label>
        <input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <label htmlFor="artist"> Artist </label>
        <input
          id="artist"
          name="artist"
          value={formData.artist}
          onChange={handleChange}
          required
        />
        <label htmlFor="album"> Album </label>
        <input
          id="album"
          name="album"
          value={formData.album}
          onChange={handleChange}
        />
        <label htmlFor="coverArtUrl"> Cover Art URL </label>
        <input
          id="coverArtUrl"
          name="coverArtUrl"
          value={formData.coverArtUrl}
          onChange={handleChange}
        />
        <label htmlFor="soundClipUrl"> Sound Clip URL </label>
        <input
          id="soundClipUrl"
          name="soundClipUrl"
          value={formData.soundClipUrl}
          onChange={handleChange}
        />
        <button type="submit">
          {props.selected ? 'Update Track' : 'Add New Track'}
        </button>
      </form>
    </div>
  );
};

export default TrackForm;