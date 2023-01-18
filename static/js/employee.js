var edicion =  '<div class="btn-group dropstart" role="group">';
edicion += '<button id="btnGroupVerticalDrop1" type="button"  class="btn btn-sm btn-outline-primary waves-effect waves-light dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">';
edicion += '<i class="fa fa-info-circle"></i>';
edicion += '</button>';
edicion += '<ul class="dropdown-menu" role="menu">';
edicion += '<li><a class="dropdown-item btnEditEmployee" title="Editar Empleado" idEmployee data-toggle="modal" data-target="#modalEditEmployee" href="#">EDITAR</a></li>';
edicion +='</ul>';
edicion +='</div>';

$(document).ready(function() {
    var employeesTable = $('#employeesTable').DataTable({
        responsive: true,
        autoWidth: false,
        destroy : true,
        deferRender: true,
        ajax: {
            url: "get-all/",
            type: "GET",
            dataType: "json",
            contentType: false,
            processData: false,
            dataSrc: "",
        },
        columns: [
            {"data": "full_name"},
            {"data": "dni"},
            {"data": "birth_date"},
            {"data": "email"},
            {"data": "phone_number"},
            {"data": "actions"},
        ],
        columnDefs: [
            {
                targets: [-1],
                class: "text-center",
                orderable: false,
                render: function (data,type,row) {
                    return edicion;
                }
            }
        ],
        language: {
            "emptyTable":"No hay empleados registrados"
        }
    });

    $('#employeesTable tbody').on( 'click', 'a', function () {
        var current_row = $(this).parents('tr');
        if (current_row.hasClass('child')) {
            current_row = current_row.prev();
        }
        var data = employeesTable.row( current_row ).data();
        $(this).attr("idEmployee", data["id"]);
    } );

    $("#btnAddEmployee").on('click', function(e) {
        //e.preventDefault();
        var formData = new FormData($("#frmAddEmployee").get(0));
        $.ajax({
            type: 'POST',
            url: 'create/',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            dataType: 'json',
            success: function(data) {
                if (data.code == 1) {
                    employeesTable.ajax.reload();
                    $("#frmAddEmployee").get(0).reset();
                    $("#modalAddEmployee").modal('hide');
                    alertify.success(data.msg);
                } else {
                    alertify.error(data.msg);
                }
            }
        });
    });

    $('#employeesTable tbody').on("click", ".btnEditEmployee", function () {
        var x = $(this).attr('idEmployee');
   
        $.ajax({
            type: 'GET',
            url: `get/${x}`,
            cache: false,
            contentType: false,
            processData: false,
            dataType: 'json',
            success: function(data) {
                $("#id").val(data["employee"].id);
                $("#EditName").val(data["employee"].full_name);
                $("#EditDni").val(data["employee"].dni);
                $("#EditBirthDate").val(data["employee"].birth_date);
                $("#EditEmail").val(data["employee"].email);
                $("#EditPhone").val(data["employee"].phone_number);
            }
        });
        
    });

    $("#btnEditEmployee").on('click', function() {
        let formData = new FormData($("#frmEditEmployee").get(0));
        
        let id = $("#frmEditEmployee input[id=id]").val();
        $.ajax({
            type: 'POST',
            url: `get/${id}/edit/`,
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            dataType: 'json',
            success: function(data) {
                if (data.code == 1) {
                    employeesTable.ajax.reload();
                    $("#frmEditEmployee").get(0).reset();
                    $("#modalEditEmployee").modal('hide');
                    alertify.success(data.msg);
                } else {
                    alertify.error(data.msg);
                }
            }
        });
    });
});

window.addEventListener('DOMContentLoaded', (e) => {
    /* Obtenemos la fecha de hoy en formato ISO */
    const now = new Date().toISOString().substring(0, 10);
    /* Buscamos solo las etiquetas que tengan el atributo "max" en "now" */
    document.querySelectorAll("input[type='date'][max='now']")
    .forEach(elemento => {
        /* A cada elemento encontrado le asignamos el atributo "max" */
        elemento.max = now;
    });
});