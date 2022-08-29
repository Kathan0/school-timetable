function getStudent(){
    var str = `<iframe src="./student.html" name="targetframe" class="htmlPage" allowTransparency="false" scrolling="yes" frameborder="100%" >
    <br>
    </iframe>`;
    document.getElementById("iframeDiv").innerHTML = '';
    document.getElementById("iframeDiv").innerHTML = str;
}
function getTeacher(){
    var str = `<iframe src="./teacher.html" name="targetframe" class="htmlPage" allowTransparency="false" scrolling="yes" frameborder="100%" >
    <br>
    </iframe>`;
    document.getElementById("iframeDiv").innerHTML = '';
    document.getElementById("iframeDiv").innerHTML = str;
}
function getAdmin(){
    var str = `<iframe src="./admin.html" name="targetframe" class="htmlPage" allowTransparency="false" scrolling="yes" frameborder="100%" >
    <br>
    </iframe>`;
    document.getElementById("iframeDiv").innerHTML = '';
    document.getElementById("iframeDiv").innerHTML = str;
}

function onSubmitStudent(){
    var name = document.getElementById("Username").value;
    var password = document.getElementById("Password").value;
    const data = {name: name, password: password, type:"login"};
    const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      }

    const URL = `http://localhost:4000/user`;
    axios.post(URL, data, config)
    .then(res=>{
        var data = res.data;
        switch(data.message){
            case 1:{
                localStorage.setItem("ID", data.id);
                console.log(localStorage);
                // var loc = window.location.pathname;
                // var dir = loc.substring(0, loc.lastIndexOf('/'));
                // dir += "/course.html";
                // location.href = dir;
                break;
            }
            case -1:{
                alert("Please fill details completely");
                break
            }
            case 0:{
                alert("INCORRECT! Name and password not matching")
                break;
            }
        }


    })
    .catch(err=>console.log(err))
}

function onSubmitTeacher(){
    
    var name = document.getElementById("Username").value;
    var password = document.getElementById("Password").value;
    var data = {name: name, password: password}
    let config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json; charset=utf-8"
        }
      }
    let URL = `http://localhost:4000/teacher`;

    axios.get(URL, data, config)
    .then(res=>{
        var data = res.data;
        console.log(data);
    })
    .catch(err=>console.group(err))
    
}
function onSubmitAdmin(){
        
    var name = document.getElementById("Username").value;
    var password1 = document.getElementById("Password1").value;
    var password2 = document.getElementById("Password2").value;
    var data = {name: name, password1: password1, password2: password2}
    let config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      }
    let URL = `http://localhost:4000/teacher`;

    axios.get(URL, data, config)
    .then(res=>{
        var data = res.data;
        console.log(data);
    })
    .catch(err=>console.group(err))
}