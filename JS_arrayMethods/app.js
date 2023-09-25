// js array method file
/*=====================*/
/*=======methods=======*/
/*=====================*/
/*========how does each array method works===========

==MOODIFIES ORIGINAL==
.push
.pop
.splice 

==ITERATION==
.forEach

==INSPECTION==
.indexOf
.lastindexOf
.include
.every
.some

==RETURNS NEW OBJECT==
.reverse
.slice
.concat
.join
.sort
.filter
.map
.reducer
*/

let person = [
    {
        id: 1,
        name: "Vaska zardiashvili",
        age: 19,
        height: "184",
    },
    {
        id: 2,
        name: "David elizbarashvili",
        age: 18,
        height: "186",
    },
    {
        id: 3,
        name: "Merab vardiashvili",
        age: 22,
        height: "178",
    },
];
//==FILTER==
/*
==filter - გაფილტრავს ელემენტტებს მასივში და დააბრუებს მხოლოდ სასარველ ელემენტებს
მარტივად მისახვედრი რომ იყოს if-ის შემცვლელია, ანუ ვწერთ ლოგიკირ ოპერაციებს

მაგალითი:
const arr1 = [1, 2, 3, 4, 5, 6];
const arr2 = [1, 9, 3, 7, 5, 10];

console.log(
    arr1.filter((num) => {
        return num % 2 == 0;
    })
);
console.log(
    arr1.filter((diff) => {
        return arr2.includes(diff);
    })
    );
*/
//==FIND==
/*
==find - მსგავსია  fillter მეთოდის, მაგრამ განსხვავებით ამისა find metod-ი პოულობს მხოლოდ
 პირველ შესაბამის ობიექტს ხოლო filter პოულობს ყველა შესაძლო ვარიანტს 
*/
//==MAP==
/*
==map-ცვლის array-ის ობიექტის ფორმატს მაგალიტად თუ მოცემული გავქვს person ობიექტი სადაც არის 
name: height: phone: და ასე შემდეგ ჩევნ შეგვიძლია გამოვიტანოთ map ის დახმარებით მარტო სახელი
და შევცვალოთ როგორც გვსურს 
მაგალთი:


console.log(
    person.map((obj) => {
        return { Name: obj.name.split(" ")[0], Height: obj.height };
    })
);

//დამატებით: split(" ")[id]- გამოიიტანს string ის სასურველ სიტყვას
*/
//==REDUCE==
/*

==reduce-კრიბავს ან ამრავლეს ან ყოფს ობიექტების კონკრეტულ ცვლადებს მაგალიტად გადასახადებს
გაოიყეება ორი პარამეტრს acc-accumulator, cur-current ნუმბერს;
acc- არის პარამეტრი სადაც ჯამი ინახება
cur- არის პარამეტრი რომელიც გვიცვენებს იმ ობიექტს რომელზეც იმ წუთას არის გადასული
მაგალითი:

console.log(
    person.reduce((acc, cur) => {
        console.log(acc, cur.age);
        return acc + cur.age;
    }, 0)
);
*/
//==SORT==
/*
==sort - ვახარისხებთ ზრდადობით ან კლებადობბით ასევე შეიძლება შედარება compare
ორი ოპერქატორის გამოყენებით
მაგალითი:

const arr = [1, 9, 4, 11, 3, 2];

// let x = arr.sort((a, b) => a - b);
let y = person
    .map((obj) => {
        return { name: obj.name.split(" ")[0], age: obj.age };
    })
    .sort((a, b) => {
        if (a.name < b.name && a.age < b.age) return -1;
        else if (a.name > b.name && a.age > b.age) return 1;
        else return 0;
    });

console.log(y);
*/

/*
const cont = document.querySelector(".cont");
const boxes = document.querySelectorAll(".cont div");
let i = -1;

boxes.forEach((bx) => {
    i++;
    if (i % 2 == 0) bx.classList.add("active");
});
*/

/*========litle array method  Project========*/

const table_tHead_th = document.querySelectorAll(
    ".table_cont table thead tr th"
);
const table_cont_table_tbody = document.querySelector(
    ".table_cont table tbody"
);
const search_box_input = document.querySelector(".search_box input");

fetch("data.json")
    .then((res) => {
        return res.json();
    })
    .then((tbl) => {
        let print = "";
        for (let i = 0; i < tbl.length; i++) {
            let plr = tbl[i];
            print += `
        <tr>
    
                    <td>${plr.id}</td>
                    <td>${plr.name.split(" ")[0]}</td>
                    <td>${plr.username}</td>
                    <td>${plr.age}</td>
                    <td>${plr.height}</td>
                    <td>${plr.price}c</td>
                </tr>
    `;
            if (i == tbl.length - 1) {
                table_cont_table_tbody.innerHTML += print;
            }
        }
        const schedult_rows = document.querySelectorAll(
            ".table_cont table tbody tr"
        );

        table_tHead_th.forEach((hd, indx) => {
            let sort_arc = true;
            hd.addEventListener("click", () => {
                table_tHead_th.forEach((hd) => {
                    hd.classList.remove("active");
                });
                document.querySelectorAll("td").forEach((td) => {
                    td.classList.remove("active");
                });
                if (indx != 0) {
                    hd.classList.add("active");
                    schedult_rows.forEach((row) => {
                        row.querySelectorAll("td")[indx].classList.add(
                            "active"
                        );
                    });
                    sort_arc = hd.classList.contains("asc") ? false : true;
                    sorted_func(indx, sort_arc);
                }
            });
        });
        function sorted_func(column, sort_arc) {
            [...schedult_rows]
                .sort((a, b) => {
                    let first_row = a
                        .querySelectorAll("td")
                        [column].textContent.toLowerCase();
                    let second_row = b
                        .querySelectorAll("td")
                        [column].textContent.toLowerCase();
                    return sort_arc
                        ? first_row < second_row
                            ? 1
                            : -1
                        : first_row < second_row
                        ? -1
                        : 1;
                })
                .map((schedult_map) => {
                    table_cont_table_tbody.appendChild(schedult_map);
                });
        }

        search_box_input.addEventListener("input", () => {
            schedult_rows.forEach((srch) => {
                let text_value = srch.textContent.toLowerCase();
                let search_value = search_box_input.value.toLowerCase();
                let x = 0;

                srch.classList.toggle(
                    "hide",
                    text_value.indexOf(search_value) < 0
                );
                if (srch.classList.contains("hide")) {
                    setTimeout(() => {
                        srch.style.display = "none";
                    }, 350);
                }
                if (!srch.classList.contains("hide")) {
                    setTimeout(() => {
                        srch.style.display = "";
                    }, 350);
                }
            });
        });
    });
