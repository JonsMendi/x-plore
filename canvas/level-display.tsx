import React from 'react';

type LevelDisplayProps = {
  currentLevel: number;
  totalLevels: number;
};

const LevelDisplay: React.FC<LevelDisplayProps> = ({ currentLevel, totalLevels }) => {
  return (
    <div style={{ position: 'absolute', bottom: '20px', right: '20px', color: 'white', fontSize: '18px', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '10px', borderRadius: '5px' }}>
      {currentLevel}/{totalLevels}
    </div>
  );
};

export default LevelDisplay;
