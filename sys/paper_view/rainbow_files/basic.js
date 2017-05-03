$(function () {

  // var RECORDER_APP_ID = "recorderApp";
  var $level, currentObj;
  var TIME_LIMIT = 61;
  var limitId;

  var appWidth = 24;
  var appHeight = 24;
  var flashvars = {'upload_image': '/exam/static/newVersion/new_images/icon_record_upload.png'};
  var params = {};
  // var attributes = {'id': RECORDER_APP_ID, 'name': RECORDER_APP_ID};
  // embedSWF each .flash-content
  $(".recorder .flash-content").each(function(index, element) {
      var RECORDER_APP_ID = $(this).attr("id");
      var attributes = {'id': RECORDER_APP_ID, 'name': RECORDER_APP_ID};
      swfobject.embedSWF("/exam/static/newVersion/js/FlashWavRecorder/recorder.swf", RECORDER_APP_ID, appWidth, appHeight, "11.0.0", "", flashvars, params, attributes);
  });


  $(".recorder .start-recording").click(function() {
      $level = $(this).parents(".recorder").find(".progress");
      currentObj = $(this).parents(".questionsContent");
      var uploadObj = $(this).parents(".recorder").find(".upload");
      var currentId = $(uploadObj).find("object").attr("id");
      FWRecorder.uploadFormId = "#uploadForm_" + currentId;
      FWRecorder.uploadFieldName = "upload_file";
      FWRecorder.connect(currentId, 0);
      FWRecorder.record('audio', 'audio.wav');
  });

  $(".recorder .stop-recording").click(function() {
      currentObj = $(this).parents(".questionsContent");
      var uploadObj = $(this).parents(".recorder").find(".upload");
      var currentId = $(uploadObj).find("object").attr("id");
      $("#uploadForm_"+currentId).find("input[name=exam_results_id]").val(exam_results_id);
      $("#uploadForm_"+currentId).find("input[name=exam_info_id]").val(exam_info_id);
      FWRecorder.uploadFormId = "#uploadForm_" + currentId;
      FWRecorder.uploadFieldName = "upload_file";
      FWRecorder.connect(currentId, 0);
      FWRecorder.stopRecording('audio');
  });
  // $(".recorder .start-playing").click(function() {
  //     currentObj = $(this).parents(".questionsContent");
  //     var uploadObj = $(this).parents(".recorder").find(".upload");
  //     var currentId = $(uploadObj).find("object").attr("id");
  //     FWRecorder.uploadFormId = "#uploadForm_" + currentId;
  //     FWRecorder.uploadFieldName = "upload_file";
  //     FWRecorder.connect(currentId, 0);
  //     FWRecorder.playBack('audio');
  // });

  // remove recorde
  $(".audio-list .glyphicon-remove").click(function(e) {
      e.stopPropagation();
      e.preventDefault();
      var question_id=$(this).parents(".questionsContent").attr("questionsId");
      var pobj=$(this).parent(".audio-row");
      var audio_url=$(pobj).find("audio").attr("src");
      $.ajax({
          type: "POST",
          url: "/exam/attachment_operate/?method=remove",
          dataType:"json",
          data:"exam_results_id="+exam_results_id+"&question_id="+question_id+"&audio_url="+audio_url,
          success:function(msg) {
              if(msg.msg=="true"){
                  $(pobj).remove();
              }
          }
      });
  });

  window.fwr_event_handler = function fwr_event_handler() {
    var name, $controls;
    switch (arguments[0]) {
      case "ready":
        FWRecorder.recorderOriginalWidth = appWidth;
        FWRecorder.recorderOriginalHeight = appHeight;
        break;

      case "microphone_user_request":
        FWRecorder.showPermissionWindow();
        break;

      case "permission_panel_closed":
        FWRecorder.defaultSize();
        break;

      case "recording":
        FWRecorder.hide();
        FWRecorder.observeLevel();
        limitId = setTimeout(function() {
                FWRecorder.stopRecording('audio');
            },TIME_LIMIT*1000);
        break;

      case "recording_stopped":
        FWRecorder.show();
        FWRecorder.stopObservingLevel();
        $level.css({height: 0});
        clearTimeout(limitId);
        break;

      case "microphone_level":
        $level.css({height: arguments[1] * 100 + '%'});
        break;

      case "save_pressed":
        $(currentObj).find(".uploading").css("display","inline-block");
        FWRecorder.updateForm();
        break;

      case "saving":
        name = arguments[1];
        // console.info('saving started', name);
        break;

      case "saved":
        name = arguments[1];
        var response = arguments[2];
        var msg = JSON.parse(response);
        if(msg.msg=='true'){
            $(currentObj).find(".audio-list").append("<div class='audio-row'><audio controls src='"+ msg.audio_url +"'></audio><span class='glyphicon glyphicon-remove' aria-hidden='true'></span></div>");
            $(currentObj).find(".uploading").hide();
            var questionsId = $(currentObj).attr("questionsId");
            $("#numberCardDom a.questions_"+questionsId).removeClass("icon_answer_no").addClass("icon_answer_answered");
            $("#numberCardDom a.questions_"+questionsId).parent("dd").removeClass("s1").addClass("s2");
            FWRecorder.hide();
            // remove recorde
            $(".audio-list .glyphicon-remove").click(function(e) {
                e.stopPropagation();
                e.preventDefault();
                var question_id=$(this).parents(".questionsContent").attr("questionsId");
                var pobj=$(this).parent(".audio-row");
                var audio_url=$(pobj).find("audio").attr("src");
                $.ajax({
                    type: "POST",
                    url: "/exam/attachment_operate/?method=remove",
                    dataType:"json",
                    data:"exam_results_id="+exam_results_id+"&question_id="+question_id+"&audio_url="+audio_url,
                    success:function(msg) {
                        if(msg.msg=="true"){
                            $(pobj).remove();
                        }
                    }
                });
            });
        }
        // console.info('saving success', name, response);
        break;

      case "save_failed":
        name = arguments[1];
        var errorMessage = arguments[2];
        // console.info('saving failed', name, errorMessage);
        break;

      case "save_progress":
        name = arguments[1];
        var bytesLoaded = arguments[2];
        var bytesTotal = arguments[3];
        // console.info('saving progress', name, bytesLoaded, '/', bytesTotal);
        break;
    }
  };


  // function recorderEl(id) {
  //   return $('#' + id);
  // }

});
