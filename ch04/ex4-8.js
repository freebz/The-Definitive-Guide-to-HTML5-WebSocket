// 코드 4-8 업데이트를 전송하는 버튼 이벤트

var statusButton = document.createElement("button");
statusButton.textContent = "사용자 상태를 업데이트";
statusButton.onclick = function() {
    var pres = $pres()
    .c("show").t(sel.value).up()
    .c("status").t(statusInput.value);
    connection.send(pres);
}
presenceArea.appendChild(statusButton);
