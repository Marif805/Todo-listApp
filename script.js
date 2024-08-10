document.addEventListener('DOMContentLoaded',()=>{

    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const todoCount = document.getElementById('todo-count');
    
    let todos = [];
    
    todoForm.addEventListener('submit',(e)=>{
        // console.log(e);
        e.preventDefault();
        const newTodo = {
            id : Date.now(),
            text: todoInput.value,
            completed : false 
        };
        // console.log(newTodo);
        todos.push(newTodo);
        todoInput.value='';
        renderTodos();
    });
    
    todoList.addEventListener('click', (e) => {
        //  const id = e.target.parentElement;
        const id = parseInt(e.target.parentElement.parentElement.dataset.id);
        // console.log(id);    
         if(e.target.classList.contains('delete-btn')){
             todos = todos.filter(todo => todo.id !== id);
         }else if(e.target.classList.contains('tick-btn')){
             const todo = todos.find(todo => todo.id === id);
             todo.completed = !todo.completed;
         }
         renderTodos();
    });
 

    function renderTodos(){
        todoList.innerHTML = '';
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.className = `todo-item${todo.completed ? ' completed' : ''}`;
            li.dataset.id = todo.id;
            li.innerHTML =`
            <span>${todo.text}</span>
            <div class="buttons">
                 <button class="tick-btn">&#10003;</button>
                 <button class="delete-btn">&times;</button>
            </div>
            `;
            todoList.appendChild(li);
        });
        updateTodoCount();
    }
    
    function updateTodoCount(){
        const remainingTodos = todos.filter(todo=> !todo.completed).length;
        todoCount.textContent = `${remainingTodos} tasks left`;
    }
});