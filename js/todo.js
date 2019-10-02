$(document)
    .ready(function () {

        var ORIGINAL_TEXT;
        var listID;
        var editorId;
        var FILTER_ID = 'all';

        function generateUUID() {
            /*jshint bitwise:false */
            var i,
                random;
            var uuid = '';

            for (i = 0; i < 32; i++) {
                random = Math.random() * 16 | 0;
                if (i === 8 || i === 12 || i === 16 || i === 20) {
                    uuid += '-';
                }
                uuid += (i === 12
                    ? 4
                    : (i === 16
                        ? (random & 3 | 8)
                        : random)).toString(16);
            }
            return uuid;
        }

        $("#addButton").click(function(){
            var inputTextVal = $('#inputText').val();
            var uuid = generateUUID();
            //Validation if input text is empty
            if (inputTextVal === '' || inputTextVal === null){
                alert("Please add a Todo Item");
                return;
            }
            //Add list
            $("#listItems").append(
                "<li id="+uuid+" class = 'new'>" +
                    "<input name='done-todo' type='checkbox' class='done-todo'> " +
                        "<span id ="+generateUUID()+" class='spanText'>" +inputTextVal+ "</span> </li>"
            );

            //clear text
            $("#inputText").val('');
        });
        function refresh(filterId){
            var id = filterId;
            FILTER_ID = id;

            var listItems = $('#listItems li');
            if(id === 'all'){
                listItems.show();
            }
            else if (id === 'active'){
                listItems.filter(".new").show();
                listItems.filter(".checked").hide();
            }
            else {
                listItems.filter(".new").hide();
                listItems.filter(".checked").show();
            }
            $("#filters li a").removeClass("selected");
            $("#"+filterId).addClass("selected");
        }

        $("#filters li a").click(function() {
            refresh($(this).attr("id"));
        });


        $('#listItems').on('click', "input[type='checkbox']",
            function(){

                if ($(this).is(':checked')) {
                    $(this).parent().removeClass("new");
                    $(this).parent().addClass("checked");
                }
                else{

                    $(this).parent().removeClass("checked");
                    $(this).parent().addClass("new");
                }
                refresh(FILTER_ID);


            });


        $('#listItems').on('dblclick',function(e){
            listID = $(e.target).attr("id");
            //get the text
            ORIGINAL_TEXT = $("#"+listID).find(".spanText").text();
            if (ORIGINAL_TEXT === ''){
                return;
            }
            // hide the span text first
            $("#"+listID).find("span").remove();
            editorId = generateUUID();
            $("#"+listID).append("<input type='text' class='editor' id="+editorId+" value="+ORIGINAL_TEXT+" autofocus>");

            $('#'+editorId).on("focusout mouseout",function() {
                //get the editor ID
                var inputID = $("#"+listID).find("input[type='text']").attr("id");
                //get the value of the editor
                var newText = $("#"+inputID).val();

                if(newText.trim() ==='' ){
                    $("#"+inputID).remove();
                    $("#"+listID).append("<span id="+generateUUID()+" class='spanText'> "+ORIGINAL_TEXT+"</span>")
                }else {
                    $("#"+inputID).remove();
                    $("#" + listID).append("<span id=" + generateUUID() + " class='spanText'> " + newText + "</span>")
                }
                this.remove();
            });

        });





        // code to be implemented
    });