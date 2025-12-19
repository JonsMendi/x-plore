import React from 'react'

const KeyboardLegend: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '40px',
          height: '40px',
          backgroundColor: '#333',
          color: 'white',
          borderRadius: '5px',
          fontSize: '18px',
          fontWeight: 'bold',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
        }}
      >
        W
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        {['A', 'S', 'D'].map((key) => (
          <div
            key={key}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              backgroundColor: '#333',
              color: 'white',
              borderRadius: '5px',
              fontSize: '18px',
              fontWeight: 'bold',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
            }}
          >
            {key}
          </div>
        ))}
      </div>
    </div>
  )
}

export default KeyboardLegend
