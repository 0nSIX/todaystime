
    var indexes = [];
    var used = [];
       
    function GetIndex(){
        if(used.length == 0){
            var id = indexes.length+"";
            indexes.push(id);
            return id;
        }        
        
        var id = used.pop();
        indexes.push(id);        
        return id;        
    }
    
    function ResetIndex(id){
        id = id+"";
        indexes.splice(indexes.indexOf(id), 1);
        used.push(id)
    }

    var applicationData = {};
    
    function AddData(id, value){
        applicationData[id] = value;
        window.localStorage.setItem("data", JSON.stringify(applicationData));
    }

    function RemoveData(id){
        delete applicationData[id];
        window.localStorage.setItem("data", JSON.stringify(applicationData));
    }
    
    var applicationDataPulled = JSON.parse(window.localStorage.getItem("data") ?? "{}");
        
    Object.entries(applicationDataPulled).map(e=>{
        var nextId = GetIndex();
        AddData(nextId, e[1]);
        $('ul').append(`<li data-item=${nextId}><span><i class='fa fa-trash'></i></span>`+ e[1] +"</li>");        
    });

    $('.add-btn').click(function(){

        var itemId = GetIndex();
        console.log(itemId);
        
        var inputValue = $('input').val();

        AddData(itemId, inputValue);

        $('ul').append(`<li data-item=${itemId}><span><i class='fa fa-trash'></i></span>`+ inputValue +"</li>");

        $('input').val("");

    });

    $('ul').on("click", 'span', function(){

        var spanParent = $(this).parent();

        spanParent.fadeOut(500,function(){
            console.log(spanParent.attr("data-item"))
            RemoveData(spanParent.attr("data-item"));
            $(this).remove();
        });
    });
    $('.icon').click(function(){
        $('.field').toggleClass("hide");
    })