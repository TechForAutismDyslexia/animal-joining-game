import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const initialImages = [
  { id: '1', url: 'https://via.placeholder.com/150' },
  { id: '2', url: 'https://via.placeholder.com/150' },
  { id: '3', url: 'https://via.placeholder.com/150' },
  { id: '4', url: 'https://via.placeholder.com/150' },
];

const ImageDragAndDrop = () => {
  const [images, setImages] = useState(initialImages);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedImages = Array.from(images);
    const [movedImage] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, movedImage);

    setImages(reorderedImages);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable" direction="horizontal">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{ display: 'flex', padding: 8, overflow: 'auto' }}
          >
            {images.map((image, index) => (
              <Draggable key={image.id} draggableId={image.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      userSelect: 'none',
                      padding: 8,
                      margin: '0 8px 0 0',
                      backgroundColor: '#fff',
                      ...provided.draggableProps.style,
                    }}
                  >
                    <img src={image.url} alt={`img-${image.id}`} style={{ width: 150, height: 150 }} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ImageDragAndDrop;
