
$(document).ready(function () {
    loadbranches(0);
    //loadstudents(0);
    loadCounts(0);
    LoadAllStdTODropDown();
    //loadStudents();
    $("#stu").prop('disabled', true);
    $("#btnAddStd").prop('disabled', true);
})

function loadbranches() {
   

    var ajaxConfig = {
        method:'GET',
        url: 'http://localhost:8080/api/lectures',
        async: true
    };

    $.ajax(ajaxConfig).done(function (resp, status, jqXHR) {
        $("#tblbranches2 tbody tr").remove();
        for (var i = 0; i < resp.length; i++) {
          


                        var html = '<tr>' +
                            '<td>' + resp[i].id +'</td>' +
                            '<td>' + resp[i].lesson +'</td>' +
                            '<td>' + resp[i].date +'</td>' +
                            '<td>' + resp[i].time +'</td>' +
                            '<td>' + resp[i].venue +'</td>' +
                            '<td>' + resp[i].instructor +'</td>' +
                            //'<td><a href=\"manage-branches-report.html?id='+eid+'\"><i class="fas fa-file-alt" style="font-size:24px;color:blue"></a></i></td>'+
                            '<td><i class="fas fa-trash-alt" style="font-size:24px;color:red"></i></td>'+
                            '</tr>';
                        $("#tblbranches2 tbody").append(html);

                        // document.getElementById("pass").innerHTML=pass;
                        // document.getElementById("part").innerHTML=tot;
                        // document.getElementById("fail").innerHTML=fail;
                        // document.getElementById("totab").innerHTML=ab;
                        //document.getElementById("totpend").innerHTML=pen;
                    }
    }).fail(function (jqXHR, status, error) {
        console.log(error)
    })
};

function loadCounts() {

    var ajaxConfig3 = {
        method:'GET',
        url: 'http://localhost:8080/api/branches/counts',
        async: true
    };

    $.ajax(ajaxConfig3).done(function (branches, status, jqXHR) {

        var gam=branches.gampaha;
        var yak=branches.yakkala;
        var hiri=branches.hiripitiya;

        $("#gam").html(gam);
        $("#yak").html(yak);
        $("#hiri").html(hiri);

        $("#tot").html(Number(hiri)+Number(gam)+Number(yak));

        var gamPer=Number(gam)/(Number(hiri)+Number(gam)+Number(yak)*100+'%');
        var yakmPer=Number(yak)/(Number(hiri)+Number(gam)+Number(yak)*100+'%');
        var hiriPer=Number(hiri)/(Number(hiri)+Number(gam)+Number(yak)*100+'%');

        $("#gamPer").html(gamPer);
        $("#yakPer").html(yakmPer);
        $("#hiriPer").html(hiriPer);
      
        
    }).fail(function (jqXHR, status, error) {
        console.log(error)
    })
};
$("#btnSave").click(function () {

    var id = $("#lec").val();
    var name = $("#les").val();
    var add = $("#dat").val();
    var doe = $("#tim").val();
    var email = $("#ven").val();
    var contact = $("#ins").val();


    if(($("#btnSave").text().localeCompare("Update"))==0){
        updateexam();
        //window.location.reload();
        return;
    }

   
    var lecture={
      
        lesson: name,
        date: add,
        time: doe+":00",
        venue: email,
        instructor: contact
        
    }
   

    var ajaxConfig = {
        method:'POST',
        url: 'http://localhost:8080/api/lectures',
        async: true,
        contentType: 'application/json',
        data:JSON.stringify(lecture)
    };

    $.ajax(ajaxConfig).done(function (response, status, jqXHR) {
       
        var html = '<tr>' +
                        '<td>' + lecture.id +'</td>' +
                        '<td>' + lecture.lesson +'</td>' +
                        '<td>' + lecture.date +'</td>' +
                        '<td>' + lecture.time +'</td>' +
                        '<td>' + lecture.venue +'</td>' +
                        '<td>' + lecture.instructor +'</td>' +
                        '<td><i class="fas fa-trash-alt"></i></td>'+
                        '</tr>';
                    $("#tblbranches2 tbody").append(html);
                    $("#lec, #les, #dat, #tim, #ven", "#ins").val("");
                    if(response){
                        myReload();
                    }
                    $("#name").focus();
    }).fail(function (jqXHR, status, error) {
        console.log(error)
    })

});


$("#tblbranches2").delegate("tr","click", function () {

    $('#std').attr("disabled", false);
    $("#stu").prop('disabled', false);
    $("#btnAddStd").prop('disabled', false);

    var id = $(this).children("td").first().text();
    var name = $(this).children("td:nth-child(2)").first().text();
    var address = $(this).children("td:nth-child(3)").first().text();
    var doe = $(this).children("td:nth-child(4)").first().text();
    var email = $(this).children("td:nth-child(5)").first().text();
    var contact = $(this).children("td:nth-child(6)").first().text();

    loadStudents(id);


    $("#lec").val(id);
    $("#les").val(name).focus();
    $("#dat").val(address);
    $("#tim").val(doe);
    $("#ven").val(email);
    $("#ins").val(contact);
    $("#btnSave").text("Update");
});

async function updateexam() {

    var id = $("#lec").val();
    var name = $("#les").val();
    var add = $("#dat").val();
    var doe = $("#tim").val();
    var email = $("#ven").val();
    var contact = $("#ins").val();

    

    var lecture={
        id : id,
        lesson: name,
        date: address,
        time: email+":00",
        venue: doe,
        instructor: contact
        
    }

    var ajaxConfig = {
        method:'PUT',
        url: 'http://localhost:8080/api/lectures/'+id,
        async: true,
        contentType: 'application/json',
        data:JSON.stringify(lecture)
    };

    
    $.ajax(ajaxConfig).done(function (response, status, jqXHR) {
    
        $("#lec").val("");
        $("#les").val("").focus();
        $("#dat").val("");
        $("#tim").val("");
        $("#ven").val("");
        $("#ins").val("");
        $("#btnSave").text("Save");
        
        if(response){
            myReload();
        }
     
        
    }).fail(function (jqXHR, status, error) {
        console.log(error)
    })
    
}


$("#tblbranches2").on("click", "tbody tr td:last-child i",function () {
    if(confirm("Are sure you want to delete this Lecture ?")){
        var row = $(this).parents("tr");
       
        //alert('http://localhost:8080/api/branches?id='+row.find("td:first-child").text());

        var ajaxConfig = {
            method:'DELETE',
            url: 'http://localhost:8080/api/lectures/'+row.find("td:first-child").text(),
            async: true
        };

        $.ajax(ajaxConfig).done(function (response, status, jqXHR) {
           row.fadeOut(1000, function () {
               row.remove();
           });
           window.location.reload();
        }).fail(function (jqXHR, status, error) {
            alert("Fail")
        })

       
    }   
});

// $("#tblbranches2").on("click", "tbody tr td:eq(4)",function () {

    
   
//         var row = $(this).parents("tr");
//         alert('manage-branches-report.html?id='+row.find("td:first-child").text());
//         window.location.href = 'manage-branches-report.html?id='+row.find("td:first-child").text();

// });

function initializePagination(totalElement) {
    var totalPages = parseInt(totalElement/ 5 +(((totalElement% 5) !== 0)? 1: 0));

    $(".page-item").remove();

    var html = '<li class="page-item"><a class="page-link" href="javascript:void(0)">&laquo;</a></li>';

    for (var i=0; i<totalPages;i++){
        html+='<li class="page-item"><a class="page-link" href="#">'+ (i+1) +'</a></li>';
    }

    html +='<li class="page-item"><a class="page-link" href="javascript:void(0)">&laquo;</a></li>';

    $(".card-footer .pagination").html(html);

    $(".card-footer .pagination .page-item:first-child").click(function () {
        loadbranches(0);
    });

    $(".card-footer .pagination .page-item:last-child").click(function () {
        loadbranches(totalPages - 1);
    });

    $(".card-footer .pagination .page-item").click(function () {
        var number = parseInt($(this).find("a").text());
        if(number){
            loadbranches( number -1);
        }
    }) 

}
//

function myReload() {
    window.location.reload();
  }

  //....................................................................................................................................


  $("#btnSave").click(function () {

    var id = $("#lec").val();
    var name = $("#les").val();
    var add = $("#dat").val();
    var doe = $("#tim").val();
    var email = $("#van").val();
    var contact = $("#ins").val();


    if(($("#btnSave").text().localeCompare("Update"))==0){
        updateexam();
        //window.location.reload();
        return;
    }

   
    var std={
      
        studentId: $("#stu").val(),
        lectureId: $("#lec").val()           
    }
   

    var ajaxConfig = {
        method:'POST',
        url: 'http://localhost:8080/api/lectures/student/'+$("#stu").val()+"/"+$("#lec").val(),
        async: true,
        contentType: 'application/json',
        data:JSON.stringify(std)
    };

    $.ajax(ajaxConfig).done(function (response, status, jqXHR) {
       
        var html = '<tr>' +
                        '<td>' + std.studentId +'</td>' +
                        '<td>' + std.lectureId +'</td>' +
                        
                        '<td><i class="fas fa-trash-alt"></i></td>'+
                        '</tr>';
                    $("#tblbranches3 tbody").append(html);
                    $("#lec, #les, #dat, #tim, #ven", "#ins").val("");
                    if(response){
                        myReload();
                    }
                    $("#name").focus();
    }).fail(function (jqXHR, status, error) {
        console.log(error)
    })

});

function LoadAllStdTODropDown() {
    var ajaxConfig = {
      method: "GET",
      url: "http://localhost:8080/api/students",
      async: true,
    };

    $.ajax(ajaxConfig).done(function (stds, status, jqXHR) {
  
        $("#stu").empty();
        $("#stu").append("<option></option>");
  
        for (var i = 0; i < stds.length; i++) {
          var option = document.createElement("option");
          var student = document.getElementById("stu");
          option.text = stds[i].name;
          option.value = stds[i].id;
          //student.appendChild(option);
          $("#stu").append("<option>"+stds[i].id+'-'+stds[i].name+"</option>");
        }
      })
      .fail(function (jqXHR, status, error) {
        console.log(error);
      });
  }

  function loadStudents(x) {
  
    if(x==null || x=="" || x==0){
        x=1;
    }

    var ajaxConfig = {
        method:'GET',
        url: 'http://localhost:8080/api/lectures/'+x,
        async: true
    };

    $.ajax(ajaxConfig).done(function (obj, status, jqXHR) {
        
        $("#tbl1 tbody tr").remove();

        let stud=obj.students;
        for (var i = 0; i < stud.length; i++) {

           
                        var html = '<tr>' +
                            '<td>' + stud[i].id +'</td>' +
                            '<td>' + stud[i].name +'</td>' +
                            '<td>' + stud[i].branch.contact +'</td>' +
                            '<td>' + stud[i].contact +'</td>' +
                            '<td>' + stud[i].email +'</td>' +
                            '<td><i class="fas fa-envelope" style="font-size:24px;color:blue"></i></td>'+
                            //'<td><a href=\"manage-branches-report.html?id='+eid+'\"><i class="fas fa-file-alt" style="font-size:24px;color:blue"></a></i></td>'+
                            '<td><i class="fas fa-trash-alt" style="font-size:24px;color:red"></i></td>'+
                            '</tr>';
                        $("#tbl1 tbody").append(html);

                      
                    }
    }).fail(function (jqXHR, status, error) {
        console.log(error)
    })
};

$("#btnAddStd").click(function () {
   
    let x=$("#stu").val().substring(0,1);
    let y=$("#lec").val();

    alert(x);
    alert(y);
  
    var ajaxConfig = {
        method:'GET',
        url: 'http://localhost:8080/api/lectures/add/'+x+'/'+y,
        async: true
    };

    alert(ajaxConfig.url);

    $.ajax(ajaxConfig).done(function (response, status, jqXHR) {
    
                    $("#lec, #les, #dat, #tim, #ven", "#ins").val("");
                    if(response){
                        var html = '<tr>' +
                        '<td>' +x+'</td>' +
                        '<td>' + response.name +'</td>' +
                        '<td>' + response.branch.name +'</td>' +
                        '<td>' + response.contact +'</td>' +
                        '<td>' + response.email +'</td>' +
                        
                        '<td><i class="fas fa-envelope" style="font-size:24px;color:blue"></i></td>'+
                        '<td><i class="fas fa-trash-alt"></i></td>'+
                        '</tr>';
                    $("#tbl1 tbody").append(html);
                        //myReload();
                        //window.location.href='manage-lectures.html'
                    }
                    $("#les").focus();
    }).fail(function (jqXHR, status, error) {
        console.log(error)
    })

});



$("#tbl1").on("click", "tbody tr td:eq(5) i",function () {
   
    if(confirm("Are sure you want to send the Email ?")){
        var row = $(this).parents("tr");
       
        alert('http://localhost:8080/api/mail/'+row.find("td:eq(4)").text()+'/'+'your next lecture is on'+$("#dat").val());

        var ajaxConfig = {
            method:'GET',
            url: 'http://localhost:8080/api/mail/'+row.find("td:eq(4)").text()+'/'+'your next lecture is on'+$("#dat").val(),
            async: true
        };

        $.ajax(ajaxConfig).done(function (response, status, jqXHR) {
           row.fadeOut(500, function () {
               alert('Email Sent');
           });
           
        }).fail(function (jqXHR, status, error) {
            alert("Email Sent");
        })

       
    }   
});