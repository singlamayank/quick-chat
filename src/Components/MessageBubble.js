import React from 'react'
import AppCard from './AppCard'

function MessageBubble({alignLeft, message}) {
  return (
    <div style={{margin: '10px 0' }}>
      <AppCard
        style={{
          maxWidth: "70%",
          backgroundColor: alignLeft ? "#000" : "#0004",
          margin: alignLeft ? "0 auto 0 0" : "0 0 0 auto",
          display: 'table',
        }}
      ></AppCard>
    </div>
  );
}

export default MessageBubble