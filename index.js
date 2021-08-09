const items = {};
let title = document.getElementById('title');
let desc = document.getElementById('desc');
let search = document.getElementById('input');

show();

function show() {
    document.getElementById('list').innerHTML = "";
    for (let i = 1; i <= localStorage.length; i++) {
        let t = localStorage.getItem(i);
        st = 10;
        et = t.indexOf(",");
        sd = t.indexOf("desc");
        document.getElementById('list').innerHTML += `
            <th class="${t.substring(st, et - 1)} col srno" scope="col">${i}</th>
            <td class="${t.substring(st, et - 1)} cen">${t.substring(st, et - 1)}</td>
            <td class="${t.substring(st, et - 1)} cen">${t.substring(sd + 7, t.length - 2)}</td>
            <td class="${t.substring(st, et - 1)} cen"><button class="btns" onclick="del(${i})">Delete</button></td>
        `;
    }
}

function add() {
    if (title.value.length === 0 || desc.value.length === 0) {
        document.getElementById('warn').style.display = "block";
        setTimeout(() => {
            document.getElementById('warn').style.display = "none";
        }, 1000);
        title.value = "";
        desc.value = "";
    }
    else {
        document.getElementById('sucess').style.display = "block";
        items.title = title.value;
        items.desc = desc.value;
        // console.log(items.length);
        localStorage.setItem(localStorage.length + 1, JSON.stringify(items));
        // console.log(localStorage.getItem(items.length));
        show();
        setTimeout(() => {
            document.getElementById('sucess').style.display = "none";
            title.value = "";
            desc.value = "";
        }, 1000);
    }
}

function del(index) {
    // console.log(index);
    len = localStorage.length;
    for (let i = index; i < len; i++) {
        // console.log(localStorage.getItem(i));
        // console.log(localStorage.getItem(i + 1));
        localStorage.setItem(i, localStorage.getItem(i + 1));
    }
    localStorage.removeItem(localStorage.length);
    show();
}

function src() {
    // console.log(search.value);
    str = "";
    for (let i = 1; i <= localStorage.length; i++) {
        let t = localStorage.getItem(i);
        st = 10;
        et = t.indexOf(",");
        if (search.value.toLowerCase() === t.substring(st, et - 1).toLowerCase()) {
            str += JSON.stringify(i);
            str += ", ";
        }
    }
    document.getElementById('src').innerHTML = "Your Todo is Present at position ";
    document.getElementById('src').innerHTML += `
                ${str.substring(0, str.length - 2)}! 
            `;
    if(str.length === 0){
        document.getElementById('src').innerHTML = "Not Present Here!";
    }
    document.getElementById('src').style.display = "block";
    setTimeout(() => {
        document.getElementById('src').style.display = "none";
    }, 2000);
    search.value = "";
}


document.getElementById('add').addEventListener('click', add);
document.getElementById('search').addEventListener('click', src);