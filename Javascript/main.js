if(!localStorage.getItem("users")){
    localStorage.setItem("users",JSON.stringify([]))
}
let user_details=JSON.parse(localStorage.getItem("users"))
function register(){
    let reg_name=document.getElementById("reg_name").value;
    let reg_email=document.getElementById("reg_email").value;
    let reg_password=document.getElementById("reg_pass").value;
    if(reg_password.length<5){
        document.getElementById("reg_pass").style.borderColor="red";
        let b=`<p>${"Password must be 6 characters"}</p>`
        document.getElementById("wrong").innerHTML=b;
    }
    else if(reg_email!="" && reg_password!=""){
        document.getElementById("reg_pass").style.borderColor=''
        document.getElementById("wrong").innerHTML=''
        if(user_details==""){
            let user_list_obj={
                name:reg_name,
                email:reg_email,
                password:reg_password
            }
            user_details.push(user_list_obj)
            localStorage.setItem("users",JSON.stringify(user_details))
            window.location.href='login.html'
        }
        else{
            let reg_value=false
            for(let n in user_details){
                if(reg_email==user_details[n].email){
                    reg_value=true;
                } 
             }
             if(reg_value==true){
                alert("You're already registered please login")
             } 
            else{
                let user_list_obj={
                    name:reg_name,
                    email:reg_email,
                    password:reg_password
                }
                user_details.push(user_list_obj)
                localStorage.setItem("users",JSON.stringify(user_details))
                alert("registration successfull")
                window.location.href='login.html'
            }    
        }     
    }      
    document.getElementById("reg_name").value="";
    document.getElementById("reg_email").value="";
    document.getElementById("reg_pass").value=""; 
}

let admin=localStorage.getItem("adminid")
function login(){
    let log_email=document.getElementById("log_email").value;
    let log_password=document.getElementById("log_pass").value;
    let loginvalue=false;
    for(let each in user_details){
        if(log_email==user_details[each].email && log_password==user_details[each].password){
            loginvalue=true;
        }
    }
    if(loginvalue==true){
        localStorage.setItem("adminid",log_email)
        alert("login sussessful")
        window.location.href="resume.html"
    }
    else if(loginvalue==false){
        alert("email and password is not valid")
    }
}
    function logout(){
        localStorage.setItem("login",)
        let login=localStorage.getItem("login")
        if(login=="sucessful"){
            window.location.href="register.html"
        }
        else{
            window.location.href="login.html"
        }
        }
let resume={
    
    personal_details:{
        languages_known:[]
    },
    educational_qualification:[],
    skills:[],
    projects:[],
    work_experience:[]
}
resume.admin_id=admin;
function generateresume(change,key,p_key){
    if(p_key){
        resume[p_key][key]=change.value
    }
    else{
        resume[key]=change.value
    }      
}
function addList(id,key,p_key){
    let listEach=document.getElementById(id)
    if(p_key){
        resume[p_key][key].push(listEach.value)
    }
    else{
        resume[key].push(listEach.value)
    }
    listEach.value="";  
    addskill(key,p_key)
    
}
function addskill(keyname,p_keyname){
        let add="";
            if(p_keyname){
                for(let each in resume[p_keyname][keyname]){
                    if(resume[p_keyname][keyname][each]!=""){
                        add=add+`<p>${resume[p_keyname][keyname][each]}</p>
                                <button onclick="adddelete(${each},'${keyname}','${p_keyname}')">delete</button>`
                    }
                }
                document.getElementById("addlan").innerHTML=add;
            }
            else{
                for(let each in resume[keyname]){
                    if(resume[keyname][each]!=""){
                         add=add+`<p>${resume[keyname][each]}</p>
                                <button onclick="adddelete(${each},'${keyname}')">delete</button>`
            }
        }
            document.getElementById("additem").innerHTML=add;
            }
}
function adddelete(index,keychange,p_keychange){
    let listskill=[];
    if(p_keychange){
        for(let n in resume[p_keychange][keychange]){
            if(n!=index){
                listskill.push(resume[p_keychange][keychange][n])
            }
        }
        resume[p_keychange][keychange]=listskill;
    }else{
        for(let n in resume[keychange]){
            if(n!=index){
                listskill.push(resume[keychange][n])
            }
        }
    resume[keychange]=listskill;
    }
    addskill(keychange,p_keychange) 
}

function listSave(key,id,firstParam,secondParam,thirdParam,fourthParam,fifthParam){
    let first=document.getElementById(firstParam)
    let second=document.getElementById(secondParam)
    let third=document.getElementById(thirdParam)
    let fourth=document.getElementById(fourthParam)
    let fifth=document.getElementById(fifthParam)
    let details={}
    if(fifthParam){
        details[firstParam]=first.value
        details[secondParam]=second.value
        details[thirdParam]=third.value
        details[fourthParam]=fourth.value
        details[fifthParam]=fifth.value
        fifth.value="";
    }
    else{
        details[firstParam]=first.value
        details[secondParam]=second.value
        details[thirdParam]=third.value
        details[fourthParam]=fourth.value
    }
    
    resume[key].push(details)
    first.value="";
    second.value="";
    third.value=""; 
    fourth.value="";
    eduadd(key,id,firstParam,secondParam,thirdParam,fourthParam,fifthParam)
}

function eduadd(keyvalue,idname,firstin,secondin,thirdin,fourthin,fifthin){
    let edu=""
    if(fifthin){
        for(let each in resume[keyvalue]){
            if(resume[keyvalue][each][firstin]!=""){
                edu=edu+`<tr>
                        <td>${resume[keyvalue][each][firstin]}</td>
                        <td>${resume[keyvalue][each][secondin]}</td>
                        <td>${resume[keyvalue][each][thirdin]}</td>
                        <td>${resume[keyvalue][each][fourthin]}</td>
                        <td>${resume[keyvalue][each][fifthin]}</td>
                        <td><button type="button" onclick="deleteedu(${each},'${keyvalue}','${idname}','${firstin}','${secondin}','${thirdin}','${fourthin}','${fifthin}')">delete</button>
                    </tr>`
            }    
        }
    }
    else{
        for(let each in resume[keyvalue]){
            if(resume[keyvalue][each][firstin]!="" && resume[keyvalue][each][secondin]!="" && resume[keyvalue][each][thirdin] && resume[keyvalue][each][fourthin]){
                edu=edu+`<tr>
                            <td>${resume[keyvalue][each][firstin]}</td>
                            <td>${resume[keyvalue][each][secondin]}</td>
                            <td>${resume[keyvalue][each][thirdin]}</td>
                            <td>${resume[keyvalue][each][fourthin]}</td>
                            <td><button type="button" onclick="deleteedu(${each},'${keyvalue}','${idname}','${firstin}','${secondin}','${thirdin}','${fourthin}')">delete</button>
                        </tr>`
        }
    }
    }
    document.getElementById(idname).innerHTML = edu;
    
}
function deleteedu(index,edu,id,first,second,third,fourth,fifth){
    console.log(resume)
    let eduList=[];
    for(let n in resume[edu]){
        if(n!=index){
            eduList.push(resume[edu][n])
        }
    }
    resume[edu]=eduList
    
eduadd(edu,id,first,second,third,fourth,fifth)
}

if(!localStorage.getItem("resume_list")){
    localStorage.setItem("resume_list",JSON.stringify([]))
}
let user_resume=JSON.parse(localStorage.getItem("resume_list"))
function summit(){
    user_resume.push(resume)
    localStorage.setItem('resume_list',JSON.stringify(user_resume))
    window.location.href="list.html"
    display()
}

let userlist_resume=JSON.parse(localStorage.getItem("resume_list"));
function display(){
    let diplayadd=""
    for(let each in userlist_resume){
        if(userlist_resume[each].admin_id==admin){
            diplayadd=diplayadd+`<tr>
                <td>${userlist_resume[each].name}</td>
                <td>${userlist_resume[each].email}</td>
                <td>${userlist_resume[each].Contact_no}</td>
                <td><button onclick="deleteDisplay(${each})">Delete</button></td>
                <td><a href="view.html?index=${each}"><button>View</button></a></td>
            </tr>`
        }   
    }
    console.log(diplayadd)
    document.getElementById("displaylist").innerHTML=diplayadd;
}
function deleteDisplay(index){
    let balList=[];
    for(let n in userlist_resume){
        if(n!=index){
            balList.push(userlist_resume[n])
        }
    }
    userlist_resume=balList;
    localStorage.setItem('resume_list',JSON.stringify(balList))
    display()
}
