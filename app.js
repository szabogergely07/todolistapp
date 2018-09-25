$(document).ready(function() {
    getTodos();

    function getTodos() {
        $.ajax({
            url: 'https://cors-escape.herokuapp.com/https://gregstodoapi.herokuapp.com/todo'
        }).done(function(todos) {
            let output = '';
            $.each(todos, function(key, value){
                output += `
                <div class="cont_princ_lists">
                  <ul>
                    <li class="list_shopping li_num_0_1">
                      <div class="col_md_1_list">
                        <p>${value.category}</p>
                      </div>
                      <div class="col_md_2_list">
                        <h4>${value.title}</h4>
                        <p>${value.description}</p>
                      </div>
                      <div class="col_md_3_list">
                        <div class="cont_text_date">
                          <p>${value.date}</p>      
                        </div>

                        
                      </div>
                    </li>
                    <div class="row">
                      <div class="col-xs-6">
                        <a href="#" id="delete" data-id="${value.id}" class="btn btn-danger btn-sm">
                          <span class=""></span>X 
                        </a>
                          
                      </div>
                      <div class="col-xs-6">
                        <a href="#newButton" id="update" data-id="${value.id}" class="btn btn-info btn-sm">
                          <span class=""></span>U 
                        </a>
                          
                      </div>
                    </div>
                  </ul>
                <!--   End cont_todo_list_top  --> 
                </div>

                `;
            });
            $('#todoCont').append(output);
        });
    }

    
    $('#addButton').on('click', function(e) {
      e.preventDefault();
      
      var title = $('#title').val();
      var date = $('#date').val();
      var description = $('#description').val();
      var category = $('.category').val();

      var values = {
        title: title,
        date: date,
        description: description,
        category: category
      };

        $.ajax( {
          method: 'POST',
          url: 'https://cors-escape.herokuapp.com/https://gregstodoapi.herokuapp.com/todo',
          data: values
        }).done(function() {
          $("form").trigger("reset");
          $('#todoCont').empty();
          getTodos();
        });

    });
    
 
    $('#updateButton').on('click', function(e) {
      e.preventDefault();
        
      var title = $('#title').val();
      var date = $('#date').val();
      var description = $('#description').val();
      var category = $('.category').val();
      var id = $('#todoId').val();

      var values = {
        title: title,
        date: date,
        description: description,
        category: category,
        id: id,
        _method: 'PUT'
      };

      $.ajax( {
        method: 'POST',
        url: 'https://cors-escape.herokuapp.com/https://gregstodoapi.herokuapp.com/todo/'+id,
        data: values
      }).done(function() {
        $("form").trigger("reset");
        $('#todoCont').empty();
        getTodos();
      });

     

    });

    
 
    $('body').on('click', '#update', function() {
      
      var id = $(this).data('id');
      editTodo(id);
    });

    function editTodo(id) {
      openUpdate();
      
      $.ajax({
          method: 'GET',
          url: 'https://cors-escape.herokuapp.com/https://gregstodoapi.herokuapp.com/todo/'+id,
      }).done(function(result) {
          $('#title').val(result.title);
          $('#date').val(result.date.slice(0,10));
          $('#description').val(result.description);
          $('.category').val(result.category);
          $('#todoId').val(result.id);

      });
      
    }



    $('body').on('click', '#delete', function() {

      var id = $(this).data('id');
    
      $.ajax({
          method: 'POST',
          url: 'https://cors-escape.herokuapp.com/https://gregstodoapi.herokuapp.com/todo/'+id,
          data: {_method: 'DELETE'}
      }).done(function() {
        $('#todoCont').empty();
        getTodos();
      });
      

    });


     
    $('.cont_add_titulo_cont').on('click', function() {
     openNew();

    });
      var t = 0;
      function openNew() {
        $('#updateButton').hide();
        $('#addButton').show();
        $("form").trigger("reset");
      if(t % 2 == 0){  
        document.querySelector('.cont_crear_new').className = "cont_crear_new cont_crear_new_active";

        document.querySelector('.cont_add_titulo_cont').className = "cont_add_titulo_cont cont_add_titulo_cont_active";
        t++;
      } else {  document.querySelector('.cont_crear_new').className = "cont_crear_new";
        document.querySelector('.cont_add_titulo_cont').className = "cont_add_titulo_cont";  
        t++;
      } 

    };

    var t = 0;
      function openUpdate() {
        $('#addButton').hide();
        $('#updateButton').show();
      if(t % 2 == 0){  
        document.querySelector('.cont_crear_new').className = "cont_crear_new cont_crear_new_active";

        document.querySelector('.cont_add_titulo_cont').className = "cont_add_titulo_cont cont_add_titulo_cont_active";
       
      } 

    };


}) 

 


