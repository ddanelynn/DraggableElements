import './App.css';

function App() {
  
  const draggables = document.querySelectorAll('.draggable');
  const containers = document.querySelectorAll('.container');

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
      console.log("dragstart")
      draggable.classList.add('dragging');
    })
    draggable.addEventListener('dragend', () => {
      console.log("dragend")
      draggable.classList.remove('dragging');
    })
  })

  containers.forEach(container => {
    container.addEventListener('dragover', e => {
      e.preventDefault()
      const afterElement = getDragAfterElement(container, e.clientY) 
      const draggable = document.querySelector('.dragging')
      
      if (afterElement == null) {
        container.appendChild(draggable)
      } else {
        container.insertBefore(draggable, afterElement);
      }
    })
  })

  const getDragAfterElement = (container, y) => {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging')]

    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect()
      const offset = (y - box.top - box.height)/2
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child }
      } else {
        return closest
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element
  }

  return (
    <div className="App">
      <div className="container">
        <p className="draggable" draggable="true">1</p>
        <p className="draggable" draggable="true">2</p>
      </div>
      <div className="container">
        <p className="draggable" draggable="true">3</p>
        <p className="draggable" draggable="true">4</p>
      </div>
    </div>
  );
}

export default App;
