import { useState, useEffect } from "react";

import * as trackService from './services/trackService';

import TrackList from './components/TrackList/TrackList';
import NowPlaying from './components/NowPlaying/NowPlaying';
import TrackForm from './components/TrackForm/TrackForm';

const App = () => {
  const [tracks, setTracks] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const fetchedTracks = await trackService.index();

        if (fetchedTracks.err) {
          throw new Error(fetchTracks.err);
        }
        setTracks(fetchedTracks)
      } catch (err) {
        console.log(err);
      }
    };
    fetchTracks();
  }, []);

  const handleSelect = (track) => {
    setSelected(track);
    setIsFormOpen(false);
  };

  const handleFormView = (track) => {
    if (!track._id) setSelected(null);
    setIsFormOpen(!isFormOpen);
  };

  const handleAddTrack = async (formData) => {
    try {
      const newTrack = await trackService.create(formData);

      if (newTrack.err) {
        throw new Error(newTrack.err);
      }
      setTracks([newTrack, ...tracks])
      setIsFormOpen(false);

    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateTrack = async (formData) => {
    try {
      const updateTrack = await trackService.update(formData, formData._id);

      if (updateTrack.err) {
        throw new Error(updateTrack.err);
      }

      const updatedTrackList = tracks.map((track) => (
        track._id !== updateTrack._id ? track : updateTrack
      ));

      setTracks(updatedTrackList);
      setSelected(updateTrack);
      setIsFormOpen(false);

    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteTrack = async (trackId) => {
    try {
      const deletedTrack = await trackService.deleteTrack(trackId);

      if (deletedTrack.err) {
        throw new Error(deletedTrack.err);
      }

      setTracks(tracks.filter((track) => track._id !== deletedTrack._id));
      setSelected(null);
      setIsFormOpen(false);

    } catch (err) {
      console.log(err);
    }
  };


  return (
    <>
      <TrackList 
      tracks={tracks}
      handleSelect={handleSelect}
      handleFormView={handleFormView}
      isFormOpen={isFormOpen}
      />
      {isFormOpen ? (
      <TrackForm
        handleAddTrack={handleAddTrack}
        selected={selected}
        handleUpdateTrack={handleUpdateTrack}
      />
      ) : (
      <NowPlaying
        selected={selected}
        handleFormView={handleFormView}
        handleDeleteTrack={handleDeleteTrack}
      />
      )}
    </>
  );
};

export default App;
