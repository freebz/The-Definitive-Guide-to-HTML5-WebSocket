// 코드 4-6 접속 상태 정보를 업데이트하는 UI

// 접속 상태 정보 업데이트 UI
var presenceArea = document.getElementById("presenceArea");
var sel = document.createElement("select");
var availabilities = ["away", "chat", "dnd", "xa"];
var labels = ["자리 비운", "온라인", "다른 용무 중", "오프라인"];
for (var i=0; i<availabilities.length; i++) {
    var option = document.createElement("option");
    option.value = availabilities[i];
    option.text = labels[i];
    sel.add(option);
}
presenceArea.appendChild(sel);
