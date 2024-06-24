import React, { useState } from 'react';
import Wheel from './components/Wheel';

function App() {
  const [numSegments, setNumSegments] = useState(0);
  const [segments, setSegments] = useState([]);
  const [tempSegment, setTempSegment] = useState('');

  const handleNumSegmentsChange = (event) => {
    setNumSegments(event.target.value);
    setSegments(Array.from({ length: event.target.value }, () => ''));
  };

  const handleSegmentChange = (index, change) => {
    const newSegments = [...segments];
    newSegments[index] = event.target.value;
    setSegments(newSegments)
  }

  const handleAddSegment = (event) => {
    event.preventDefault();
    const updatedSegments = [...segments];
    if (tempSegment && updatedSegments.length < numSegments) {
      updatedSegments[updatedSegments.length] = tempSegment;
      setSegments(updatedSegments);
      setTempSegment('');
    }
  };

  return (
    <div className="App">
      <h1>Spin the Wheel</h1>
      <form>
        <input
          type="number"
          value={numSegments}
          onChange={handleNumSegmentsChange}
          placeholder="Number of segments"
          min="1"
          max="10"
          required
        />
      </form>
      {Array.from({ length: numSegments }, (_, index) => (
        <form key={index} onSubmit={handleAddSegment}>
          <input
            type="text"
            value={segments[index]}
            onChange={(e) => handleSegmentChange(index, e)}
            placeholder={`Enter segment ${index + 1} text`}
            required
          />
        </form>
      ))}
      <Wheel segments={segments.filter((seg) => seg)} />
    </div>
  );
}

export default App;
