let nav_title = document.querySelectorAll(".nav_top_title");
let nav_right_title = document.querySelectorAll(".nav_right_title");
let nav_title_h2 = document.querySelectorAll(".section_title");
let checked_btn = document.getElementById("nav-toggle");

console.log(checked_btn);

nav_title.forEach(function (element, index) {
    element.addEventListener('click', function () {
        console.log(nav_title)
        window.scrollTo({
            top: nav_title_h2[index].offsetTop -50,
            behavior: "smooth",
        });
        checked_btn.checked = false;
    })
});
nav_right_title.forEach(function (element, index) {
    element.addEventListener('click', function () {
        window.scrollTo({
            top: nav_title_h2[index].offsetTop -50,
            behavior: "smooth",

        })
    })
});
// nav_right_title.forEach(function (element, index) {
//     element.addEventListener('click', function () {
//         document.getElementsByTagName('html')[0].scrollTo({
//             top: nav_title_h2[index].offsetTop -55,
//             behavior: "smooth",

//         })
//     })
// });
// nav_title.forEach(function (element, index1) {
//     element.addEventListener('click', function () {
//         checked_btn.checked = false;
//     })
// });