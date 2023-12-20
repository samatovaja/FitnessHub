import React, { useState, useEffect } from 'react';
import { exerciseOptions, fetchData } from '../utils/fetchData';
import { useNavigate } from 'react-router-dom';

const WorkoutSearch = () => {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/home');
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setLoading(true);
        const response = await fetchData(
          `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${searchQuery}`,
          exerciseOptions
        );

        if (!response.headers) {
          console.error('Response headers are undefined.');
          return;
        }

        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          setWorkouts(data);
        } else {
          console.error('Unexpected response format. Content type:', contentType);
        }
      } catch (error) {
        console.error('Error fetching workouts:', error);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery.trim() !== '') {
      fetchWorkouts();
    } else {
      // Reset workouts if the search query is empty
      setWorkouts([]);
    }
  }, [searchQuery]);

  return (
    <div className="search-container">

      <input
        type="text"
        placeholder="Search for workouts..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      <button onClick={navigateToHome} className="back-button">
        Back
      </button>

      {loading && <p>Loading...</p>}

      {workouts.length > 0 && (
        <ul className="results-list">
          {workouts.map((workout) => (
            <li key={workout.id} className="results-item">
              <img src={workout.gifUrl} alt={workout.name} />
              <p>{workout.name}</p>
            </li>
          ))}
        </ul>
      )}

      {workouts.length === 0 && !loading && searchQuery.trim() !== '' && (
        <p>No workouts found.</p>
      )}
    </div>
  );
};

export default WorkoutSearch;
