
$(document).ready(function () {
    loadbranches(0);
    loadCounts(0);
})

function loadbranches() {
   

    var ajaxConfig = {
        method:'GET',
        url: 'http://localhost:8080/api/branches',
        async: true
    };

    $.ajax(ajaxConfig).done(function (branches, status, jqXHR) {
        $("#tblbranches2 tbody tr").remove();
        for (var i = 0; i < branches.length; i++) {
            let eid=branches[i].id;

            // tot=tot+1;

            // if(ExamReportById[i].examResult=="PASS"){
            //     pass=pass+1;
                
            // }

            // if(ExamReportById[i].examResult=="FAIL"){
            //     fail=fail+1;
            // }

            // if(ExamReportById[i].examResult=="ABSENT"){
            //     ab=ab+1;
            // }

            // if(ExamReportById[i].examResult=="PENDING"){
            //     pen=pen+1;
            // }

                        var html = '<tr>' +
                            '<td>' + branches[i].id +'</td>' +
                            '<td>' + branches[i].name +'</td>' +
                            '<td>' + branches[i].address +'</td>' +
                            '<td>' + branches[i].dateOfEstablished +'</td>' +
                            '<td>' + branches[i].email +'</td>' +
                            '<td>' + branches[i].contact +'</td>' +
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
   
    //alert("rrrrrrrrrrrrrrr");

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

    var id = $("#id").val();
    var name = $("#name").val();
    var add = $("#add").val();
    var doe = $("#doe").val();
    var email = $("#email").val();
    var contact = $("#contact").val();


    if(($("#btnSave").text().localeCompare("Update"))==0){
        updateexam();
        //window.location.reload();
        return;
    }

   
    var branch={
        id : id,
        name: name,
        address: add,
        email: email,
        dateOfEstablished: doe,
        contact: contact
        
    }
   

    var ajaxConfig = {
        method:'POST',
        url: 'http://localhost:8080/api/branches',
        async: true,
        contentType: 'application/json',
        data:JSON.stringify(branch)
    };

    $.ajax(ajaxConfig).done(function (response, status, jqXHR) {
        var html = '<tr>' +
                        '<td>' + branch.id +'</td>' +
                        '<td>' + branch.name +'</td>' +
                        '<td>' + branch.address +'</td>' +
                        '<td>' + branch.dateOfEstablished +'</td>' +
                        '<td>' + branch.contact +'</td>' +
                        '<td><i class="fas fa-trash-alt"></i></td>'+
                        '</tr>';
                    $("#tblbranches2 tbody").append(html);
                    $("#name, #add, #doe, #email, #contact", "#id").val("");
                    if(response){
                        myReload();
                    }
                    $("#name").focus();
    }).fail(function (jqXHR, status, error) {
        console.log(error)
    })

});


$("#tblbranches2").delegate("tr","click", function () {

    var id = $(this).children("td").first().text();
    var name = $(this).children("td:nth-child(2)").first().text();
    var address = $(this).children("td:nth-child(3)").first().text();
    var doe = $(this).children("td:nth-child(4)").first().text();
    var email = $(this).children("td:nth-child(5)").first().text();
    var contact = $(this).children("td:nth-child(6)").first().text();


    $("#id").val(id);
    $("#name").val(name).focus();
    $("#add").val(address);
    $("#doe").val(doe);
    $("#email").val(email);
    $("#contact").val(contact);
    $("#btnSave").text("Update");
});

async function updateexam() {

    var id = $("#id").val();
    var name = $("#name").val();
    var address = $("#add").val();
    var email = $("#email").val();
    var doe = $("#doe").val();
    var contact = $("#contact").val();

    

    var branch={
        id : id,
        name: name,
        address: address,
        email: email,
        dateOfEstablished: doe,
        contact: contact
        
    }

    var ajaxConfig = {
        method:'PUT',
        url: 'http://localhost:8080/api/branches/'+id,
        async: true,
        contentType: 'application/json',
        data:JSON.stringify(branch)
    };

    
    $.ajax(ajaxConfig).done(function (response, status, jqXHR) {
    
        $("#id").val("");
        $("#name").val("").focus();
        $("#doe").val("");
        $("#email").val("");
        $("#contact").val("");
        $("#add").val("");
        $("#btnSave").text("Save");
        
        if(response){
            myReload();
        }
     
        
    }).fail(function (jqXHR, status, error) {
        console.log(error)
    })
    
}


$("#tblbranches2").on("click", "tbody tr td:last-child i",function () {
    if(confirm("Are sure you want to delete this Branch ?")){
        var row = $(this).parents("tr");

        //alert('http://localhost:8080/api/branches?id='+row.find("td:first-child").text());

        var ajaxConfig = {
            method:'DELETE',
            url: 'http://localhost:8080/api/branches/'+row.find("td:first-child").text(),
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

        // $.ajax({
        //     url: 'http://localhost:8080/api/branches?id='+row.find("td:first-child").text(),
        //     type: 'DELETE',
        //     success: function (result) {
        //         alert('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
        //     }
        // });
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
