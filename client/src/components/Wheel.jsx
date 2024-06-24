import React, { useRef, useState, useEffect } from 'react';

function Wheel({ segments }) {
  const canvasRef = useRef(null);
  const [angle, setAngle] = useState(0);
  const [result, setResult] = useState('');

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (canvas && segments.length > 0) {
      const ctx = canvas.getContext('2d');
      const width = canvas.width;
      const height = canvas.height;
      const radius = width / 2;
      const anglePerSegment = (2 * Math.PI) / segments.length;

      ctx.clearRect(0, 0, width, height);

      segments.forEach((segment, index) => {
        const startAngle = index * anglePerSegment;
        const endAngle = (index + 1) * anglePerSegment;

        ctx.beginPath();
        ctx.moveTo(radius, radius);
        ctx.arc(radius, radius, radius, startAngle, endAngle);
        ctx.fillStyle = `hsl(${(index * 360) / segments.length}, 70%, 50%)`;
        ctx.fill();
        ctx.stroke();

        ctx.save();
        ctx.translate(radius, radius);
        ctx.rotate(startAngle + anglePerSegment / 2);
        ctx.textAlign = 'right';
        ctx.fillStyle = 'white';
        ctx.font = 'bold 18px Arial';
        ctx.fillText(segment, radius - 10, 10);
        ctx.restore();
      });
    }
  };

  const spinWheel = () => {
    setResult(''); // Reset result when the wheel starts spinning
    const numSegments = segments.length;
    const randomAngle = Math.random() * 360 + 360 * numSegments; // Ensure at least numSegments full rotations
    setAngle((prev) => prev + randomAngle);
  };


  const calculateResult = () => {
    if (segments.length > 0) {
      const totalAngle = (angle % 360 + 360) % 360; // Ensure the angle is between 0 and 360
      const anglePerSegment = 360 / segments.length;
      const winningIndex = Math.floor(totalAngle / anglePerSegment);
      const winningSegment = (segments.length - winningIndex) % segments.length;
      const correctedWinningSegment = (winningSegment + segments.length - 1) % segments.length; // Adjust for pointer position
      setResult(segments[correctedWinningSegment]);
    }

    // Save to database
    axios.post('http://localhost:5173/api/save', {
      segments,
      result: segments[winningSegment],
    }).then(response => {
      console.log('Data saved:', response.data);
    }).catch(error => {
      console.error('Error saving data:', error);
    });
  };
 

  useEffect(() => {
    drawWheel();
  }, [segments]);

  useEffect(() => {
    drawWheel();
  }, [angle]);

  useEffect(() => {
    const timeout = setTimeout(calculateResult, 4000); // Calculate result after the spinning animation completes
    return () => clearTimeout(timeout);
  }, [angle]);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)' }}>
        ▼
      </div>
      <canvas
        ref={canvasRef}
        width="300"
        height="300"
        style={{ transform: `rotate(${angle}deg)` }}
      ></canvas>
      <button onClick={spinWheel} disabled={segments.length === 0}>
        Spin
      </button>
      {result && <div>Result: {result}</div>}
    </div>
  );
}

export default Wheel;