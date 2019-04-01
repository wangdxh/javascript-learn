
function gettext(){
    var content = $("p1")
    alert(content.innerHTML)
    content.innerHTML += 'after change'
}

function gettext2() {
    let content = $('text1')
    alert(content.value)
    content.value = 'jiangdong'
}

function $(id){
    return document.getElementById(id)
}

function createXhr() {
    return new XMLHttpRequest()
}
function request() {
    let xhr = createXhr()
    xhr.onreadystatechange=()=>{
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result = xhr.responseText
            alert(result)
        }
    }
    xhr.open('get', 'http://www.baidu.com', true)
    xhr.send(null)
    
}
