import React from 'react';
import { useDraggable } from '@dnd-kit/core';

export function Draggable(props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'draggable',
  });

  // Add passive: true to the touch event listeners
  const touchListeners = {
    onTouchStart: listeners.onTouchStart,
    onTouchMove: listeners.onTouchMove,
    onTouchEnd: listeners.onTouchEnd,
    onTouchCancel: listeners.onTouchCancel,
  };

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <label
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...touchListeners}
      onTouchStart={(e) => e.preventDefault()} // Prevent default to disable touch scrolling during drag
    >
      {props.children}
    </label>
  );
}
